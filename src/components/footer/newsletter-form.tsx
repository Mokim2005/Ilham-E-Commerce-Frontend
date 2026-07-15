"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSending(true);
    // TODO: wire up to real newsletter API
    setTimeout(() => {
      setSubscribed(true);
      setSending(false);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }, 800);
  };

  return (
    <div className="pb-6 pt-2 md:w-[26rem]">
      <p className="py-4 text-xl md:text-2xl">Subscribe for updates*</p>
      <div className="hover-button relative flex items-center justify-between overflow-hidden rounded-full border-2 border-white/15 bg-white/10 text-background md:text-2xl">
        <form
          onSubmit={handleSubscribe}
          className="relative z-[2] grid w-full grid-cols-6"
        >
          <input
            type="email"
            name="newsletter_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="col-span-5 border-none bg-transparent px-6 py-3 text-background placeholder:text-background/40 focus:outline-none"
            placeholder="Your Email *"
            aria-label="Email address"
            required
          />
          <button
            type="submit"
            disabled={sending}
            className="cols-span-1 flex h-full w-full cursor-pointer items-center justify-center bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Subscribe"
          >
            <ArrowRight className="h-[45%] w-full" />
          </button>
        </form>
      </div>
      {subscribed && (
        <p className="mt-2 text-xs text-emerald-400">Thanks for subscribing!</p>
      )}
    </div>
  );
}
