import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface SLARule {
  id: string;
  category: string;
  priority: string;
  resolutionTarget: string;
}

const initialSLARules: SLARule[] = [
  { id: "1", category: "Repair", priority: "High", resolutionTarget: "4" },
  { id: "2", category: "Repair", priority: "Medium", resolutionTarget: "12" },
  { id: "3", category: "Repair", priority: "Low", resolutionTarget: "48" },
  { id: "4", category: "Installation", priority: "N/A", resolutionTarget: "72" },
  { id: "5", category: "Transfer", priority: "N/A", resolutionTarget: "72" },
];

export function SLARulesTab() {
  const [rules, setRules] = useState<SLARule[]>(initialSLARules);

  const updateRule = (id: string, value: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, resolutionTarget: value } : rule
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3>SLA (Service Level Agreement) Rules</h3>
        <p className="text-muted-foreground text-sm">
          Set your team's target resolution times. Breached tickets will be automatically escalated.
        </p>
      </div>

      <div className="rounded-lg border border-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left">
                  Ticket Category
                </th>
                <th className="px-4 py-3 text-left">
                  Priority
                </th>
                <th className="px-4 py-3 text-left">
                  Resolution Target (Time to Close)
                </th>
              </tr>
            </thead>
            <tbody>
              {rules.map((rule, index) => (
                <tr key={rule.id} className={index !== rules.length - 1 ? "border-b border-border" : ""}>
                  <td className="px-4 py-4">
                    {rule.category}
                  </td>
                  <td className="px-4 py-4">
                    {rule.priority}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 max-w-xs">
                      <Input
                        type="number"
                        value={rule.resolutionTarget}
                        onChange={(e) => updateRule(rule.id, e.target.value)}
                        className="w-24"
                      />
                      <span className="text-sm text-muted-foreground">Hours</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end">
        <Button>Save SLA Rules</Button>
      </div>
    </div>
  );
}
