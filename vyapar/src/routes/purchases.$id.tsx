import { createFileRoute } from "@tanstack/react-router";
import { PurchaseReceiptScreen } from "@/screens/receipt";

export const Route = createFileRoute("/purchases/$id")({ component: PurchaseReceiptScreen });
