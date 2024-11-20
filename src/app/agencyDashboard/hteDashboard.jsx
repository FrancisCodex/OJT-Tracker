import * as React from "react";
import {
  Users,
  UserCheck,
  SmilePlus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import agencies from "@/constants/agenciesData";
import trainees from "@/constants/traineeData";
import { Progress } from "@/components/ui/progress";
import AgencyDashboardTable from "@/components/agency_components/agencyDashboardTable";

const AgencyDashboard = () => {
  const ourCompanyID = 3;
  const company_name = agencies.find(agency => agency.id === ourCompanyID).company_name;

  // Filter trainees for our company
  const companyTrainees = trainees.filter(trainee => trainee.company_id === ourCompanyID);

  // Calculate total trainees
  const totalTrainees = companyTrainees.length;

  // Calculate total completed trainees
  const totalCompleted = companyTrainees.filter(trainee => trainee.completed).length;

  // Calculate attendance progression rate
  const calculateAttendanceProgression = () => {
    const totalProgression = companyTrainees.reduce((acc, trainee) => {
      const today = new Date();
      const startDate = new Date(trainee.date_started_ojt);
      const totalDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
      const totalWeeks = Math.floor(totalDays / 7);
      const totalWorkingDays = totalWeeks * 5 + (totalDays % 7);
      const totalWorkingHours = totalWorkingDays * 8;
      const progressionRate = (totalWorkingHours / trainee.required_hours) * 100;
      return acc + Math.min(progressionRate, 100); // Cap at 100%
    }, 0);
    return (totalProgression / totalTrainees).toFixed(2);
  };

  const attendanceProgression = calculateAttendanceProgression();

  return (
    <div className="w-full flex-col box-border">
      <div className="flex-1 space-y-6 p-6">
        <div className="flex flex-col gap-4 md:flex-row-1 md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Agency Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Here’s what happening with your Trainee's Today!
            </p>
          </div>
        </div>
        {/* cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Trainee's</CardTitle>
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
              <CardTitle className="text-sm font-medium">Trainee's Completed</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCompleted}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">↑ 12.3%</span> From last quarter
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Attendance Progression</CardTitle>
              <SmilePlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceProgression}%</div>
              <Progress value={attendanceProgression} />
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">↑ 1.2%</span> From last quarter
              </p>
            </CardContent>
          </Card>
        </div>
        {/* table */}
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-md font-semibold">List of all Trainee's in <span className="text-lg font-bold text-primary">{company_name}</span></h2>
          </div>
          <AgencyDashboardTable companyID={ourCompanyID} />
        </div>
        
      </div>
    </div>
  );
};

export default AgencyDashboard;