import { Card } from "../ui/Card";
import { Skeleton } from "../ui/Skeleton";
import { fmtCurrency, fmtDate } from "../../lib/fmt";
import React from "react";

type Transfer = {
  id: string;
  name: string;
  image?: string;
  date: string;
  amount: number;
  currency?: string;
  status?: "scheduled" | "processing" | "completed" | string;
};

type ApiShape = {
  success: boolean;
  message: string;
  data: {
    transfers: Transfer[];
    summary?: { totalScheduledAmount: number; count: number };
  };
};

function symbolToISO(sym?: string) {
  if (sym === "$") return "USD";
  return undefined;
}

export const ScheduledTransfers: React.FC<{
  loading: boolean;
  currency?: string;
  api?: ApiShape;
  items?: Transfer[];
}> = ({ loading, currency, api, items = [] }) => {
  if (loading) {
    return (
      <Card>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-10" />
          ))}
        </div>
      </Card>
    );
  }

  const list: Transfer[] = api?.data?.transfers ?? items;
  const summary = api?.data?.summary;

  if (!list?.length) {
    return (
      <Card>
        <div className="text-sm text-slate-500">No scheduled transfers.</div>
      </Card>
    );
  }

  return (
    <Card>
      <ul className="space-y-3">
        {list.map((s) => {
          const iso = symbolToISO(s.currency);
          const negative = s.amount < 0;
          const amountAbs = Math.abs(s.amount);
          const sign = negative ? "-" : "+";

          return (
            <li
              key={s.id}
              className="flex items-center justify-between rounded-xl py-2"
            >
              <div className="flex items-center gap-3">
                <img
                  src={s.image}
                  alt={s.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-medium">{s.name}</div>
                  <div className="text-xs text-slate-500">
                    {fmtDate(s.date)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className={`text-sm font-semibold 
                  }`}
                >
                  {sign}
                  {fmtCurrency(amountAbs, iso)}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {summary && (
        <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
          <div>
            Total scheduled:{" "}
            <span className="font-semibold">
              {fmtCurrency(
                Math.abs(summary.totalScheduledAmount),
                currency || "USD"
              )}
            </span>
          </div>
          <div>{summary.count} item(s)</div>
        </div>
      )}
    </Card>
  );
};
