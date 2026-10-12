import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ARPH24 — L'Actif Représentant du Propriétaire H24",
  description: "Plateforme d'Intelligence Opérationnelle et Centre de Commandement Exécutif pour Dirigeants d'Entreprise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
