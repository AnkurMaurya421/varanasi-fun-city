"use client";
import { usePathname } from "next/navigation";

export default function HideOnAdmin({ children }) {
  const path = usePathname() || "";
  return path.startsWith("/admin") ? null : children;
}
