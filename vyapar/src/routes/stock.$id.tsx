import { createFileRoute } from "@tanstack/react-router";
import { ProductScreen } from "@/screens/product";

export const Route = createFileRoute("/stock/$id")({ component: ProductScreen });
