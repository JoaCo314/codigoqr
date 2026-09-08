"use client";

import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

export default function VisitPage({
  params,
}: {
  params: { id: string };
}) {
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCode() {
      try {
        const res = await fetch(`/api/visit/${params.id}`);
        if (!res.ok) {
          setError(true);
          return;
        }
        const data = await res.json();
        setCode(data.code);
      } catch {
        setError(true);
      }
    }
    fetchCode();
  }, [params.id]);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px",
        gap: "16px",
      }}
    >
      <h1 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#94a3b8" }}>
        Este es tu código:
      </h1>

      {error ? (
        <p style={{ color: "#ef4444" }}>Código inválido</p>
      ) : (
        <div
          style={{
            fontSize: "3rem",
            fontWeight: 800,
            letterSpacing: "0.05em",
            fontFamily: "monospace",
            color: "#22d3ee",
            background: "#1e1e2e",
            padding: "24px 48px",
            borderRadius: "16px",
            border: "1px solid #334155",
            minHeight: "90px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {code ?? "..."}
        </div>
      )}
    </main>
  );
}
