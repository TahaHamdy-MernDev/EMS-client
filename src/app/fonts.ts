import { Roboto_Mono, Open_Sans, Source_Code_Pro } from "next/font/google";

export const robotoMono = Roboto_Mono({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-robotoMono",
  fallback: ["monospace"],
  preload: true,
  adjustFontFallback: true,
});

export const openSans = Open_Sans({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-openSans",
  fallback: ["Helvetica", "Arial", "sans-serif"],
  preload: true,
  adjustFontFallback: true,
});

export const sourceCodePro = Source_Code_Pro({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sourceCodePro",
  fallback: ["Consolas", "Monaco", "monospace"],
  preload: true,
  adjustFontFallback: true,
});
