import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import Sidebar from "@/app/components/Sidebar";
import SupabaseProvider from "./provider/SupabaseProvider";
import UserProvider from "./provider/UserProvider";
import ModalProvider from "./provider/ModalProvider";
import ToasterProvider from "./provider/ToasterProvider";
import getSongByUserId from "./actions/getSongByUserId";
import Player from "./player/Player";
import getActiveProductsWithPrices from "./actions/getActiveProductsWithPrices";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Listen to Spotify music!",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongByUserId();
  const products = await getActiveProductsWithPrices();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <div className="flex h-50 w-full bg-red-500">
              <Player />
            </div>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
