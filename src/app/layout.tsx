import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Generador de QR",
  description: "Genera codigos QR unicos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
