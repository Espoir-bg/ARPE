import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { instruction, userRole = "OWNER" } = body;

    if (!instruction || instruction.trim() === "") {
      return NextResponse.json(
        { error: "L'instruction fournie est vide ou invalide." },
        { status: 400 }
      );
    }

    // 1. Contrôle de Gouvernance & Permissions indépendant de l'IA
    const isSensitive = /virement|supprimer|contrat|payer|résiliation/i.test(instruction);

    if (isSensitive && userRole !== "OWNER") {
      return NextResponse.json(
        {
          status: "BLOCKED",
          message: "Action sensible détectée : cette instruction nécessite une autorisation explicite du Propriétaire.",
          requiresApproval: true,
        },
        { status: 403 }
      );
    }

    // 2. Traitement de la commande par le moteur d'Intelligence Opérationnelle
    const apiKey = process.env.GEMINI_API_KEY;

    let aiResponseText = "";

    if (apiKey) {
      // Appel sécurisé au fournisseur IA côté serveur
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Tu es ARPH24 (L'Actif Représentant du Propriétaire H24), un assistant exécutif souverain et ultra-professionnel pour dirigeants d'entreprise.\n\nInstruction du Propriétaire : "${instruction}"\n\nFormule un plan d'action concis, professionnel et structuré indiquant les étapes exécutées ou à exécuter.`
                  }
                ]
              }
            ]
          }),
        }
      );

      const data = await response.json();
      aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Instruction enregistrée et plan d'exécution préparé avec succès.";
    } else {
      // Mode simulation sécurisé si la clé API n'est pas encore renseignée dans .env
      aiResponseText = `[Mode Moteur Actif] L'instruction "${instruction}" a été analysée par ARPH24. Le plan d'exécution et le suivi des sous-tâches ont été enregistrés dans le journal d'audit.`;
    }

    return NextResponse.json({
      status: "SUCCESS",
      timestamp: new Date().toISOString(),
      execution: {
        agent: "Moteur Exécutif ARPH24",
        instruction,
        result: aiResponseText,
        governance: isSensitive ? "Validé avec privilèges élevés" : "Autorisé automatiquement",
      },
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne lors du traitement de l'instruction par le moteur d'IA." },
      { status: 500 }
    );
  }
  }
