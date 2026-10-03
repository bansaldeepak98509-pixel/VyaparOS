import { createFileRoute } from "@tanstack/react-router";
import { PurchasesScreen } from "@/screens/purchases";

export const Route = createFileRoute("/purchases/")({ component: PurchasesScreen });
