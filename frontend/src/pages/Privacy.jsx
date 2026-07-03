import Navbar from "../components/shared/Navbar";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-gray-700 leading-relaxed mb-4">
          CareerCrafter values your privacy. We collect only the information needed to deliver a better job and candidate experience.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Your data is used to authenticate users, manage applications, and provide personalized job recommendations. We do not share your personal information with unauthorized third parties.
        </p>
        <p className="text-gray-700 leading-relaxed">
          If you have questions about how your data is handled, please contact support through the app.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
