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
        `https://apiv2.anthiago.com/transkrip?get_video=${encodeURIComponent(
          urlInput
        )}&codeL=id`
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
            <ul>
              {result.subtitles.map((sub, index) => (
                <li key={index}>
                  {sub.f} <small>(Detik: {sub.t})</small>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <style jsx>{`
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 50px auto;
            background: #fff;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }

        h2 {
            text-align: center;
            color: #333;
        }

        input[type="text"] {
            width: calc(100% - 22px);
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
        }

        button {
            width: 100%;
            background-color: #28a745;
            color: white;
            border: none;
            padding: 12px;
            font-size: 16px;
            border-radius: 4px;
            cursor: pointer;
        }

        button:hover {
            background-color: #218838;
        }

        .result {
            margin-top: 20px;
            background: #f1f1f1;
            padding: 15px;
            border-radius: 4px;
            display: none;
        }

        .error {
            color: red;
            text-align: center;
            margin-top: 10px;
        }

        .loader {
            border: 4px solid #f3f3f3;
            border-radius: 50%;
            border-top: 4px solid #3498db;
            width: 30px;
            height: 30px;
            animation: spin 2s linear infinite;
            margin: 0 auto;
            display: none;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}