import React, { useState } from "react";

// Basic FAQ for Sagemcom Support (expand as needed)
const FAQ = [
  {
    question: "Comment obtenir un guide d'utilisation pour mon produit Sagemcom ?",
    answer:
      "Vous pouvez obtenir les guides d'utilisation depuis la page support officielle : https://support.sagemcom.com/fr. Sélectionnez la catégorie de votre produit, puis accédez à la documentation disponible.",
  },
  {
    question: "Comment contacter le support Sagemcom ?",
    answer:
      "Utilisez le formulaire de contact sur https://support.sagemcom.com/fr/contact pour joindre notre équipe support.",
  },
  {
    question: "Où trouver les mises à jour logicielles ?",
    answer:
      "Les mises à jour logicielles sont disponibles dans la section de votre produit sur https://support.sagemcom.com/fr. Cliquez sur la catégorie de votre appareil pour voir les téléchargements.",
  },
  {
    question: "Quels sont les produits supportés ?",
    answer:
      "Nous supportons : Haut débit (DSL, Câble, Fibre, Hybrid LTE), Décodeurs/Son, Blocs d'alimentation, Compteurs d'énergie. Retrouvez-les sur la page d'accueil du support.",
  },
  {
    question: "Comment réinitialiser mon appareil Sagemcom ?",
    answer:
      "Veuillez consulter le guide d'utilisation de votre appareil pour les instructions de réinitialisation. Les guides sont disponibles sur https://support.sagemcom.com/fr.",
  },
  {
    question: "Où puis-je trouver les certificats CE ?",
    answer:
      "Les certificats CE sont accessibles sur la page produit correspondante sur https://support.sagemcom.com/fr.",
  },
];

function getBotResponse(input) {
  input = input.toLowerCase();
  for (let faq of FAQ) {
    if (input.includes(faq.question.toLowerCase().split(" ")[0])) {
      return faq.answer;
    }
    if (input.includes("guide") && input.includes("utilisation")) return FAQ[0].answer;
    if (input.includes("contact")) return FAQ[1].answer;
    if (input.includes("mise à jour") || input.includes("logiciel")) return FAQ[2].answer;
    if (input.includes("produit") && input.includes("support")) return FAQ[3].answer;
    if (input.includes("réinitialiser")) return FAQ[4].answer;
    if (input.includes("certificat")) return FAQ[5].answer;
  }
  return "Je suis désolé, je n'ai pas compris votre demande. Veuillez préciser votre question ou consulter https://support.sagemcom.com/fr.";
}

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Bonjour ! Je suis le chatbot support Sagemcom. Comment puis-je vous aider ?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    const botMsg = { from: "bot", text: getBotResponse(input) };
    setMessages((msgs) => [...msgs, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 w-80 max-w-full shadow-2xl rounded-xl bg-white border border-blueGray-200 flex flex-col">
      <div className="bg-blue-900 text-white px-4 py-3 rounded-t-xl font-bold">Support Sagemcom - Chatbot</div>
      <div className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: 300 }}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`px-3 py-2 rounded-lg text-sm max-w-[75%] ${
                msg.from === "user"
                  ? "bg-emerald-500 text-white self-end"
                  : "bg-blueGray-100 text-blueGray-800 self-start"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="flex border-t border-blueGray-100">
        <input
          className="flex-1 px-3 py-2 rounded-bl-xl outline-none"
          type="text"
          placeholder="Tapez votre question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-4 py-2 rounded-br-xl"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}
