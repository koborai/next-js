import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SlugPage() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Head>
        <title>Halaman: {slug}</title>
      </Head>
      <div className="container">
        <header className="header">
          <h1>Halaman untuk Slug: {slug}</h1>
          <p>Anda sedang melihat halaman dengan slug "{slug}".</p>
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