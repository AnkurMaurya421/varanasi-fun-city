"use client";
import { createContext, useContext } from "react";
import { siteConfig as defaults } from "@/siteConfig";

const Ctx = createContext(defaults);

// Gives client components the live settings (defaults + whatever was saved in /admin).
export default function ConfigProvider({ config, children }) {
  return <Ctx.Provider value={config}>{children}</Ctx.Provider>;
}

export const useSiteConfig = () => useContext(Ctx);
