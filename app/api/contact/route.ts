import { NextResponse } from "next/server";

export const runtime = "nodejs";

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const RESEND_EMAILS_URL = "https://api.resend.com/emails";
const MAX_MESSAGE_LENGTH = 4000;

type TurnstileResult = {
  success?: boolean;
};

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildMessage({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return [
    "Mensagem recebida pelo site institucional.",
    "",
    `Nome: ${name}`,
    `E-mail: ${email}`,
    `Assunto: ${subject}`,
    "",
    "Mensagem:",
    message,
  ].join("\n");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = cleanText(body.name);
    const email = cleanText(body.email).toLowerCase();
    const subject = cleanText(body.subject);
    const message = cleanText(body.message);
    const turnstileToken = cleanText(body.turnstileToken);

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "Preencha todos os campos obrigatorios." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { message: "Informe um e-mail valido." },
        { status: 400 },
      );
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { message: "A mensagem deve ter ate 4000 caracteres." },
        { status: 400 },
      );
    }

    if (!turnstileToken) {
      return NextResponse.json(
        { message: "Confirme a verificacao de seguranca." },
        { status: 400 },
      );
    }

    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM_EMAIL;
    const to = process.env.CONTACT_TO_EMAIL || "contato@institutoincentive.org.br";

    if (!turnstileSecret || !resendApiKey || !from) {
      return NextResponse.json(
        { message: "Formulario temporariamente indisponivel." },
        { status: 500 },
      );
    }

    const formData = new FormData();
    formData.append("secret", turnstileSecret);
    formData.append("response", turnstileToken);

    const remoteIp =
      request.headers.get("cf-connecting-ip") ??
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

    if (remoteIp) {
      formData.append("remoteip", remoteIp);
    }

    const turnstileResponse = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      body: formData,
    });
    const turnstileResult =
      (await turnstileResponse.json()) as TurnstileResult;

    if (!turnstileResult.success) {
      return NextResponse.json(
        { message: "Verificacao de seguranca nao concluida." },
        { status: 403 },
      );
    }

    const resendResponse = await fetch(RESEND_EMAILS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `[Site] ${subject}`,
        text: buildMessage({ name, email, subject, message }),
      }),
    });

    if (!resendResponse.ok) {
      return NextResponse.json(
        { message: "Nao foi possivel enviar a mensagem agora." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { message: "Nao foi possivel processar a mensagem." },
      { status: 400 },
    );
  }
}
