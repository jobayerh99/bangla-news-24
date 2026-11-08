import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";

const notoSerifBengali = Noto_Serif_Bengali({

  subsets: ["latin", "bengali"],
});



export const metadata: Metadata = {
  title: {
    default: "Bangla News 24",
    template: "%s | Bangla News 24",
  },
  description: "বাংলাদেশ ও বিশ্বের সর্বশেষ খবর — প্রতিদিন সরাসরি Bangla News 24-তে",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <Marquee />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6">
          {children}
        </main>

        <Footer />

        <ToastContainer />
      </body>
    </html>
  );
}
