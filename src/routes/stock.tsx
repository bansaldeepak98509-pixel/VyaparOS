import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/stock")({
  component: function StockLayout() {
    return <Outlet />;
  },
});
