import { Calendar, Users, Pen, Flag } from 'lucide-react';

export default function HistoryPage() {
  const timeline = [
    {
      date: '9 December 1946',
      title: 'First Meeting',
      description: 'The Constituent Assembly held its first meeting',
      icon: Users,
      color: 'blue',
    },
    {
      date: '13 December 1946',
      title: 'Objective Resolution',
      description: 'Jawaharlal Nehru moved the Objective Resolution',
      icon: Flag,
      color: 'purple',
    },
    {
      date: '29 August 1947',
      title: 'Drafting Committee',
      description: 'Drafting Committee was appointed with Dr. B.R. Ambedkar as Chairman',
      icon: Pen,
      color: 'pink',
    },
    {
      date: '26 November 1949',
      title: 'Constitution Adopted',
      description: 'The Constitution was adopted by the Constituent Assembly',
      icon: Calendar,
      color: 'orange',
    },
    {
      date: '26 January 1950',
      title: 'Constitution Enforced',
      description: 'The Constitution came into effect, and India became a Republic',
      icon: Flag,
      color: 'green',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">History of the Constitution</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The Journey from Vision to Reality
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8 animate-slide-up">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">The Making of the Constitution</h2>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                {/* TODO: Replace with actual content */}
                The Constitution of India was drafted by the Constituent Assembly, which was elected by the elected members of the provincial assemblies. The Assembly met for the first time on December 9, 1946.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {/* TODO: Replace with actual content */}
                It took 2 years, 11 months, and 18 days to complete the Constitution. During this period, the Assembly held 11 sessions covering a total of 165 days.
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-purple-50 rounded-2xl p-6 md:p-8 mb-8 border border-white/50 shadow-sm">
  {/* Container: Removed fixed h-64. Used aspect-ratio or natural height instead. */}
  <div className="bg-white rounded-xl overflow-hidden mb-4 shadow-inner flex flex-col items-center">
    <img
      src="/images/assembly.webp"
      alt="Members of the Constituent Assembly of India"
      className="w-full h-auto max-h-[450px] object-contain block mx-auto"
    />
  </div>
  
  <p className="text-center text-gray-600 font-medium text-sm md:text-base">
    <span className="block w-8 h-1 bg-orange-400 mx-auto mb-2 rounded-full"></span>
    Members of the Constituent Assembly during a session
  </p>
</div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Timeline</h2>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 hidden md:block"></div>

              <div className="space-y-8">
                {timeline.map((event, index) => {
                  const Icon = event.icon;
                  const isEven = index % 2 === 0;

                  return (
                    <div key={index} className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} animate-slide-up`}>
                      <div className={`flex-1 ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                        <div className={`bg-gradient-to-br from-${event.color}-50 to-${event.color}-100 rounded-2xl p-6 inline-block`}>
                          <p className="text-sm font-bold text-gray-600 mb-2">{event.date}</p>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                          <p className="text-gray-700">{event.description}</p>
                        </div>
                      </div>

                      <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-current shadow-lg flex items-center justify-center hidden md:flex" style={{ color: `var(--${event.color}-500)` }}>
                        <Icon className={`w-6 h-6 text-${event.color}-600`} />
                      </div>

                      <div className="flex-1"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Key Personalities</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
                {/* TODO: Replace with actual image */}
                <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden border-2 border-gray-100 shadow-sm">
  <img
    src="/images/ambedkar.png"
    alt="Dr. B.R. Ambedkar"
    className="w-full h-full object-cover"
  />
</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Dr. B.R. Ambedkar</h3>
                <p className="text-blue-700 font-semibold mb-2">Chairman, Drafting Committee</p>
                <p className="text-gray-600 text-sm">
                  {/* TODO: Replace with actual content */}
                  Known as the Father of the Indian Constitution
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
                {/* TODO: Replace with actual image */}
                <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden border-2 border-gray-100 shadow-sm">
  <img
    src="/images/nehru.jpg"
    alt="Jawaharlal Nehru"
    className="w-full h-full object-cover"
  />
</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Jawaharlal Nehru</h3>
                <p className="text-purple-700 font-semibold mb-2">First Prime Minister</p>
                <p className="text-gray-600 text-sm">
                  {/* TODO: Replace with actual content */}
                  Moved the Objective Resolution
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
                {/* TODO: Replace with actual image */}
                <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden border-2 border-gray-100 shadow-sm">
  <img
    src="/images/patel.jfif"
    alt="Sardar Vallabhbhai Patel"
    className="w-full h-full object-cover"
  />
</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Sardar Vallabhbhai Patel</h3>
                <p className="text-pink-700 font-semibold mb-2">Deputy Prime Minister</p>
                <p className="text-gray-600 text-sm">
                  {/* TODO: Replace with actual content */}
                  Instrumental in integrating princely states
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
