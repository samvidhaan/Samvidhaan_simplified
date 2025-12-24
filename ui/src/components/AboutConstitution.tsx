"use client";

import { useState } from 'react';
import { Book, Scale, Users, Globe, ChevronRight, X, Loader2, Landmark, ShieldCheck, Heart, Lightbulb } from 'lucide-react';

interface Part {
  id: string;
  title: string;
  articles: string;
  content: string[];
}

export default function AboutConstitution() {
  const [showAllParts, setShowAllParts] = useState(false);
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchParts = async () => {
    if (parts.length > 0) {
      setShowAllParts(true);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/constitution/parts");
      const data = await res.json();
      setParts(data);
      setShowAllParts(true);
    } catch (err) {
      console.error("Failed to load parts", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* --- HEADER --- */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Book className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4 tracking-tight">About the Constitution</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">The Supreme Law of India</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8 border border-white">
          <div className="prose max-w-none">
            {/* --- INTRO --- */}
            <h2 className="text-3xl font-bold text-gray-800 mb-6">What is the Indian Constitution?</h2>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-10">
              <p className="text-lg text-gray-700 leading-relaxed">
                The Constitution of India is the supreme law of India. It lays down the framework that demarcates fundamental political code, structure, procedures, powers, and duties of government institutions and sets out fundamental rights, directive principles, and the duties of citizens.
              </p>
            </div>

            {/* --- KEY FEATURES (Original 4 Cards) --- */}
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">Key Features</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <FeatureCard icon={<Scale className="text-blue-600"/>} bg="bg-blue-50" title="Longest Written Constitution" text="Containing 448 articles in 25 parts, 12 schedules, and 105 amendments." />
              <FeatureCard icon={<Users className="text-purple-600"/>} bg="bg-purple-50" title="Federal Structure" text="Establishing a strong central government while dividing powers between the Union and States." />
              <FeatureCard icon={<Globe className="text-pink-600"/>} bg="bg-pink-50" title="Secular State" text="No official state religion, ensuring equal treatment and freedom for all religions." />
              <FeatureCard icon={<Book className="text-orange-600"/>} bg="bg-orange-50" title="Parliamentary System" text="A system of government at both central and state levels based on the Westminster model." />
            </div>

            {/* --- FUNDAMENTAL STRUCTURE (The first 4 Parts) --- */}
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Fundamental Structure</h3>
            <div className="space-y-6 mb-12">
              <PartSnippet 
                icon={<Landmark className="text-blue-500" />} 
                title="Part I : The Union and its Territory" 
                text="India is referred to as a Union of States (Articles 1-4). The unity of the Union cannot be broken, and the territory is divided into States and Union Territories."
                borderColor="border-blue-500" 
              />
              <PartSnippet 
                icon={<ShieldCheck className="text-purple-500" />} 
                title="Part II : Citizenship" 
                text="Articles 5 to 11 address who was eligible for Indian citizenship at the time of enactment and how citizenship is obtained or lost today."
                borderColor="border-purple-500" 
              />
              <PartSnippet 
                icon={<Heart className="text-pink-500" />} 
                title="Part III : Fundamental Rights" 
                text="Articles 12 to 35 guarantee basic rights to all citizens, protecting individuals from arbitrary state actions. These are the core pillars of Indian democracy."
                borderColor="border-pink-500" 
              />
              <PartSnippet 
                icon={<Lightbulb className="text-orange-500" />} 
                title="Part IV : Directive Principles of State Policy" 
                text="Articles 36 to 51 provide guidelines for social and economic justice. While non-justiciable in court, they are fundamental in the governance of the country."
                borderColor="border-orange-500" 
              />
            </div>

            {/* --- VIEW ALL BUTTON (Now below the Structure list) --- */}
            <div className="flex justify-center mb-16">
              <button 
                onClick={fetchParts}
                className="group bg-gray-900 text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-gray-800 transition-all shadow-2xl active:scale-95"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Book className="w-6 h-6" />}
                Explore All 22 Parts of the Constitution
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* --- HISTORY IMAGE SECTION --- */}
            <div className="bg-gradient-to-r from-orange-50 to-green-50 rounded-3xl p-8 border border-gray-100">
              <div className="text-center">
                <img
                  src="/images/handwritten_constitution.webp"
                  alt="Handwritten Constitution"
                  className="mx-auto rounded-2xl shadow-xl max-w-lg w-full mb-6"
                />
                <p className="text-gray-700 font-bold text-lg italic">
                  "The original Constitution was handwritten and calligraphed in Hindi and English"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- SIDE PANEL FOR 22 PARTS (Remains the same) --- */}
      {showAllParts && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setShowAllParts(false)} />
          <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-2xl font-bold text-gray-900">Constitutional Parts</h2>
              <button onClick={() => setShowAllParts(false)} className="p-2 hover:bg-gray-200 rounded-xl"><X className="w-6 h-6"/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-10">
              {parts.map((part) => (
                <div key={part.id} className="relative pl-8 border-l-2 border-gray-100">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm" />
                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded">{part.articles}</span>
                  <h4 className="text-xl font-bold text-gray-900 mt-2 mb-3">{part.title}</h4>
                  <ul className="space-y-2">
                    {part.content.map((p, i) => (
                      <li key={i} className="text-gray-600 text-sm flex gap-2"><div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0" />{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- SUB-COMPONENTS ---

function FeatureCard({ icon, bg, title, text }: any) {
  return (
    <div className={`${bg} p-6 rounded-2xl border border-white shadow-sm`}>
      <div className="mb-4">{icon}</div>
      <h4 className="text-xl font-bold text-gray-800 mb-2">{title}</h4>
      <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
    </div>
  );
}

function PartSnippet({ icon, title, text, borderColor }: any) {
  return (
    <div className={`flex items-start gap-4 p-5 rounded-2xl bg-gray-50/50 border-l-4 ${borderColor} transition-colors hover:bg-white hover:shadow-md`}>
      <div className="mt-1">{icon}</div>
      <div>
        <h4 className="font-bold text-gray-800 text-lg mb-1">{title}</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}