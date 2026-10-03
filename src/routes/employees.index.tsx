import { createFileRoute } from "@tanstack/react-router";
import { EmployeesScreen } from "@/screens/employees";

export const Route = createFileRoute("/employees/")({ component: EmployeesScreen });
