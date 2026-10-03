import { createFileRoute } from "@tanstack/react-router";
import { PosScreen } from "@/screens/pos";

type PurchaseSearch = {
  partyId?: string;
};

export const Route = createFileRoute("/purchases/new")({
  validateSearch: (search: Record<string, unknown>): PurchaseSearch => {
    const next: PurchaseSearch = {};
    if (typeof search.partyId === "string") next.partyId = search.partyId;
    return next;
  },
  component: () => <PosScreen kind="purchase" />,
});
