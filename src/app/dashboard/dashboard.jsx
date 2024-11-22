import * as React from "react";
import {
  Users,
  BriefcaseBusiness,
  CircleCheckBig,
  Download,
  Building2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { DatePickerWithRange } from "@/components/date-range-picker";
import DashboardTables from "@/components/dashboard-tables";
import trainees from '@/constants/traineeData';
import agencies from "@/constants/agenciesData";
import DashboardCharts from "@/components/dashboard-charts";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [date, setDate] = React.useState({ from: null, to: null });

  const totalTrainees = trainees.length;
  const totalDeployed = trainees.filter(trainee => trainee.deployed).length;

  const calculateOJTCompletionRate = () => {
    const totalCompletion = trainees.reduce((acc, trainee) => {
      const today = new Date();
      const startDate = new Date(trainee.date_started_ojt);
      const totalDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
      const totalWeeks = Math.floor(totalDays / 7);
      const totalWorkingDays = totalWeeks * 5 + (totalDays % 7);
      const totalWorkingHours = totalWorkingDays * 8;
      const completionRate = (totalWorkingHours / trainee.required_hours) * 100;
      return acc + Math.min(completionRate, 100); // Cap at 100%
    }, 0);
    return (totalCompletion / totalTrainees).toFixed(2);
  };
  const totalAgencies = agencies.length;

  const ojtCompletionRate = calculateOJTCompletionRate();

  // Calculate the top 3 agencies with the most trainees
  const agencyTraineeCount = agencies.map(agency => ({
    ...agency,
    traineeCount: trainees.filter(trainee => trainee.company_id === agency.id).length,
  }));

  const topAgencies = agencyTraineeCount
    .sort((a, b) => b.traineeCount - a.traineeCount)
    .slice(0, 5);

  return (
    <div className="w-full flex-col box-border">
      <div className="flex-1 space-y-6 p-6">
        <div className="flex flex-col gap-4 md:flex-row-1 md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Here’s what happening with your trainee’s today
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center">
              <DatePickerWithRange date={date} setDate={setDate} />
            </div>
            <div className="flex gap-4">
              <Select defaultValue="semester">
                <SelectTrigger className="w-fit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semester">Semester</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-fit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="Information Technology">IT</SelectItem>
                  <SelectItem value="Information Systems">IS</SelectItem>
                  <SelectItem value="Computer Science">CS</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </div>
        {/* cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Trainee</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTrainees}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">↑ 2%</span> From last quarter
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Deployed</CardTitle>
              <BriefcaseBusiness className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDeployed}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">↑ 12.3%</span> From last quarter
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">OJT Completion Rate</CardTitle>
              <CircleCheckBig className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ojtCompletionRate}%</div>
              <Progress value={ojtCompletionRate} />
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">↑ 1.2%</span> From last quarter
              </p>
            </CardContent>
          </Card>
          <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Host Training Establishments (HTE)</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAgencies}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">↑ 2%</span> From last quarter
            </p>
          </CardContent>
          </Card>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">

          <Card>
            <CardHeader className="items-center">
              <CardTitle>⭐Top Agencies with Most Trainees⭐</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Trainee's</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topAgencies.map((agency, index) => (
                    <TableRow key={agency.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Link to={`/dashboard/coordinator/view-company/${agency.id}`} className="hover:underline">
                          {agency.company_name}
                        </Link>
                      </TableCell>
                      <TableCell className='font-semibold'>{agency.traineeCount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        {/* Tables */}
        <DashboardTables />
      </div>
    </div>
  );
}