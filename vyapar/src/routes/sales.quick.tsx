import { createFileRoute } from "@tanstack/react-router";
import { QuickSaleScreen } from "@/screens/quick-sale";

export const Route = createFileRoute("/sales/quick")({ component: QuickSaleScreen });
