import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import Sidebar from "@/app/components/Sidebar";
import SupabaseProvider from "./provider/SupabaseProvider";
import UserProvider from "./provider/UserProvider";
import ModelProvider from "./provider/ModelProvider";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Listen to Spotify music!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <SupabaseProvider>
          <UserProvider>
            <ModelProvider />
            <Sidebar>{children}</Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
