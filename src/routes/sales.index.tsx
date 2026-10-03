import { createFileRoute } from "@tanstack/react-router";
import { SalesScreen } from "@/screens/sales";

export const Route = createFileRoute("/sales/")({ component: SalesScreen });
