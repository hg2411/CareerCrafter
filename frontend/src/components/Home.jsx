import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllJobs from "@/hooks/useGetAllJobs.jsx";
import Navbar from "./shared/Navbar.jsx";
import CategoryCarousel from "./CategoryCarousel.jsx";
import LatestJobs from "./LatestJobs.jsx";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import useGetStats from "@/hooks/useGetStats.jsx";

const Home = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const { allJobs, loading } = useSelector((store) => store.job);
  const { stats, loading: statsLoading } = useGetStats();

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="w-full bg-gray-50 text-gray-900">
      <Navbar />

      {/* ✨ Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-6 py-24 md:py-32 text-center bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full blur-[150px] opacity-20"></div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold max-w-4xl mb-6 leading-tight">
          Discover Your <span className="text-yellow-300">Perfect Job</span> on CareerCrafter
        </h1>
        <p className="max-w-xl mb-8 text-white/90">
          Find jobs that match your passion. Explore top categories, connect with trusted recruiters, and build your future.
        </p>

        <div className="flex items-center w-full max-w-2xl rounded-full overflow-hidden bg-white shadow-md mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, company, or skills..."
            className="flex-grow px-5 py-3 text-gray-700 outline-none"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button
            onClick={handleSearch}
            className="bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] text-white rounded-none rounded-r-full"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => navigate("/jobs")}
            className="bg-yellow-300 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-400"
          >
            Browse Jobs
          </Button>
          <Button
            onClick={() => navigate("/browse")}
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-[#6A38C2] px-6 py-3 rounded-full font-semibold"
          >
            Explore Categories
          </Button>
        </div>
      </section>

      {/* 📝 Latest Jobs */}
      <section className="py-20 px-6 md:px-24 bg-gray-50">
        <div className="bg-white rounded-2xl shadow p-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading jobs...</p>
          ) : (
            <LatestJobs jobs={allJobs?.slice(0, 6)} />
          )}
        </div>
        <div className="mt-10 text-center">
          <Button
            onClick={() => navigate("/jobs")}
            className="bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform shadow"
          >
            View All Jobs
          </Button>
        </div>
      </section>

      {/* 📊 Stats */}
      <section className="py-16 px-6 md:px-24 grid md:grid-cols-3 gap-8 text-center">
        {[
          {
            count: `${allJobs?.length || 0}+`,
            label: "Jobs Posted",
            icon: "💼",
            gradient: "from-yellow-200 via-yellow-300 to-yellow-400",
          },
          {
            count: statsLoading ? "..." : `${stats.recruiters ?? 0}+`,
            label: "Recruiters",
            icon: "🧑‍💼",
            gradient: "from-purple-200 via-purple-300 to-purple-400",
          },
          {
            count: statsLoading ? "..." : `${stats.activeUsers ?? 0}+`,
            label: "Active Users",
            icon: "👥",
            gradient: "from-pink-200 via-pink-300 to-pink-400",
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-br ${stat.gradient} rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center transform hover:-translate-y-1 transition duration-300`}
          >
            <div className="text-5xl mb-4">{stat.icon}</div>
            <h3 className="text-4xl md:text-5xl font-extrabold text-gray-800">{stat.count}</h3>
            <p className="mt-2 text-gray-700 font-medium">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* 🌟 Feature Highlights */}
      <section className="py-16 px-6 md:px-24 grid md:grid-cols-3 gap-8 text-center">
        {[
          {
            title: "Verified Recruiters",
            text: "Only trusted companies and verified employers.",
            icon: "✅",
            gradient: "from-green-400 to-green-500",
          },
          {
            title: "Easy Application",
            text: "Apply to jobs in seconds with your profile or resume.",
            icon: "⚡",
            gradient: "from-yellow-400 to-yellow-500",
          },
          {
            title: "Personalized Matches",
            text: "Get recommendations based on your skills and interests.",
            icon: "🎯",
            gradient: "from-purple-400 to-purple-500",
          },
        ].map((feature, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col items-center justify-center transition transform hover:-translate-y-1"
          >
            <div
              className={`bg-gradient-to-r ${feature.gradient} text-white rounded-full h-14 w-14 flex items-center justify-center text-2xl shadow-md mb-4`}
            >
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.text}</p>
          </div>
        ))}
      </section>

{/* ❤️ Testimonials */}
<section className="py-20 px-6 md:px-24 bg-gradient-to-b from-[#f3e8ff] to-white">
  <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-14 text-gray-800">
    What Our Users Say
  </h2>
  <div className="grid gap-10 md:grid-cols-3">
    {[
      { name: "Alex", text: "CareerCrafter helped me land my dream role quickly and easily!", img: "https://i.pravatar.cc/100?img=32" },
      { name: "Priya", text: "As a recruiter, it’s the simplest and most powerful tool I’ve used.", img: "https://i.pravatar.cc/100?img=47" },
      { name: "John", text: "Clean design, smooth experience, and plenty of opportunities!", img: "https://i.pravatar.cc/100?img=12" },
    ].map((t, idx) => (
      <div
        key={idx}
        className="relative bg-white/30 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:scale-105 hover:shadow-2xl transition transform text-center border border-white/40"
      >
        <div className="flex justify-center mb-4">
          <img
            src={t.img}
            alt={t.name}
            className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
          />
        </div>
        <p className="text-gray-700 italic mb-4">“{t.text}”</p>
        <h4 className="font-semibold text-[#6A38C2]">— {t.name}</h4>
        <div className="absolute top-4 right-4 text-purple-300 opacity-30 text-4xl">❝</div>
      </div>
    ))}
  </div>
</section>



      {/* 🚀 CTA */}
      {!user && (
        <section className="py-20 px-6 md:px-24 bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to take the next step?</h2>
          <p className="mb-8 text-lg">
            Create your profile and start applying today. Your next opportunity is waiting!
          </p>
          <Button
            onClick={() => navigate("/signup")}
            className="bg-white text-[#6A38C2] hover:bg-gray-100 px-8 py-3 rounded-full font-semibold"
          >
            Get Started Free
          </Button>
        </section>
      )}
    </div>
  );
};

export default Home;
