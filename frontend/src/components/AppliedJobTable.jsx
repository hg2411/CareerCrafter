import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const AppliedJobTable = () => {
  return (
  <div className="max-w-4xl mx-auto mt-10">
  <Table className="w-full rounded-lg overflow-hidden shadow-sm">
    <TableCaption className="text-sm font-semibold mb-4 text-left"> * A list of all your applied job </TableCaption>
    
    <TableHeader className="bg-gray-100">
      <TableRow>
        <TableHead className="text-sm font-medium text-gray-600 py-3">Date</TableHead>
        <TableHead className="text-sm font-medium text-gray-600 py-3">Job Role</TableHead>
        <TableHead className="text-sm font-medium text-gray-600 py-3">Company</TableHead>
        <TableHead className="text-sm font-medium text-gray-600 py-3 text-right">Status</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      {[1, 2, 3, 4].map((item, index) => (
        <TableRow
          key={index}
          className="hover:bg-gray-50 border-b border-gray-200 transition"
        >
          <TableCell className="text-sm text-gray-700 py-4">17-07-2024</TableCell>
          <TableCell className="text-sm text-gray-700 py-4">Frontend Developer</TableCell>
          <TableCell className="text-sm text-gray-700 py-4">Google</TableCell>
          <TableCell className="text-sm text-right py-4">
            <span className="bg-black text-white text-xs font-medium px-4 py-1.5 rounded-full">
              Selected
            </span>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>

  );
};
export default AppliedJobTable;
