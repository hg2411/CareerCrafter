import Navbar from "../components/shared/Navbar";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms of Service</h1>
        <p className="text-gray-700 leading-relaxed mb-4">
          These terms govern your use of CareerCrafter. By accessing or using the platform, you agree to follow our community guidelines and service policies.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Jobs and applications are provided for informational purposes only. CareerCrafter is not responsible for third-party employer actions or hiring decisions.
        </p>
        <p className="text-gray-700 leading-relaxed">
          For questions or disputes, contact our support team through the app.
        </p>
      </div>
    </div>
  );
};

export default Terms;
