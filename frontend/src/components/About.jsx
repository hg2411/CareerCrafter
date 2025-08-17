import React from "react";

const About = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          About <span className="text-blue-600">CareerCrafter</span>
        </h2>
        <p className="text-lg text-gray-600 mb-10">
          CareerCrafter is your one-stop platform for finding the perfect job match.  
          Whether you’re a student searching for opportunities or a recruiter  
          looking for the right talent, we provide tools and features to make the  
          hiring and job application process simple, fast, and effective.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">Our Mission</h3>
            <p className="text-gray-600">
              To connect talented individuals with the best career opportunities  
              and empower recruiters with the tools they need to find the right  
              candidates quickly.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">What We Offer</h3>
            <p className="text-gray-600">
              Real-time updates, seamless communication between recruiters and  
              applicants, resume parsing, job tracking, and more — all in one  
              modern platform.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">Our Vision</h3>
            <p className="text-gray-600">
              To be the most trusted platform for job seekers and recruiters,  
              where opportunities meet talent without unnecessary delays or  
              complications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
