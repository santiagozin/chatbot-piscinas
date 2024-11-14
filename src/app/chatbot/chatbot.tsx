'use client'

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


// Definir interfaces para tipado
interface Message {
  text: string;
  isBot: boolean;
}

interface RecommendedProduct {
  name: string;
  description: string;
  price: number;
  imageUrl?: string; // Propiedad opcional si decides usar una imagen por defecto
}


export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "¡Hola! 👋 Soy tu asistente experto en piscinas. ¿En qué puedo ayudarte?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedProduct, setRecommendedProduct] = useState<RecommendedProduct | null>(null);

  const productImages: { [key: string]: string } = {
    'Alguicida': '/alguicida.png',
    'Cloro': '/cloro.png',
    'Regulador pH': '/assets/regulador-ph.png',
    // Agregar más productos según sea necesario
  };

  const obtenerRespuestaIA = async (mensajeUsuario: string) => {
    try {
      const response = await fetch("http://localhost:4000/api/chat/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: "session123", // Aquí deberías generar o manejar el sessionId
          message: mensajeUsuario,
          userEmail: "usuario@ejemplo.com", // Aquí deberías obtener el email del usuario
        }),
      });

      if (!response.ok) throw new Error("Error en la respuesta de la IA");

      const data = await response.json();
      return {
        message: data.message,
        recommendedProduct: data.recommendedProduct,
      };
    } catch (error) {
      console.error("Error al obtener respuesta de la IA:", error);
      return {
        message: "Lo siento, hubo un error al procesar tu mensaje. ¿Podrías intentarlo de nuevo?",
        recommendedProduct: null,
      };
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage = input;
    setInput("");

    setMessages((prev) => [...prev, { text: userMessage, isBot: false }]);

    const respuesta = await obtenerRespuestaIA(userMessage);

    setMessages((prev) => [...prev, { text: respuesta.message, isBot: true }]);
    setRecommendedProduct(respuesta.recommendedProduct);
    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 z-[99999999]">
      <h3 className="text-white text-4xl font-extrabold uppercase mb-5"><span className="text-gray-200 mb-2 block">Consultanos</span> como mejorar tu pileta !</h3>
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="h-96 overflow-y-auto mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  message.isBot ? "text-left" : "text-right"
                }`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    message.isBot
                      ? "bg-blue-100 text-blue-900"
                      : "bg-green-100 text-green-900"
                  }`}
                >
                  {message.text}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="">
                <span className="inline-block p-2 bg-gray-100 rounded-lg">
                  Pensando...
                </span>
              </div>
            )}
          </div>

             <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Describe el estado de tu piscina..."
              className="flex-1 p-2 border rounded-lg"
              disabled={isLoading}
            />
            <Button className="bg-cyan-500 hover:bg-cyan-600" onClick={handleSend} disabled={isLoading}>
             Preguntar
            </Button>
          </div>
        </CardContent>
      </Card>
      {recommendedProduct && (
            <div className="mb-4 bg-white rounded-lg p-4 shadow-xl z-[99999999] absolute">
              <h3 className="font-medium mb-2">Te recomendamos:</h3>
              <div className=" p-2 rounded-lg hover:bg-gray-50">
                <img 
                  src={productImages[recommendedProduct.name] ?? '/alguicida.png'}
                  alt={recommendedProduct.name} 
                  width={50}
                  height={50}
                  className="w-full h-auto mb-2 rounded-lg max-w-[100px]"
                />
                <h4 className="font-bold">{recommendedProduct.name}</h4>
                <p className="text-sm">{recommendedProduct.description}</p>
                <p className="text-green-600 font-bold">${recommendedProduct.price}</p>
                <Button
                  className="mt-2 bg-cyan-500 hover:bg-cyan-600"
                  onClick={() => alert(`Producto agregado: ${recommendedProduct.name}`)}
                >
                  Agregar al carrito
                </Button>
              </div>
            </div>
          )}
    </div>
  );
}

