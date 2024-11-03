"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoreHorizontal, Edit, Trash, UserPlus } from "lucide-react";

interface IInitialTasks {
  id: number;
  title: string;
  status: string;
  assignedWorkers: { name: string; role: string }[];
  deadline: string;
  estimatedTime: { value: number; unit: string };
}

interface Iworkers {
  id: number;
  name: string;
}

const initialTasks: IInitialTasks[] = [
  {
    id: 1,
    title: "Implement login functionality",
    status: "In Progress",
    assignedWorkers: [
      { name: "Alice Johnson", role: "Developer" },
      { name: "Bob Smith", role: "Tester" },
    ],
    deadline: "2023-12-31",
    estimatedTime: { value: 16, unit: "hours" },
  },
  // Other tasks...
];

const workers: Iworkers[] = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Charlie Brown" },
  { id: 4, name: "David Lee" },
];

const roles: string[] = [
  "Developer",
  "Designer",
  "Tester",
  "Project Manager",
  "Content Writer",
  "Database Admin",
  "Technical Writer",
];

export default function TaskList() {
  const [tasks, setTasks] = useState<IInitialTasks[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<IInitialTasks | null>(null);
  const [isAddWorkerDialogOpen, setIsAddWorkerDialogOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const addWorkerToTask = (taskId: number | undefined) => {
    if (taskId && selectedWorker && selectedRole) {
      setTasks(
        tasks.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              assignedWorkers: [
                ...task.assignedWorkers,
                { name: selectedWorker, role: selectedRole },
              ],
            };
          }
          return task;
        }),
      );
      setIsAddWorkerDialogOpen(false);
      setSelectedWorker("");
      setSelectedRole("");
    }
  };

  /*
  const removeWorkerFromTask = (taskId: number, workerName: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            assignedWorkers: task.assignedWorkers.filter(
              (w) => w.name !== workerName
            ),
          };
        }
        return task;
      })
    );
  };
  */

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500";
      case "In Progress":
        return "bg-yellow-500";
      case "Not Started":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned Workers</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Estimated Time</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(task.status)}>
                  {task.status}
                </Badge>
              </TableCell>
              <TableCell>
                {task.assignedWorkers.map((worker, index) => (
                  <div key={index}>
                    {worker.name} ({worker.role})
                  </div>
                ))}
              </TableCell>
              <TableCell>{task.deadline}</TableCell>
              <TableCell>
                {task.estimatedTime.value} {task.estimatedTime.unit}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedTask(task);
                        setIsAddWorkerDialogOpen(true);
                      }}
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add Worker
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => deleteTask(task.id)}>
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog
        open={isAddWorkerDialogOpen}
        onOpenChange={setIsAddWorkerDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Worker to Task</DialogTitle>
            <DialogDescription>
              Select a worker and assign a role for this task.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="worker" className="text-right">
                Worker
              </label>
              <Select onValueChange={setSelectedWorker} value={selectedWorker}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a worker" />
                </SelectTrigger>
                <SelectContent>
                  {workers.map((worker) => (
                    <SelectItem key={worker.id} value={worker.name}>
                      {worker.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="role" className="text-right">
                Role
              </label>
              <Select onValueChange={setSelectedRole} value={selectedRole}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => addWorkerToTask(selectedTask?.id)}
              disabled={!selectedWorker || !selectedRole}
            >
              Add Worker
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
