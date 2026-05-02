// src/app/layout.tsx
import type { Metadata } from "next";
import { CssBaseline } from "@mui/material";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Campus Notifications",
  description: "Affordmed Campus Hiring Evaluation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
        <Navbar />
        <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
