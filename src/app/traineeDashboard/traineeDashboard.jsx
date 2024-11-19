import * as React from "react";
import {
  Bell,
  Mail,
  Moon,
  Plus,
  Search,
  Users,
  UserPlus,
  UserCheck,
  SmilePlus,
  ChevronDown,
  Download,
  MoreHorizontal,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/date-range-picker";

const TraineeDashboard = () => {
  return (
<div className="w-full flex-col box-border">
      <div className="flex-1 space-y-6 p-6">
        <div className="flex flex-col gap-4 md:flex-row-1 md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Trainee Dashboard</h1>
            <p className="text-sm text-muted-foreground">
            Here’s what happening with your Job Today!
            </p>
          </div>
        </div>
        {/* cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Company Name</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">30</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">↑ 2%</span> From last quarter
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Deployed</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">30</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">↑ 12.3%</span> From last quarter
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">New Hires</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,289</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">↑ 2%</span> From last quarter
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <SmilePlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89.9%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">↑ 1.2%</span> From last quarter
              </p>
            </CardContent>
          </Card>
        </div>
        </div>
    </div>
  )
}

export default TraineeDashboard