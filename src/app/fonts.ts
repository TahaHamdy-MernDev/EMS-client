import {
  Roboto_Mono,
  Open_Sans,
  Source_Code_Pro,
  Lato,
  Montserrat,
} from "next/font/google";

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

export const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-lato",
  fallback: ["Helvetica", "Arial", "sans-serif"],
  preload: true,
  adjustFontFallback: true,
});

export const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-montserrat",
  fallback: ["Helvetica", "Arial", "sans-serif"],
  preload: true,
  adjustFontFallback: true,
});
