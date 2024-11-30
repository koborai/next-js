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

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(`Teks berhasil disalin: "${text}"`);
    });
  };

  return (
    <>
      <Head>
        <title>Transkrip YouTube</title>
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
            <h3>{result.title}</h3> {/* Bagian "title" ditampilkan */}
            <ul>
              {result.subtitles.map((sub, index) => (
                <li
                  key={index}
                  onClick={() => copyToClipboard(sub.f)} // Klik untuk menyalin teks
                  className="subtitle"
                >
                  {sub.f} <small>(Detik: {sub.t})</small>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 50px auto;
          background: #ffffff;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          border-radius: 10px;
          font-family: 'Arial', sans-serif;
        }

        h2 {
          text-align: center;
          color: #2c3e50;
          margin-bottom: 20px;
          font-size: 1.8em;
        }

        input {
          width: calc(100% - 24px);
          padding: 12px;
          margin-bottom: 20px;
          border: 2px solid #ced4da;
          border-radius: 8px;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        input:focus {
          border-color: #5c9ded;
          outline: none;
          box-shadow: 0 0 8px rgba(92, 157, 237, 0.5);
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
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }

        button:hover {
          background-color: #0056b3;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .result {
          margin-top: 20px;
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        .result h3 {
          color: #343a40;
          font-size: 1.5em;
          margin-bottom: 10px;
        }

        .result ul {
          list-style: none;
          padding: 0;
        }

        .result li {
          background: #ffffff;
          padding: 10px;
          margin-bottom: 8px;
          border-radius: 6px;
          border: 1px solid #dee2e6;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }

        .result li:hover {
          background-color: #e9ecef;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        .error {
          color: #dc3545;
          text-align: center;
          margin-top: 10px;
          font-weight: bold;
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