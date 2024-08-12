import { Inter } from "next/font/google";
import "./globals.css";

import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FE Test Aksamedia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + ' bg-[#1c1c22] dark:bg-white'} >
        <Suspense>
          {children}
        </Suspense>
        </body>
    </html>
  );
}
