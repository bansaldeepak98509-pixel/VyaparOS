import { createFileRoute } from "@tanstack/react-router";
import { PartyScreen } from "@/screens/party";

export const Route = createFileRoute("/khata/$id")({ component: PartyScreen });
