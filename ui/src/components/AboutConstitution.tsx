import { Book, Scale, Users, Globe } from 'lucide-react';

export default function AboutConstitution() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Book className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">About the Constitution</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The Supreme Law of India
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8 animate-slide-up">
          <div className="prose max-w-none">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">What is the Indian Constitution?</h2>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {/* TODO: Replace with actual content */}
                The Constitution of India is the supreme law of India. It lays down the framework that demarcates fundamental political code, structure, procedures, powers, and duties of government institutions and sets out fundamental rights, directive principles, and the duties of citizens.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-4">Key Features</h3>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
                <Scale className="w-12 h-12 text-blue-600 mb-4" />
                <h4 className="text-xl font-bold text-gray-800 mb-2">Longest Written Constitution</h4>
                <p className="text-gray-600">
                  {/* TODO: Replace with actual content */}
                  The Indian Constitution is the longest written constitution of any country in the world, containing 448 articles in 25 parts, 12 schedules, and 105 amendments.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6">
                <Users className="w-12 h-12 text-purple-600 mb-4" />
                <h4 className="text-xl font-bold text-gray-800 mb-2">Federal Structure</h4>
                <p className="text-gray-600">
                  {/* TODO: Replace with actual content */}
                  It establishes a federal structure with a strong central government, dividing powers between the Union and the States.
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6">
                <Globe className="w-12 h-12 text-pink-600 mb-4" />
                <h4 className="text-xl font-bold text-gray-800 mb-2">Secular State</h4>
                <p className="text-gray-600">
                  {/* TODO: Replace with actual content */}
                  India is a secular state with no official state religion, ensuring equal treatment of all religions.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6">
                <Book className="w-12 h-12 text-orange-600 mb-4" />
                <h4 className="text-xl font-bold text-gray-800 mb-2">Parliamentary System</h4>
                <p className="text-gray-600">
                  {/* TODO: Replace with actual content */}
                  India follows a parliamentary system of government at both central and state levels.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-100 to-green-100 rounded-2xl p-8 mb-8">
              {/* TODO: Replace this placeholder with actual historical image */}
              <div className="text-center">
  <img
  src="/images/handwritten_constitution.webp"
  alt="Original handwritten Constitution of India"
  className="mx-auto rounded-xl shadow-lg max-w-lg w-full"
 />

  <p className="text-gray-500 mt-2 text-sm">
    Original handwritten Constitution of India
  </p>
</div>

              <p className="text-center text-gray-700 font-medium">
                The original Constitution was handwritten and calligraphed in Hindi and English
              </p>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-4">Structure of the Constitution</h3>

            <div className="space-y-4 mb-8">
              <div className="border-l-4 border-blue-500 pl-6 py-2">
                <h4 className="font-bold text-gray-800 text-lg">The Preamble</h4>
                <p className="text-gray-600">
                  {/* TODO: Replace with actual content */}
                  The preamble declares India as a Sovereign, Socialist, Secular, Democratic Republic and aims to secure justice, liberty, equality, and fraternity for all citizens.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-6 py-2">
                <h4 className="font-bold text-gray-800 text-lg">Fundamental Rights (Part III)</h4>
                <p className="text-gray-600">
                  {/* TODO: Replace with actual content */}
                  These are the basic rights guaranteed to all citizens, ensuring protection against arbitrary state actions.
                </p>
              </div>

              <div className="border-l-4 border-pink-500 pl-6 py-2">
                <h4 className="font-bold text-gray-800 text-lg">Directive Principles (Part IV)</h4>
                <p className="text-gray-600">
                  {/* TODO: Replace with actual content */}
                  These provide guidelines for the government to establish social and economic justice.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6 py-2">
                <h4 className="font-bold text-gray-800 text-lg">Fundamental Duties (Part IVA)</h4>
                <p className="text-gray-600">
                  {/* TODO: Replace with actual content */}
                  These are moral obligations of all citizens to help promote a spirit of patriotism.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
