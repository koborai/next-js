import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Halaman Utama</title>
      </Head>
      <div className="container">
        <header className="header">
          <h1>Selamat Datang!</h1>
          <p>Ini adalah web sederhana dengan desain modern.</p>
        </header>
        <main className="main">
          <p>
            Coba buka halaman khusus dengan URL slug, misalnya:
            <code> /minzz</code>.
          </p>
          <Link href="/minzz">
            <a className="btn">Coba Halaman Minzz</a>
          </Link>
        </main>
        <footer className="footer">
          Dibuat dengan 💙 oleh Next.js
        </footer>
      </div>
    </>
  );
}