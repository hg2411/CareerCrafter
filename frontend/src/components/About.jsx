"use client"

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-30"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-pink-200 rounded-full opacity-20"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-purple-200 rounded-full opacity-25"></div>
      <div className="absolute bottom-20 right-40 w-16 h-16 bg-yellow-200 rounded-full opacity-40"></div>

      {/* Floating shapes */}
      <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-orange-400 rotate-45 animate-bounce"></div>
      <div className="absolute top-1/2 right-1/3 w-6 h-6 bg-pink-400 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/3 w-5 h-5 bg-purple-400 rotate-45 animate-bounce delay-300"></div>

      <section className="relative z-10 py-16 px-6 md:px-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Header Section */}
          <div className="mb-16">
            <div className="inline-flex items-center bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              ✨ Learn More About Us
            </div>
            <h2 className="text-5xl lg:text-6xl font-black mb-8 leading-tight">
              <span className="text-gray-900">About</span>
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                CareerCrafter
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
              CareerCrafter is your one-stop platform for finding the perfect job match. Whether you're a student
              searching for opportunities or a recruiter looking for the right talent, we provide tools and features to
              make the hiring and job application process simple, fast, and effective.
            </p>
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 p-8 group hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To connect talented individuals with the best career opportunities and empower recruiters with the tools
                they need to find the right candidates quickly.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 p-8 group hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors">
                What We Offer
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Real-time updates, seamless communication between recruiters and applicants, resume parsing, job
                tracking, and more — all in one modern platform.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 p-8 group hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To be the most trusted platform for job seekers and recruiters, where opportunities meet talent without
                unnecessary delays or complications.
              </p>
            </div>
          </div>

          {/* Additional decorative section */}
          <div className="mt-20 bg-white rounded-3xl shadow-2xl border-2 border-gray-100 p-12 transform hover:shadow-3xl transition-all duration-300">
            <div className="flex items-center justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-4">
              Built with{" "}
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                passion
              </span>
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every feature in CareerCrafter is designed with both job seekers and recruiters in mind, ensuring a
              smooth, efficient, and enjoyable experience for everyone involved in the hiring process.
            </p>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default About
