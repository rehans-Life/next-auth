import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const host = process.env.NEXT_PUBLIC_HOST;

export const send2FAVerificationEmail = async (
  email: string,
  token: string
) => {
  await resend.emails.send({
    from: "onboarding@defidigital.site",
    to: email,
    subject: "2 FA Verification",
    text: `Your 2FA code is ${token}`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetPasswordLink = `${host}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@defidigital.site",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href=${resetPasswordLink}>here</a> to reset password.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationLink = `${host}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@defidigital.site",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href=${verificationLink}>here</a> to confirm email.</p>`,
  });
};
