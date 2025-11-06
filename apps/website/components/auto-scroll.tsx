"use client";

import { useEffect } from "react";


export default function AutoScroll() {

  useEffect(() => {
    const doc = document.documentElement;

    const scrollHeight = doc.scrollHeight;
    const clientHeight = doc.clientHeight;

    if (scrollHeight > clientHeight) {
      doc.scrollTo({
        top: scrollHeight,
        behavior: "instant",
      });
    }

  }, [])
  return null;
}
