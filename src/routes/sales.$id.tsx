import { createFileRoute } from "@tanstack/react-router";
import { ReceiptScreen } from "@/screens/receipt";

export const Route = createFileRoute("/sales/$id")({ component: ReceiptScreen });
