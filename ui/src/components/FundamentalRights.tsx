import { Shield, Megaphone, Users, Heart, Book, Briefcase } from 'lucide-react';

export default function FundamentalRights() {
  const rights = [
    {
      title: 'Right to Equality',
      articles: 'Articles 14-18',
      description: 'Equality before law, prohibition of discrimination, equality of opportunity in employment, abolition of untouchability, and abolition of titles.',
      icon: Users,
      color: 'blue',
    },
    {
      title: 'Right to Freedom',
      articles: 'Articles 19-22',
      description: 'Freedom of speech and expression, assembly, association, movement, residence, and profession.',
      icon: Megaphone,
      color: 'purple',
    },
    {
      title: 'Right against Exploitation',
      articles: 'Articles 23-24',
      description: 'Prohibition of human trafficking, forced labor, and child labor in hazardous industries.',
      icon: Shield,
      color: 'pink',
    },
    {
      title: 'Right to Freedom of Religion',
      articles: 'Articles 25-28',
      description: 'Freedom of conscience, free profession, practice and propagation of religion.',
      icon: Heart,
      color: 'orange',
    },
    {
      title: 'Cultural and Educational Rights',
      articles: 'Articles 29-30',
      description: 'Protection of interests of minorities, right to establish and administer educational institutions.',
      icon: Book,
      color: 'green',
    },
    {
      title: 'Right to Constitutional Remedies',
      articles: 'Article 32',
      description: 'Right to move to Supreme Court for enforcement of Fundamental Rights.',
      icon: Briefcase,
      color: 'indigo',
    },
  ];

  const duties = [
    'Abide by the Constitution and respect its ideals',
    'Cherish and follow noble ideals of the freedom struggle',
    'Uphold and protect sovereignty, unity and integrity of India',
    'Defend the country and render national service when called',
    'Promote harmony and spirit of common brotherhood',
    'Preserve rich heritage of our composite culture',
    'Protect and improve natural environment',
    'Develop scientific temper and humanism',
    'Safeguard public property',
    'Strive towards excellence in all spheres',
    'Provide opportunities for education to children',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Fundamental Rights & Duties</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The cornerstone of Indian democracy
          </p>
        </div>

        <div className="mb-12">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-slide-up">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Fundamental Rights</h2>

            <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-2xl p-6 mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                 
                Fundamental Rights are the basic human rights enshrined in the Constitution of India which are guaranteed to all citizens. They are applied without discrimination on the basis of race, religion, gender, etc. These rights are enforceable by the courts, subject to certain restrictions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {rights.map((right, index) => {
                const Icon = right.icon;
                return (
                  <div
                    key={index}
                    className={`bg-gradient-to-br from-${right.color}-50 to-${right.color}-100 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 animate-slide-up`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-${right.color}-500 rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{right.title}</h3>
                        <p className={`text-${right.color}-700 font-semibold text-sm mb-3`}>{right.articles}</p>
                        <p className="text-gray-700 text-sm leading-relaxed">{right.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 bg-gradient-to-r from-orange-100 to-pink-100 rounded-2xl p-8">
              
              {/* Optimized Container: Removed h-48 to prevent clipping */}
<div className="bg-white rounded-2xl flex items-center justify-center mb-6 p-4 shadow-sm border border-gray-100">
  <div className="relative w-full max-w-lg">
    <img
      src="/images/fundamental_rights.png"
      alt="Diagram of the six Fundamental Rights of the Indian Constitution"
      className="mx-auto rounded-xl shadow-lg w-full h-auto block object-contain"
    />
  </div>
</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-slide-up">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Fundamental Duties</h2>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
               
              Fundamental Duties were added to the Constitution by the 42nd Amendment in 1976. These are moral obligations of all citizens to help promote a spirit of patriotism and to uphold the unity of India. Originally 10 in number, one more duty was added by the 86th Amendment in 2002.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {duties.map((duty, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 transform hover:scale-102 transition-all duration-300"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                  {index + 1}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{duty}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gradient-to-r from-blue-100 to-green-100 rounded-2xl p-6">
            <p className="text-center text-gray-700 font-medium">
              <span className="text-2xl">💡</span> Remember: Rights and Duties go hand in hand. While the Constitution guarantees us rights, it also expects us to fulfill our duties as responsible citizens!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
