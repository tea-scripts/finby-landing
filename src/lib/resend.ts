import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function confirmationHtml(): string {
  return `
  <div style="margin:0;padding:0;background-color:#06101f;font-family:Inter,Helvetica,Arial,sans-serif;">
    <div style="max-width:480px;margin:0 auto;padding:40px 28px;">
      <p style="font-size:22px;font-weight:800;color:#e8edf5;margin:0 0 24px;">
        Finby
      </p>
      <p style="font-size:16px;line-height:1.7;color:#e8edf5;margin:0 0 16px;">
        Hey! You're officially on the <strong>Finby</strong> waitlist. 🎉
      </p>
      <p style="font-size:16px;line-height:1.7;color:rgba(232,237,245,0.7);margin:0 0 16px;">
        We're building something that makes managing money feel less like homework
        and more like a conversation. We'll reach out the moment we're ready.
      </p>
      <p style="font-size:16px;line-height:1.7;color:rgba(232,237,245,0.7);margin:0 0 28px;">
        — The Finby team
      </p>
      <p style="font-size:13px;color:rgba(232,237,245,0.35);margin:0;">
        Stop tracking. Start talking.
      </p>
    </div>
  </div>`;
}

/**
 * Sends the waitlist confirmation email. Throws on a Resend API error so the
 * caller can decide how to handle delivery failures.
 */
export async function sendConfirmationEmail(to: string): Promise<void> {
  const from = process.env.RESEND_FROM_EMAIL;
  if (!from) {
    throw new Error("RESEND_FROM_EMAIL is not configured.");
  }

  const { error } = await resend.emails.send({
    from,
    to,
    subject: "You're on the Finby waitlist 🎉",
    html: confirmationHtml(),
  });

  if (error) {
    throw new Error(`Resend: ${error.message}`);
  }
}
