import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from 'sonner'

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName,setCompanyName] = useState();
  const registerNewCompany = async() => {
    try{
       const res =await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName},{
        header:{
            'Content-Type' : 'application/json'
        },
        withCredentials:true
       });
       if(res?.data?.success){
        toast.success(res.data.message);
         const companyId=res?.data?.company?._id;
        navigate(`admin/companies/${companyId}`);
        
       }
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto ">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to give your company name?
          </p>
        </div>
        <Label>Company Name </Label>
        <Input
          type="text"
          className="my-2"
          placeholder="Google,Microdoft etc."
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="flex item-center gap-2 my-10">
          <Button
            onClick={() => navigate("/admin/companies")}
            className="font-semibold px-6 py-2 rounded-full shadow-md hover:opacity-90 transition duration-300"
          >
            Cancel
          </Button>
          <Button   onClick={registerNewCompany}    className="bg-gradient-to-r from-[#6A38C2] to-[#9D50BB] text-white font-semibold px-6 py-2 rounded-full shadow-md hover:opacity-90 transition duration-300">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
