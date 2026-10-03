import { createFileRoute } from "@tanstack/react-router";
import { EmployeeScreen } from "@/screens/employee";

export const Route = createFileRoute("/employees/$id")({ component: EmployeeScreen });
