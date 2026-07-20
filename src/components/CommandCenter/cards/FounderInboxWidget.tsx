import {
  CheckCircle2,
  Clock3,
  CreditCard,
  FileSignature,
  Megaphone,
} from "lucide-react";

import Card from "@/components/ui/Card";

const inboxItems = [
  {
    icon: Megaphone,
    title: "Approve Marketing Campaign",
    priority: "High",
    eta: "5 min",
    color: "text-amber-400",
  },
  {
    icon: CreditCard,
    title: "Approve Supplier Payment",
    priority: "Medium",
    eta: "2 min",
    color: "text-blue-400",
  },
  {
    icon: FileSignature,
    title: "Review Partnership Agreement",
    priority: "Low",
    eta: "10 min",
    color: "text-emerald-400",
  },
];

export default function FounderInboxWidget() {
  return (
    <Card title="📥 Founder Inbox">
      <p className="mb-5 text-sm text-zinc-400">
        Only decisions requiring your attention.
      </p>

      <div className="space-y-3">
        {inboxItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border border-white/5 bg-white/[0.03] p-3 transition hover:border-blue-500/20 hover:bg-white/[0.05]"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="rounded-lg bg-white/[0.04] p-2">
                    <Icon className={`h-4 w-4 ${item.color}`} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-xs text-zinc-500">
                      Requires founder approval
                    </p>
                  </div>
                </div>

                <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] font-medium text-zinc-300">
                  {item.priority}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
                <div className="flex items-center gap-1">
                  <Clock3 className="h-3.5 w-3.5" />
                  {item.eta}
                </div>

                <button className="rounded-md bg-blue-600 px-3 py-1 text-white transition hover:bg-blue-500">
                  Review
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.05] p-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300">
              AI Status
            </p>

            <p className="mt-1 text-xs leading-5 text-zinc-300">
              Everything else is currently handled automatically by your AI workforce.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}