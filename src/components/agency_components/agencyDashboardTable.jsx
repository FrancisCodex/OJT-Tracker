import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClipboardEdit, Eye } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import trainees from '@/constants/traineeData';

const AgencyDashboardTable = ({ companyID }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const traineesPerPage = 5;

  // Filter trainees for the company
  const companyTrainees = trainees.filter(trainee => trainee.company_id === companyID);

  // Calculate the current trainees to display
  const indexOfLastTrainee = currentPage * traineesPerPage;
  const indexOfFirstTrainee = indexOfLastTrainee - traineesPerPage;
  const currentTrainees = companyTrainees.slice(indexOfFirstTrainee, indexOfLastTrainee);

  // Calculate the total number of pages
  const totalPages = Math.ceil(companyTrainees.length / traineesPerPage);

  // Handle pagination
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="w-full box-border">
      <div className="rounded-lg border max-w-[100vw] overflow-x-auto">
        <Table className="min-w-[800px] bg-card">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Student ID</TableHead>
              <TableHead className="hidden md:table-cell">Course</TableHead>
              <TableHead className="hidden md:table-cell">Year</TableHead>
              <TableHead>Deployed</TableHead>
              <TableHead>Evaluated</TableHead>
              <TableHead>Completed</TableHead>
              <TableHead className="w-fit">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTrainees.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.studentId}</TableCell>
                <TableCell className="hidden md:table-cell">{item.course}</TableCell>
                <TableCell className="hidden md:table-cell">{item.year}</TableCell>
                <TableCell>
                  <Badge variant={item.deployed ? "default" : "destructive"}>
                    {item.deployed ? "YES" : "NO"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={item.evaluated ? "default" : "secondary"}>
                    {item.evaluated ? "YES" : "NO"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={item.completed ? "default" : "destructive"}>
                    {item.completed ? "YES" : "NO"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon">
                            <a href={'/dashboard/supervisor/view-trainee/'+item.id}>
                              <Eye className="h-4 w-4 text-blue-500" />
                            </a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View User Profile</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="icon">
                            <a href={'/dashboard/supervisor/evaluate/'+item.id}>
                              <ClipboardEdit className="h-4 w-4 text-green-500" />
                            </a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Evaluate</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4 px-4 bg-card">
          <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AgencyDashboardTable;