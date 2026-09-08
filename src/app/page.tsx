"use client";

import { useState } from "react";
import QRCode from "qrcode";

export default function Home() {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function generarQR() {
    setLoading(true);
    setQrDataUrl(null);

    const res = await fetch("/api/qr-content");
    const data = await res.json();
    const target = `${window.location.origin}${data.path}`;

    const url = await QRCode.toDataURL(target, { width: 320, margin: 2 });
    setQrDataUrl(url);
    setLoading(false);
  }

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        padding: "40px",
      }}
    >
      <h1 style={{ fontSize: "1.8rem", fontWeight: 700 }}>
        Probador de códigos QR
      </h1>

      <button
        onClick={generarQR}
        disabled={loading}
        style={{
          padding: "16px 40px",
          fontSize: "1.1rem",
          fontWeight: 600,
          border: "none",
          borderRadius: "999px",
          cursor: loading ? "default" : "pointer",
          background: "#3b82f6",
          color: "#fff",
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? "Generando..." : "Generar código QR"}
      </button>

      {qrDataUrl && (
        <div style={{ textAlign: "center" }}>
          <img
            src={qrDataUrl}
            alt="Código QR"
            style={{
              width: 320,
              height: 320,
              borderRadius: "12px",
              background: "#fff",
              padding: "8px",
            }}
          />
          <p style={{ marginTop: "12px", color: "#94a3b8", fontSize: "0.95rem" }}>
            Escaneá el QR para ver tu código único
          </p>
        </div>
      )}
    </main>
  );
}
