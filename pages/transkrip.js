import Head from "next/head";
import { useState } from "react";

export default function TranskripPage() {
  const [urlInput, setUrlInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const sendRequest = async () => {
    if (!urlInput.trim()) {
      setError("URL tidak valid.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        `/api/transkrip?get_video=${encodeURIComponent(urlInput)}`
      );
      const data = await response.json();

      if (data.status === "ok") {
        setResult(data);
      } else {
        setError(data.msg || "Terjadi kesalahan. Coba lagi nanti.");
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat mengambil data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Transkrip YouTube</title>
        <link rel="icon" href="/img/icon.png" />
      </Head>
      <div className="container">
        <h2>Transkrip Video YouTube</h2>
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Masukkan URL YouTube"
        />
        <button onClick={sendRequest}>Dapatkan Transkrip</button>

        {loading && <div className="loader"></div>}

        {error && <div className="error">{error}</div>}

        {result && (
          <div className="result">
            <h3>{result.title}</h3>
            <div className="transkrip">
              {result.subtitles.map((sub) => sub.f).join("\n")}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        body {
          margin: 0;
          padding: 0;
          background-image: url("/img/bg.svg");
          background-size: cover;
          background-attachment: fixed;
          font-family: "Arial", sans-serif;
        }

        .container {
          max-width: 600px;
          background: #ffffff;
          padding: 20px;
          margin: 50px auto;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }

        h2 {
          text-align: center;
          color: #2c3e50;
        }

        input {
          width: calc(100% - 24px);
          padding: 12px;
          margin-bottom: 20px;
          border: 2px solid #ced4da;
          border-radius: 8px;
          font-size: 16px;
        }

        button {
          width: 100%;
          background-color: #007bff;
          color: white;
          border: none;
          padding: 14px;
          font-size: 16px;
          border-radius: 8px;
          cursor: pointer;
        }

        button:hover {
          background-color: #0056b3;
        }

        .loader {
          border: 4px solid #f3f3f3;
          border-radius: 50%;
          border-top: 4px solid #3498db;
          width: 40px;
          height: 40px;
          animation: spin 1.5s linear infinite;
          margin: 20px auto;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}