import { createFileRoute } from "@tanstack/react-router";
import { SearchScreen } from "@/screens/search";

export const Route = createFileRoute("/search")({ component: SearchScreen });
