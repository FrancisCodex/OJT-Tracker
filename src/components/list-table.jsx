import { useState } from "react";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  ClipboardEdit,
  FileText,
  Filter,
  Search,
  ChevronDown,
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
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function ListTable({ data }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const getInitials = (name) => {
    const namesArray = name.split(" ");
    if (namesArray.length === 1) return namesArray[0].charAt(0).toUpperCase();
    return namesArray[0].charAt(0).toUpperCase() + namesArray[1].charAt(0).toUpperCase();
  };

  const UserAvatar = ({ trainee }) => (
    <Avatar>
      <AvatarImage src={trainee.avatar} alt={trainee.name} />
      <AvatarFallback>{getInitials(trainee.name)}</AvatarFallback>
    </Avatar>
  );

  const TableContent = ({ trainee }) => (
    <>
      <TableCell className="table-cell">
        <div className="w-10 h-10 rounded-full">
          <UserAvatar trainee={trainee} />
        </div>
      </TableCell>
      <TableCell className="font-medium">{trainee.name}</TableCell>
      <TableCell className="">{trainee.email}</TableCell>
      <TableCell>{trainee.studentId}</TableCell>
      <TableCell className="">{trainee.course}</TableCell>
      <TableCell className="">{trainee.year}</TableCell>
      <TableCell>
        <Badge variant={trainee.deployed ? "default" : "destructive"}>
          {trainee.deployed ? "YES" : "NO"}
        </Badge>
      </TableCell>
      <TableCell className="table-cell">
        <Badge variant={trainee.evaluated ? "default" : "secondary"}>
          {trainee.evaluated ? "Completed" : "Pending"}
        </Badge>
      </TableCell>
      <TableCell className="table-cell">
        <Badge variant={trainee.completed ? "default" : "destructive"}>
          {trainee.completed ? "YES" : "NO"}
        </Badge>
      </TableCell>

      <TableCell>
        <div className="flex gap-2">
        <Button variant="outline" size="icon">
            <FileText className="h-4 w-4 text-blue-500" />
          </Button>
          <Button variant="outline" size="icon">
            <ClipboardEdit className="h-4 w-4 text-green-500" />
          </Button>
        </div>
      </TableCell>
    </>
  );

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedTrainees = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Filter trainees based on search
  const filteredTrainees = sortedTrainees.filter(
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
    <div className="w-full mx-auto p-4 space-y-4">
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

      <div className="border rounded-lg overflow-x-auto max-w-[100vw]">
        <Table className="min-w-[800px] bg-card">
          <TableHeader>
            <TableRow>
              <TableHead>
                PROFILE
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                NAME
                <ChevronDown
                  className={`ml-2 h-4 w-4 cursor-pointer transition-transform ${
                    sortConfig.key === 'name' && sortConfig.direction === 'ascending' ? 'rotate-180' : ''
                  }`}
                  onClick={() => handleSort('name')}
                />
                </div>
                
              </TableHead>
              <TableHead>
              <div className="flex items-center">
                EMAIL
                <ChevronDown
                  className={`ml-2 h-4 w-4 cursor-pointer transition-transform ${
                    sortConfig.key === 'email' && sortConfig.direction === 'ascending' ? 'rotate-180' : ''
                  }`}
                  onClick={() => handleSort('email')}
                />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                STUDENT ID
                <ChevronDown
                  className={`ml-2 h-4 w-4 cursor-pointer transition-transform ${
                    sortConfig.key === 'studentId' && sortConfig.direction === 'ascending' ? 'rotate-180' : ''
                  }`}
                  onClick={() => handleSort('studentId')}
                />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                COURSE
                <ChevronDown
                  className={`ml-2 h-4 w-4 cursor-pointer transition-transform ${
                    sortConfig.key === 'course' && sortConfig.direction === 'ascending' ? 'rotate-180' : ''
                  }`}
                  onClick={() => handleSort('course')}
                />
                </div>
                
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                YEAR
                <ChevronDown
                  className={`ml-2 h-4 w-4 cursor-pointer transition-transform ${
                    sortConfig.key === 'year' && sortConfig.direction === 'ascending' ? 'rotate-180' : ''
                  }`}
                  onClick={() => handleSort('year')}
                />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                DEPLOYED
                <ChevronDown
                  className={`ml-2 h-4 w-4 cursor-pointer transition-transform ${
                    sortConfig.key === 'deployed' && sortConfig.direction === 'ascending' ? 'rotate-180' : ''
                  }`}
                  onClick={() => handleSort('deployed')}
                />    
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                EVALUATED
                <ChevronDown
                  className={`ml-2 h-4 w-4 cursor-pointer transition-transform ${
                    sortConfig.key === 'evaluated' && sortConfig.direction === 'ascending' ? 'rotate-180' : ''
                  }`}
                  onClick={() => handleSort('evaluated')}
                />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                COMPLETED
                <ChevronDown
                  className={`ml-2 h-4 w-4 cursor-pointer transition-transform ${
                    sortConfig.key === 'completed' && sortConfig.direction === 'ascending' ? 'rotate-180' : ''
                  }`}
                  onClick={() => handleSort('completed')}
                />
                </div>

              </TableHead>
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

      <div className="flex flex-col sm:flex-row-reverse items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground order-2 sm:order-1">
          Showing {startIndex + 1} - {Math.min(endIndex, filteredTrainees.length)} out of{" "}
          {filteredTrainees.length}
        </p>
        <div className="flex flex-col md:flex-row items-center gap-4">
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
          <div className="flex flex-col md:flex-row-reverse items-center gap-2">
           
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
            <span className="text-sm">
              Page {currentPage} out of {totalPages}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}