import { createFileRoute } from "@tanstack/react-router";
import { CashbookScreen } from "@/screens/cashbook";

export const Route = createFileRoute("/cashbook")({ component: CashbookScreen });
