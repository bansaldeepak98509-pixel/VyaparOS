import { createFileRoute } from "@tanstack/react-router";
import { ReportsScreen } from "@/screens/reports";

export const Route = createFileRoute("/reports")({ component: ReportsScreen });
