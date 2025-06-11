import { SessionProvider } from "next-auth/react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NewsProvider } from "@/lib/contexts/NewsContext";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <NewsProvider>
        <Header />
        <Component {...pageProps} />
        <Footer></Footer>
      </NewsProvider>
    </SessionProvider>
  );
}
