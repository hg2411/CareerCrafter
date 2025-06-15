import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();
  useEffect(() => {
    const filteredCompany = companies.filter((company) => {
      if (!searchCompanyByText) {
        return true;
      }
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  if (companies.length === 0) {
    return (
      <div className="max-w-6xl mx-auto mt-10 text-center text-gray-500">
        no new companies added by you....
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
      <Table className="w-full">
        <TableCaption className="text-gray-500 mt-4 text-sm">
          A list of your recent registered companies
        </TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="px-6 py-4 text-gray-700 font-semibold text-sm uppercase">Logo</TableHead>
            <TableHead className="px-6 py-4 text-gray-700 font-semibold text-sm uppercase">Name</TableHead>
            <TableHead className="px-6 py-4 text-gray-700 font-semibold text-sm uppercase">Date</TableHead>
            <TableHead className="px-6 py-4 text-gray-700 font-semibold text-sm uppercase text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                No Companies
              </TableCell>
            </TableRow>
          ) : (
            filterCompany.map((company) => (
              <TableRow
                key={company._id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <TableCell className="px-6 py-4">
                  <div className="w-12 h-12 rounded-md border border-gray-200 bg-white flex items-center justify-center overflow-hidden">
                    <img
                      src={company.logo?.url || "https://via.placeholder.com/48"}
                      alt={company.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 font-medium text-gray-800">
                  {company.name}
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-600">
                  {moment(company.createdAt).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer hover:text-gray-700" />
                    </PopoverTrigger>
                    <PopoverContent className="w-28 p-1.5 shadow-xl rounded-md bg-white border border-gray-200">
                      <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition text-sm cursor-pointer">
                        <Edit2 className="w-4 h-4 text-gray-700" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
