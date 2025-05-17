"use client";

const list = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "NextJS",
  "TailwindCSS",
  "TypeScript",
  "Vite",
  "React Router",
  "Hono",
];

export default function Stack({ className = "" }: { className?: string }) {
  return list.map((value, i) => {
    return <span key={value + i}>{value}</span>;
  });
}
