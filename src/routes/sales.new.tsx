import { createFileRoute } from "@tanstack/react-router";
import { PosScreen } from "@/screens/pos";

type SaleSearch = {
  partyId?: string;
  repeat?: string;
};

export const Route = createFileRoute("/sales/new")({
  validateSearch: (search: Record<string, unknown>): SaleSearch => {
    const next: SaleSearch = {};
    if (typeof search.partyId === "string") next.partyId = search.partyId;
    if (typeof search.repeat === "string") next.repeat = search.repeat;
    return next;
  },
  component: () => <PosScreen kind="sale" />,
});
