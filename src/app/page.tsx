import WaveWaterBackground from "@/components/custom/bgwater";
import Chatbot from "@/app/chatbot/chatbot";

export default function Home() {

  return (
    <div className="h-screen flex items-center justify-center">

      <WaveWaterBackground />
      <div className="absolute top-20 left-0 w-full h-full">
      <Chatbot />
      </div>
    </div>
  );
}
