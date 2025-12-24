"use client";

import { Calendar, Users, Pen, Flag, Shield, Landmark, BookOpen, Briefcase } from 'lucide-react';

export default function HistoryPage() {
  const timeline = [
    {
      date: '9 December 1946',
      title: 'First Meeting',
      description: 'The Constituent Assembly held its first meeting in the Constitution Hall (now Central Hall of Parliament).',
      icon: Users,
      color: 'blue',
    },
    {
      date: '13 December 1946',
      title: 'Objective Resolution',
      description: 'Jawaharlal Nehru moved the Objective Resolution, outlining the underlying principles of the Constitution.',
      icon: Flag,
      color: 'purple',
    },
    {
      date: '29 August 1947',
      title: 'Drafting Committee',
      description: 'The Drafting Committee was appointed with Dr. B.R. Ambedkar as Chairman to prepare the formal draft.',
      icon: Pen,
      color: 'pink',
    },
    {
      date: '26 November 1949',
      title: 'Constitution Adopted',
      description: 'The final draft was adopted. It originally contained 395 Articles and 8 Schedules.',
      icon: Calendar,
      color: 'orange',
    },
    {
      date: '26 January 1950',
      title: 'Constitution Enforced',
      description: 'The Constitution came into effect officially. India ceased to be a British Dominion and became a Republic.',
      icon: Shield,
      color: 'green',
    },
  ];

  const leaders = [
    {
      name: 'Dr. B.R. Ambedkar',
      role: 'Chairman, Drafting Committee',
      desc: 'Chief architect and Father of the Indian Constitution.',
      img: '/images/ambedkar.png',
      color: 'blue'
    },
    {
      name: 'Dr. Rajendra Prasad',
      role: 'President of Assembly',
      desc: 'Elected President of the Constituent Assembly on Dec 11, 1946.',
      img: '/images/rajendraprasad.jfif',
      color: 'purple'
    },
    {
      name: 'Jawaharlal Nehru',
      role: 'Union Constitution Committee',
      desc: 'Presented the Objectives Resolution and chaired Union Powers.',
      img: '/images/nehru.jpg',
      color: 'pink'
    },
    {
      name: 'Sardar Vallabhbhai Patel',
      role: 'Advisory Committee Head',
      desc: 'Led the committee on Fundamental Rights and Minorities.',
      img: '/images/patel.jfif',
      color: 'orange'
    },
    {
      name: 'Maulana Abul Kalam Azad',
      role: 'Senior Leader & Debater',
      desc: 'A significant voice in debates on education and secularism.',
      img: '/images/azad.jfif',
      color: 'green'
    },
    {
      name: 'B.N. Rau',
      role: 'Constitutional Advisor',
      desc: 'Prepared the initial draft and advised the Drafting Committee.',
      img: '/images/b.n.rau.jfif',
      color: 'indigo'
    },
    {
      name: 'H.C. Mookerjee',
      role: 'Vice-President of Assembly',
      desc: 'A prominent leader representing the minority communities.',
      img: '/images/h.c.mukharjee.jfif',
      color: 'red'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-orange-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3 shadow-xl">
            <Calendar className="w-12 h-12 text-white -rotate-3" />
          </div>
          <h1 className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">History of the Constitution</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">
            A journey of 2 years, 11 months, and 18 days from vision to reality.
          </p>
        </div>

        {/* --- INTRO SECTION --- */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-slate-100">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Landmark className="text-indigo-600" /> The Making
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-slate-600 leading-relaxed">
                  The Constitution of India was drafted by the Constituent Assembly, elected by the members of the provincial assemblies. The Assembly met for the first time in 1946 to build a sovereign nation.
                </p>
                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                  <p className="text-slate-800 font-semibold italic">
                    "The Assembly held 11 sessions covering 165 days, meticulously debating every article to ensure justice and liberty for all."
                  </p>
                </div>
              </div>
            </div>
            <div className="relative group">
               <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
               <div className="relative bg-white p-2 rounded-2xl shadow-sm">
                  <img
                    src="/images/assembly.webp"
                    alt="Constituent Assembly"
                    className="rounded-xl w-full h-auto"
                  />
                  <p className="text-center text-slate-500 text-xs mt-3 font-bold uppercase tracking-widest">Historical Session: Constituent Assembly of India</p>
               </div>
            </div>
          </div>
        </div>

        {/* --- TIMELINE --- */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center flex items-center justify-center gap-3">
            <BookOpen className="text-orange-500" /> Timeline of Events
          </h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-slate-200 hidden md:block"></div>
            <div className="space-y-12">
              {timeline.map((event, index) => (
                <TimelineItem key={index} event={event} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* --- KEY PERSONALITIES --- */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-2">
              <Users className="text-indigo-600" /> Key Personalities
            </h2>
            <p className="text-slate-500 font-medium">The visionaries who shaped our democracy</p>
          </div>

          {/* Expanded Grid for all 7 leaders */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leaders.map((leader, index) => (
              <LeaderCard key={index} leader={leader} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function TimelineItem({ event, index }: any) {
  const Icon = event.icon;
  const isEven = index % 2 === 0;
  
  return (
    <div className={`relative flex items-center justify-between md:justify-normal ${isEven ? 'md:flex-row-reverse' : ''} group`}>
      <div className="hidden md:block w-1/2"></div>
      <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center z-10 group-hover:border-indigo-500 transition-colors">
        <Icon className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
      </div>
      <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <span className="text-indigo-600 font-bold text-sm">{event.date}</span>
          <h3 className="text-lg font-bold text-slate-800 mt-1 mb-2">{event.title}</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{event.description}</p>
        </div>
      </div>
    </div>
  );
}

function LeaderCard({ leader }: any) {
  return (
    <div className="bg-white rounded-3xl p-6 text-center border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
      <div className="relative w-28 h-28 mx-auto mb-4">
        <div className="absolute inset-0 bg-indigo-100 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform"></div>
        <div className="relative w-28 h-28 bg-slate-100 rounded-2xl overflow-hidden border-2 border-white shadow-sm">
          <img
            src={leader.img}
            alt={leader.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <h3 className="text-lg font-bold text-slate-800 leading-tight">{leader.name}</h3>
      <p className="text-indigo-600 text-xs font-black uppercase tracking-wider mt-2 mb-3">{leader.role}</p>
      <p className="text-slate-500 text-xs leading-relaxed">{leader.desc}</p>
    </div>
  );
}