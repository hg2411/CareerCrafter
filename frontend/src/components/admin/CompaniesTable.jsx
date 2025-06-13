import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";

const CompaniesTable = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10">
      <Table className="w-full border border-gray-200 shadow rounded-xl">
        <TableCaption className="text-gray-500 mt-4">
          A list of your recent registered companies
        </TableCaption>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="px-6 py-3 text-gray-700 font-semibold">Logo</TableHead>
            <TableHead className="px-6 py-3 text-gray-700 font-semibold">Name</TableHead>
            <TableHead className="px-6 py-3 text-gray-700 font-semibold">Date</TableHead>
            <TableHead className="px-6 py-3 text-gray-700 font-semibold text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="px-6 py-4">
              <Avatar>
                <AvatarImage
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8kjNASp-t4VymZrnRo9hIMRSeTcWNarxbJw&s"
                  className="w-10 h-10 object-cover rounded-full"
                />
              </Avatar>
            </TableCell>
            <TableCell className="px-6 py-4">Company Name</TableCell>
            <TableCell className="px-6 py-4">18-07-2024</TableCell>
            <TableCell className="px-6 py-4 text-right">
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal className="cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className="w-28 p-1.5 shadow-md">
                  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition cursor-pointer">
                    <Edit2 className="w-4 h-4" />
                    <span className="text-sm">Edit</span>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
