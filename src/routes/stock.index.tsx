import { createFileRoute } from "@tanstack/react-router";
import { StockScreen } from "@/screens/stock";

export const Route = createFileRoute("/stock/")({ component: StockScreen });
