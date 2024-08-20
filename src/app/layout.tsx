import { Providers } from "@/lib/chakraUi/providers";
import type { Metadata } from "next";
import { openSans, robotoMono, sourceCodePro } from "./fonts";
export const metadata: Metadata = {
  title: "EMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${robotoMono.variable} ${openSans.variable} ${sourceCodePro.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
