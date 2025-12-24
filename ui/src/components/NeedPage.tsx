import { Scale, Users, Shield, Target } from 'lucide-react';

export default function NeedPage() {
  const reasons = [
    {
      title: 'Establishes Rule of Law',
      description: 'The Constitution ensures that no one is above the law, not even the government. It creates a framework where laws govern the nation, not arbitrary decisions.',
      icon: Scale,
      color: 'blue',
    },
    {
      title: 'Protects Rights',
      description: 'It guarantees fundamental rights to all citizens, protecting them from exploitation and discrimination, ensuring dignity and equality.',
      icon: Shield,
      color: 'purple',
    },
    {
      title: 'Defines Structure',
      description: 'It clearly defines the structure, powers, and duties of government institutions, preventing chaos and ensuring smooth governance.',
      icon: Target,
      color: 'pink',
    },
    {
      title: 'Represents People',
      description: 'It reflects the aspirations and values of the people, creating a government that represents and serves them.',
      icon: Users,
      color: 'orange',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Target className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Need for a Constitution</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Why every nation needs a Constitution
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8 animate-slide-up">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Do We Need a Constitution?</h2>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              {/* TODO: Replace with actual content */}
              A Constitution is essential for any democratic country as it serves as the supreme law that governs the nation. It is the foundation upon which the entire legal and political system is built.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {/* TODO: Replace with actual content */}
              Without a Constitution, there would be no clear rules about how the government should function, how leaders should be chosen, or how citizens' rights should be protected. It prevents the misuse of power and ensures justice for all.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div
                  key={index}
                  className={`bg-gradient-to-br from-${reason.color}-50 to-${reason.color}-100 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-${reason.color}-500 rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{reason.title}</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{reason.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="w-full mb-8">
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex items-center justify-center p-4 min-h-[300px]">
    <img
      src="/images/importance.jpeg"
      alt="Diagram of the importance and structure of the Indian Constitution"
      className="max-w-full h-auto rounded-lg shadow-md object-contain"
    />
  </div>
  {/* Optional Caption for clarity */}
  <p className="text-center text-xs text-gray-400 mt-2 italic">
    Visual representation of the Constitutional framework
  </p>
</div>

          <h3 className="text-2xl font-bold text-gray-800 mb-6">Key Functions of the Constitution</h3>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-6 py-3 bg-blue-50 rounded-r-xl">
              <h4 className="font-bold text-gray-800 text-lg mb-2">Limits Government Power</h4>
              <p className="text-gray-600">
                {/* TODO: Replace with actual content */}
                The Constitution places checks on government power, preventing any single person or institution from becoming too powerful. It distributes power among different branches: Legislature, Executive, and Judiciary.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-6 py-3 bg-purple-50 rounded-r-xl">
              <h4 className="font-bold text-gray-800 text-lg mb-2">Provides Stability</h4>
              <p className="text-gray-600">
                {/* TODO: Replace with actual content */}
                It ensures continuity and stability in governance. Even when governments change, the constitutional framework remains constant, providing predictability and order.
              </p>
            </div>

            <div className="border-l-4 border-pink-500 pl-6 py-3 bg-pink-50 rounded-r-xl">
              <h4 className="font-bold text-gray-800 text-lg mb-2">Promotes Unity</h4>
              <p className="text-gray-600">
                {/* TODO: Replace with actual content */}
                Despite India's diversity in language, religion, and culture, the Constitution unites all citizens under one national identity with shared values and common goals.
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-6 py-3 bg-orange-50 rounded-r-xl">
              <h4 className="font-bold text-gray-800 text-lg mb-2">Enables Social Change</h4>
              <p className="text-gray-600">
                {/* TODO: Replace with actual content */}
                The Constitution provides mechanisms for social reform and progress. It can be amended to meet changing needs while maintaining core values of justice and equality.
              </p>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-6">
            <p className="text-center text-gray-700 font-medium text-lg">
              <span className="text-3xl">🇮🇳</span><br />
              The Constitution is not just a document—it's a living promise to every citizen that their rights will be protected and their voice will be heard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
