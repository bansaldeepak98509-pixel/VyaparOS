import { createFileRoute } from "@tanstack/react-router";
import { ExpensesScreen } from "@/screens/expenses";

export const Route = createFileRoute("/expenses")({ component: ExpensesScreen });
