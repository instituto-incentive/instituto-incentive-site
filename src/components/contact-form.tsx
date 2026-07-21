"use client";

import { FormEvent, useCallback, useRef, useState } from "react";
import Script from "next/script";
import { Send } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback": () => void;
          "error-callback": (errorCode: string) => void;
          "timeout-callback": () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
    };
    dataLayer?: unknown[];
  }
}

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const fieldClass =
  "w-full rounded-2xl border border-incentive-200 bg-white px-4 py-3 text-incentive-950 outline-none transition focus:border-incentive-500 focus:ring-4 focus:ring-incentive-100";

export function ContactForm() {
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [canRetryTurnstile, setCanRetryTurnstile] = useState(false);

  const renderTurnstile = useCallback(() => {
    if (!siteKey || !turnstileRef.current || !window.turnstile || widgetIdRef.current) {
      return;
    }

    widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
      sitekey: siteKey,
      callback: (token) => {
        setTurnstileToken(token);
        setCanRetryTurnstile(false);
        setStatus("idle");
        setFeedback("");
      },
      "expired-callback": () => {
        setTurnstileToken("");
        setCanRetryTurnstile(true);
        setStatus("error");
        setFeedback("A verifica\u00e7\u00e3o de seguran\u00e7a expirou. Tente novamente.");
      },
      "error-callback": (errorCode) => {
        console.error("turnstile-error", errorCode);
        setTurnstileToken("");
        setCanRetryTurnstile(true);
        setStatus("error");
        setFeedback(
          `N\u00e3o foi poss\u00edvel concluir a verifica\u00e7\u00e3o de seguran\u00e7a. C\u00f3digo: ${errorCode}.`,
        );
      },
      "timeout-callback": () => {
        setTurnstileToken("");
        setCanRetryTurnstile(true);
        setStatus("error");
        setFeedback(
          "A verifica\u00e7\u00e3o de seguran\u00e7a expirou por tempo. Tente novamente.",
        );
      },
    });
  }, []);

  function resetTurnstile() {
    window.turnstile?.reset(widgetIdRef.current);
    setTurnstileToken("");
    setCanRetryTurnstile(false);
    setStatus("idle");
    setFeedback("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!siteKey) {
      setStatus("error");
      setFeedback(
        "O envio direto ainda esta sendo ativado. Use contato@institutoincentive.org.br por enquanto.",
      );
      return;
    }

    if (!turnstileToken) {
      setStatus("error");
      setFeedback("Conclua a verificacao de seguranca antes de enviar.");
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setFeedback("");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        email: data.get("email"),
        subject: data.get("subject"),
        message: data.get("message"),
        turnstileToken,
      }),
    });

    const result = (await response.json().catch(() => ({}))) as {
      message?: string;
    };

    if (!response.ok) {
      setStatus("error");
      setFeedback(result.message || "Nao foi possivel enviar a mensagem agora.");
      window.turnstile?.reset(widgetIdRef.current);
      setTurnstileToken("");
      return;
    }

    window.dataLayer?.push({
      event: "lead_form_submit",
      form_name: "contact",
      form_destination: "contato",
    });

    form.reset();
    window.turnstile?.reset(widgetIdRef.current);
    setTurnstileToken("");
    setStatus("success");
    setFeedback("Mensagem enviada com sucesso. O Instituto Incentive recebeu seu contato.");
  }

  const isDisabled = status === "sending" || !siteKey;

  return (
    <>
      {siteKey ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={renderTurnstile}
        />
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-[2rem] bg-incentive-50 p-6 shadow-soft ring-1 ring-incentive-100 lg:p-8"
      >
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-bold text-incentive-900">
            Nome
          </label>
          <input id="name" name="name" required autoComplete="name" className={fieldClass} />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-bold text-incentive-900">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="subject" className="mb-2 block text-sm font-bold text-incentive-900">
            Assunto
          </label>
          <input id="subject" name="subject" required className={fieldClass} />
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-bold text-incentive-900">
            Mensagem
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            maxLength={4000}
            className={fieldClass}
          />
        </div>

        <div className="min-h-[70px]">
          {siteKey ? (
            <div ref={turnstileRef} />
          ) : (
            <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
              Protecao antispam pendente de ativacao na Vercel.
            </p>
          )}
        </div>

        {feedback ? (
          <div
            className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
              status === "success" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"
            }`}
          >
            <p role="status" aria-live="polite">
              {feedback}
            </p>
            {canRetryTurnstile ? (
              <button
                type="button"
                onClick={resetTurnstile}
                className="mt-2 underline underline-offset-4"
              >
                Tentar novamente
              </button>
            ) : null}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isDisabled}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-incentive-700 px-6 py-4 text-sm font-extrabold text-white shadow-soft transition hover:bg-incentive-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Enviando..." : "Enviar mensagem"}
          <Send aria-hidden className="h-4 w-4" />
        </button>
      </form>
    </>
  );
}
