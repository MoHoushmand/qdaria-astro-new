import { useState, type FormEvent } from "react";
import { createBrowserClient } from "../client";

interface EmailMagicLinkFormProps {
  redirectTo?: string;
}

export const EmailMagicLinkForm = ({ redirectTo = "/dashboard" }: EmailMagicLinkFormProps) => {
  const sb = createBrowserClient();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const { error } = await sb.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
      },
    });
    setStatus(error ? "error" : "sent");
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
      />
      <button type="submit" disabled={status === "sending"}>
        {status === "sent" ? "Check your inbox" : "Send magic link"}
      </button>
      {status === "error" && <p>Could not send link. Try again.</p>}
    </form>
  );
};
