import { Card } from "../ui/Card";
import { Skeleton } from "../ui/Skeleton";
import { fmtCurrency, fmtDate } from "../../lib/fmt";
import React from "react";

type Tx = {
  id: string;
  name: string;
  business: string;
  image?: string;
  type: string;
  amount: number;
  currency?: string;
  date: string;
};

type ApiShape = {
  success: boolean;
  message: string;
  data: {
    transactions: Tx[];
    summary?: { totalIncome: number; totalExpense: number; count: number };
  };
};

export const RecentTransactions: React.FC<{
  loading: boolean;
  currency?: string;
  api?: ApiShape;
  items?: Tx[];
}> = ({ loading, currency, api, items = [] }) => {
  if (loading) {
    return (
      <Card>
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-10" />
          ))}
        </div>
      </Card>
    );
  }

  const list: Tx[] = api?.data?.transactions ?? items;
  if (!list?.length) {
    return (
      <Card>
        <div className="text-sm text-slate-500">No recent transactions.</div>
      </Card>
    );
  }

  return (
    <Card>
      <ul className="lg:hidden divide-y divide-slate-100">
        {list.map((t) => {
          const iso = currency || t.currency || "USD";
          const absAmt = Math.abs(t.amount);

          return (
            <li key={t.id} className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                {t.image ? (
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-9 w-9 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-9 w-9 rounded-lg bg-slate-200" />
                )}
                <div className="min-w-0">
                  <div className="text-sm font-medium text-slate-800 truncate">
                    {t.name}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {t.business} • {t.type} • {fmtDate(t.date)}
                  </div>
                </div>
              </div>
              <div
                className={`ml-3 text-sm font-semibold 
                }`}
              >
                {fmtCurrency(absAmt, iso)}
              </div>
            </li>
          );
        })}
      </ul>

      <table className="hidden lg:table w-full text-sm">
        <thead>
          <tr className="text-left text-slate-400">
            <th>NAME/BUSINESS</th>
            <th>TYPE</th>
            <th>AMOUNT</th>
            <th className="py-2">DATE</th>
          </tr>
        </thead>
        <tbody>
          {list.map((t) => {
            const iso = currency || t.currency || "USD";
            const absAmt = Math.abs(t.amount);

            return (
              <tr key={t.id} className="border-t border-slate-100">
                <td>
                  <div className="flex items-center gap-3">
                    {t.image ? (
                      <img
                        src={t.image}
                        alt={t.name}
                        className="h-8 w-8 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-lg bg-slate-200" />
                    )}
                    <div>
                      <div className="font-medium text-slate-800">{t.name}</div>
                      <div className="text-xs text-slate-500">{t.business}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs text-slate-700">
                    {t.type}
                  </span>
                </td>
                <td
                  className={`font-semibold 
                  }`}
                >
                  {fmtCurrency(absAmt, iso)}
                </td>
                <td className="py-3">{fmtDate(t.date)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};
