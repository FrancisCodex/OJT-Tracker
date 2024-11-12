import { useState } from "react";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileText,
  Filter,
  Search,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

export default function ListTable({ data }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  
  const getInitials = (name) => {
    const namesArray = name.split(" ");
    if (namesArray.length === 1) return namesArray[0].charAt(0).toUpperCase();
    return namesArray[0].charAt(0).toUpperCase() + namesArray[1].charAt(0).toUpperCase();
  };
  
  const UserAvatar = ({ trainee }) => (
    <Avatar>
<AvatarImage src={trainee.avat2} alt={trainee.name} />
<AvatarFallback>{getInitials(trainee.name)}</AvatarFallback>
    </Avatar>
  );


  const TableContent = ({ trainee }) => (
    <>
      <TableCell className="table-cell">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <UserAvatar trainee={trainee} />
        </div>
      </TableCell>
      <TableCell className="font-medium">{trainee.name}</TableCell>
      <TableCell className="">{trainee.email}</TableCell>
      <TableCell>{trainee.studentId}</TableCell>
      <TableCell className="">{trainee.course}</TableCell>
      <TableCell className="">{trainee.year}</TableCell>
      <TableCell>
        <span
          className={`px-2 py-1 rounded-full text-white ${
            trainee.deployed ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {trainee.deployed ? "YES" : "NO"}
        </span>
      </TableCell>
      <TableCell className="table-cell">
        <span className="px-2 py-1 rounded-full bg-gray-700 text-white">
          -
        </span>
      </TableCell>
      <TableCell className="table-cell">
        <span
          className={`px-2 py-1 rounded-full text-white ${
            trainee.completed ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {trainee.completed ? "YES" : "NO"}
        </span>
      </TableCell>

      <TableCell>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <ClipboardList className="h-4 w-4 text-blue-500" />
          </Button>
          <Button variant="outline" size="icon">
            <FileText className="h-4 w-4 text-green-500" />
          </Button>
        </div>
      </TableCell>
    </>
  );

  // Filter trainees based on search
  const filteredTrainees = data.filter(
    (trainee) =>
      trainee.name.toLowerCase().includes(search.toLowerCase()) ||
      trainee.email.toLowerCase().includes(search.toLowerCase()) ||
      trainee.studentId.includes(search)
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredTrainees.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentTrainees = filteredTrainees.slice(startIndex, endIndex);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for name, student id, or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="border rounded-lg overflow-x-auto max-w-[90dvw]">
        <Table className="max-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="">PROFILE</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead className="">EMAIL</TableHead>
              <TableHead>STUDENT ID</TableHead>
              <TableHead className="">COURSE</TableHead>
              <TableHead className="">YEAR</TableHead>
              <TableHead>DEPLOYED</TableHead>
              <TableHead className="">EVALUATED</TableHead>
              <TableHead className="">COMPLETED</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTrainees.map((trainee) => (
              <TableRow key={trainee.id}>
                <TableContent trainee={trainee} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground order-2 sm:order-1">
          Showing {startIndex + 1} - {Math.min(endIndex, filteredTrainees.length)} out of{" "}
          {filteredTrainees.length}
        </p>
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Number of Rows:</span>
            <Select
              value={rowsPerPage.toString()}
              onValueChange={(value) => {
                setRowsPerPage(parseInt(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm">
              Page {currentPage} out of {totalPages}
            </span>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronFirst className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronLast className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}