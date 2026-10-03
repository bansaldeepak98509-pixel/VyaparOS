import { createFileRoute } from "@tanstack/react-router";
import { KhataScreen } from "@/screens/khata";

export const Route = createFileRoute("/khata/")({ component: KhataScreen });
