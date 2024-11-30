import Head from "next/head";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Halaman Tidak Ditemukan</title>
      </Head>
      <div className="container">
        <header className="header">
          <h1>404 - Halaman Tidak Ditemukan</h1>
          <p>Halaman yang Anda cari tidak ada.</p>
        </header>
        <main className="main">
          <Link href="/">
            <a className="btn">Kembali ke Beranda</a>
          </Link>
        </main>
        <footer className="footer">
          Dibuat dengan 💙 oleh Next.js
        </footer>
      </div>
    </>
  );
}