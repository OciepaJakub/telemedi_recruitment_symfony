import type { Metadata } from "next";
import "./globals.css";
import { Lato } from "next/font/google";
import Header from "./partials/Header";
import Footer from "./partials/Footer";

export const dynamic = "force-dynamic";

const lato = Lato({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: '--font-lato'
});

export const metadata: Metadata = {
  title: "Telemedi Recruitment NextJS Frontend",
  description: "Proudly created by Ociepa Jakub",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-background ${lato.variable}`}
      >
        <Header/>
        <main className="min-h-[calc(100vh_-_73px_-_224px)]">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}

export default RootLayout;