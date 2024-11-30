import Head from "next/head";
import { useRouter } from "next/router";

export default function SlugPage() {
  const router = useRouter();
  const { slug } = router.query;

  // Cek apakah slug adalah 'minzz', jika bukan, tampilkan 404
  if (slug && slug !== 'minzz') {
    return <div>404 - Halaman Tidak Ditemukan</div>;
  }

  if (!slug) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>Halaman: {slug}</title>
      </Head>
      <div className="container">
        <header className="header">
          <h1>Selamat datang di Halaman Slug: {slug}</h1>
          <p>Ini adalah halaman untuk slug "minzz".</p>
        </header>
        <main className="main">
          <p>Ini adalah halaman khusus untuk slug "minzz".</p>
        </main>
        <footer className="footer">
          Dibuat dengan 💙 oleh Next.js
        </footer>
      </div>
    </>
  );
}