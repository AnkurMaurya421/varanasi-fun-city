"use client";
import { useEffect } from "react";
import { Analytics, track } from "@vercel/analytics/react";

// Cookie-free page views (Vercel Analytics) plus one event per enquiry click.
const KINDS = [
  ["wa.me", "whatsapp_click"],
  ["tel:", "call_click"],
  ["mailto:", "email_click"],
  ["google.com/maps", "directions_click"],
];

export default function Tracking() {
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const hit = KINDS.find(([needle]) => href.includes(needle));
      if (hit) track(hit[1], { page: window.location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return <Analytics />;
}
