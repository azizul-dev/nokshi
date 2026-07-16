// src/components/home/Newsletter.jsx
"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // dummy submit — no backend
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="container mx-auto px-4 py-10 md:py-16">
      <div className="relative overflow-hidden rounded-3xl bg-[#1C1917] px-6 py-12 md:px-16 md:py-16 text-center">
        {/* decorative gradient blobs */}
        <div className="pointer-events-none absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#d6440a]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#f4af10]/20 blur-3xl" />

        <div className="relative">
          <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#f4af10] to-[#d6440a] mb-4">
            <Mail size={20} className="text-white" />
          </div>

          <h2
            className="text-2xl md:text-3xl text-white"
            style={{ fontFamily: "var(--font-display, 'Fraunces', serif)" }}
          >
            Stay in the Loop
          </h2>
          <p className="mt-2 text-sm md:text-base text-white/60 max-w-md mx-auto">
            Subscribe for early access to new drops, exclusive offers, and
            style inspiration.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-full px-5 py-3 text-sm bg-white/10 text-white placeholder:text-white/40 border border-white/15 focus:outline-none focus:border-[#f4af10] transition"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-[#f4af10] to-[#d6440a] hover:opacity-90 transition"
            >
              Subscribe <Send size={15} />
            </button>
          </form>

          {submitted && (
            <p className="mt-3 text-xs text-[#f4af10]">
              🎉 Thanks for subscribing!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}