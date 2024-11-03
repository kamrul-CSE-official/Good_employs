import { Metadata } from "next";
import Dashboard from "@/components/pageComponents/dashboard";

export const metadata: Metadata = {
  title: "Dashboard | Task Management System",
  description: "Overview of your tasks and team performance",
};

export default function DashboardPage() {
  return <Dashboard />;
}
