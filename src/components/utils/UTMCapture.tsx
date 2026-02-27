"use client";

import { useEffect } from "react";
import { extractUTMParams, saveUTMsToCookie } from "@/lib/utm";

export default function UTMCapture() {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const utms = extractUTMParams(searchParams);

    if (Object.keys(utms).length === 0) return;

    // Persist UTMs to cookie for later use on form submit
    saveUTMsToCookie(utms);

    // Record the landing visit in the website's own tracking
    fetch("/api/landing-tracking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `${utms.utm_source ?? "direct"} / ${utms.utm_campaign ?? "none"}`,
        type: utms.utm_medium ?? "unknown",
        utm: utms,
        amountOfLanding: 1,
        landingEvents: [{ id: crypto.randomUUID(), time: new Date() }],
        landing_page_url: window.location.href,
      }),
    }).catch(() => {
      // Non-critical — don't surface errors to the user
    });
  }, []);

  return null;
}
