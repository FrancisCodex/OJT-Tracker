import React from 'react'

const TraineeDashboard = () => {
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
              <Select defaultValue="monthly">
                <SelectTrigger className="w-fit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-fit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Segments</SelectItem>
                  <SelectItem value="tech">Tech</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
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
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Trainee Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full rounded-lg bg-muted/10" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Geography</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full rounded-lg bg-muted/10" />
            </CardContent>
          </Card>
        </div>
        </div>
    </div>
  )
}

export default TraineeDashboard