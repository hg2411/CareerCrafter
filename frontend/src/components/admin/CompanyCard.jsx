import { Button } from "../ui/button";
import {
  Building,
  Plus,
  Globe,
  MapPin,
  FileText,
  Edit2,
  Briefcase,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CompanyCard = ({ singleCompany }) => {
  const navigate = useNavigate();

  if (!singleCompany) {
    return (
      <div className="text-center py-16">
        <Building className="w-20 h-20 mx-auto text-gray-300 mb-4" />

        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          No Company Registered
        </h3>

        <p className="text-gray-500 mb-6">
          Create your company profile to start posting jobs.
        </p>

        <Button
          onClick={() => navigate("/admin/companies/create")}
          className="bg-gradient-to-r from-orange-500 to-pink-500 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Company
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 border border-orange-100 rounded-3xl p-8 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="w-40 h-40 rounded-3xl bg-white border-2 border-orange-100 shadow-md overflow-hidden">
              <img
                src={
                  singleCompany.logo?.url ||
                  "https://via.placeholder.com/300x300?text=Company"
                }
                alt={singleCompany.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 w-full">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-7 h-7 text-orange-500" />
              <h2 className="text-4xl font-black text-gray-900">
                {singleCompany.name}
              </h2>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-5">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-orange-500" />
                <h3 className="font-bold text-gray-800">
                  Company Description
                </h3>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {singleCompany.description ||
                  "No company description added yet."}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-pink-500" />
                  <span className="font-semibold text-gray-700">
                    Location
                  </span>
                </div>

                <p className="text-gray-600">
                  {singleCompany.location || "Not specified"}
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-purple-500" />
                  <span className="font-semibold text-gray-700">
                    Website
                  </span>
                </div>

                <p className="text-gray-600 break-all">
                  {singleCompany.website || "Not specified"}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 mt-8">
              <Button
                onClick={() =>
                  navigate(`/admin/companies/${singleCompany._id}`)
                }
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Company Details
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate("/admin/jobs/create")}
                className="border-2 border-orange-300 hover:bg-orange-50"
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Post New Job
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;