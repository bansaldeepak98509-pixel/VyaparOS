import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Plus, Users } from "lucide-react";
import { Amount, Avatar, EmptyState, PageHeader } from "@/components/app/primitives";
import { Button } from "@/components/ui/button";
import { remainingAdvance } from "@/lib/vyapar/engine";
import { useT, useVyapar } from "@/lib/vyapar/store";
import { EmployeeForm } from "@/screens/forms";

export function EmployeesScreen() {
  const t = useT();
  const allEmployees = useVyapar((s) => s.employees);
  const employees = allEmployees.filter((e) => !e.deletedAt);
  const advances = useVyapar((s) => s.advances);
  const [open, setOpen] = useState(false);
  return (
    <div>
      <PageHeader title={t("employees")} backTo="/more" />
      <div className="px-4 py-3">
        {employees.length === 0 ? (
          <EmptyState title={t("noEmployees")} action={t("addEmployee")} onAction={() => setOpen(true)} icon={Users} />
        ) : (
          <ul className="flex flex-col gap-2">
            {employees.map((e) => (
              <li key={e.id}>
                <Link
                  to="/employees/$id"
                  params={{ id: e.id }}
                  className="flex items-center gap-3 rounded-xl bg-card px-3 py-3 shadow-card"
                >
                  <Avatar name={e.name} />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{e.name}</p>
                    <p className="text-xs text-muted-foreground">{e.role || t("role")}</p>
                  </div>
                  <div className="text-right">
                    <Amount n={e.salary} className="font-semibold" />
                    <p className="text-xs text-muted-foreground">
                      {t("advance")} <Amount n={remainingAdvance(e.id, advances)} />
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button
        className="fixed bottom-6 right-4 z-30 size-14 rounded-full shadow-card"
        onClick={() => setOpen(true)}
      >
        <Plus className="size-6" />
      </Button>
      <EmployeeForm open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
