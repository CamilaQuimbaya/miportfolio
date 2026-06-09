import { NextResponse } from "next/server";

const TO_EMAIL = "camila111paco@gmail.com";

/**
 * Endpoint del formulario de contacto.
 * Envía correos con Resend (https://resend.com) si existe RESEND_API_KEY.
 * Sin la API key, responde { configured: false } y el formulario hace
 * fallback al botón de email.
 */
export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Validación básica
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // Aún no configurado: el front mostrará el fallback de email.
      return NextResponse.json({ ok: false, configured: false }, { status: 200 });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Cambia "from" por tu dominio verificado en Resend cuando lo tengas.
        from: process.env.CONTACT_FROM || "Portafolio <onboarding@resend.dev>",
        to: [TO_EMAIL],
        reply_to: email,
        subject: `Nuevo mensaje de ${name} · Portafolio`,
        html: emailTemplate(escapeHtml(name), escapeHtml(email), escapeHtml(message)),
        text: `Nuevo mensaje desde tu portafolio\n\nDe: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend error:", detail);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Plantilla de email con la marca (compatible con Gmail/Outlook). */
function emailTemplate(name: string, email: string, message: string) {
  const font =
    "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
  return `<!doctype html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0612;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0612;padding:28px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 10px 40px rgba(124,58,237,0.35);">

        <!-- Encabezado oscuro con glow -->
        <tr>
          <td style="background-color:#160c2c;background-image:radial-gradient(circle at 85% 20%,rgba(255,79,216,0.5) 0%,rgba(34,211,238,0) 50%),linear-gradient(125deg,#0a0612 0%,#1f1140 55%,#160c2c 100%);padding:30px 34px;">
            <p style="margin:0;font-family:${font};font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#e0aaff;">&#10022; Camila Quimbaya &middot; Portafolio</p>
            <h1 style="margin:10px 0 0;font-family:${font};font-size:23px;font-weight:800;color:#ffffff;">Nuevo mensaje de contacto</h1>
          </td>
        </tr>

        <!-- Cuerpo -->
        <tr>
          <td style="padding:30px 34px;font-family:${font};color:#2d1b3d;">
            <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#9a8aaa;">De</p>
            <p style="margin:4px 0 18px;font-size:18px;font-weight:700;color:#2d1b3d;">${name}</p>

            <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#9a8aaa;">Correo</p>
            <p style="margin:4px 0 22px;font-size:15px;">
              <a href="mailto:${email}" style="color:#a855f7;text-decoration:none;font-weight:700;">${email}</a>
            </p>

            <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#9a8aaa;">Mensaje</p>
            <div style="background:#faf5ff;border-left:4px solid #ff4fd8;border-radius:12px;padding:16px 18px;font-size:15px;line-height:1.65;color:#3a2a4a;white-space:pre-wrap;">${message}</div>

            <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:26px;">
              <tr>
                <td style="border-radius:12px;background-color:#ff4fd8;background-image:linear-gradient(90deg,#ff4fd8,#a855f7);">
                  <a href="mailto:${email}" style="display:inline-block;padding:13px 28px;font-family:${font};font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:12px;">Responder a ${name} &rarr;</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Pie -->
        <tr>
          <td style="padding:18px 34px;background:#faf5ff;border-top:1px solid #efe6fb;">
            <p style="margin:0;font-family:${font};font-size:12px;color:#9a8aaa;">
              Enviado desde el formulario de tu portafolio &middot; stay kawaii &middot; keep coding
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
