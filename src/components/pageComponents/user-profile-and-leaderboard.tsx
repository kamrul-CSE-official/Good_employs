"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const userPerformanceData = [
  { name: "Tasks Completed", value: 15 },
  { name: "In Progress", value: 5 },
  { name: "Overdue", value: 2 },
];

const leaderboardData = [
  { id: 1, name: "Alice Johnson", tasksCompleted: 20, demeritPoints: 1 },
  { id: 2, name: "Bob Smith", tasksCompleted: 18, demeritPoints: 0 },
  { id: 3, name: "Charlie Brown", tasksCompleted: 15, demeritPoints: 2 },
  { id: 4, name: "David Lee", tasksCompleted: 12, demeritPoints: 1 },
  { id: 5, name: "Eva Martinez", tasksCompleted: 10, demeritPoints: 0 },
];

export default function UserProfileAndLeaderboard() {
  const [selectedUser, setSelectedUser] = useState(leaderboardData[0]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>Performance overview and statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedUser.name}`}
              />
              <AvatarFallback>
                {selectedUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-2xl font-bold">{selectedUser.name}</h3>
              <p className="text-muted-foreground">
                Tasks Completed: {selectedUser.tasksCompleted}
              </p>
              <p className="text-muted-foreground">
                Demerit Points: {selectedUser.demeritPoints}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm font-medium">75%</span>
              </div>
              <Progress value={75} className="w-full" />
            </div>
            <ChartContainer
              config={{
                performance: {
                  label: "Performance",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="var(--color-performance)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Leaderboard</CardTitle>
          <CardDescription>
            Top performers based on completed tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Tasks Completed</TableHead>
                <TableHead>Demerit Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((user, index) => (
                <TableRow
                  key={user.id}
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => setSelectedUser(user)}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.tasksCompleted}</TableCell>
                  <TableCell>{user.demeritPoints}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
