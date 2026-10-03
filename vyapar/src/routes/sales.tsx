import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/sales")({
  component: function SalesLayout() {
    return <Outlet />;
  },
});
