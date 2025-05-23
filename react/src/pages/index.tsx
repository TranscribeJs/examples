import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Transcribe from "@/Transcribe";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Transcribe.js Next.js Example</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
        style={{ width: "70ch", maxWidth: "100%", margin: "0 auto" }}
      >
        <main className={styles.main}>
          <h1>Transcribe.js Next.js Example</h1>
          <Transcribe />
        </main>
      </div>
    </>
  );
}
