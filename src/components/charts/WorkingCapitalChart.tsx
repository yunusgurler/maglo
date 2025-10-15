import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { fmtCurrency } from "../../lib/fmt";

type ApiPoint = { month: string; income: number; expense: number; net: number };
type ApiShape = {
  success?: boolean;
  message?: string;
  data?: {
    period: string;
    currency: string;
    data: ApiPoint[];
    summary?: { totalIncome: number; totalExpense: number; netBalance: number };
  };
};

export const WorkingCapitalChart: React.FC<{
  api?: ApiShape;
  data?: { label: string; income: number; expense: number; net?: number }[];
  currency?: string;
}> = ({ api, data, currency }) => {
  const series =
    data ??
    api?.data?.data?.map((p) => ({
      label: p.month,
      income: p.income,
      expense: p.expense,
      net: p.net,
    })) ??
    [];

  const curr = currency ?? api?.data?.currency ?? "USD";
  const summary = api?.data?.summary;

  if (!series.length) {
    return (
      <div className="h-64">
        <div className="skeleton h-full rounded-xl" />
      </div>
    );
  }

  return (
    <div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={series}
            margin={{ left: 12, right: 12, top: 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
            <YAxis
              tickFormatter={(v) => fmtCurrency(Number(v), curr)}
              tick={{ fontSize: 12 }}
              width={90}
            />
            <Tooltip
              formatter={(value: any, name: any) => [
                fmtCurrency(Number(value), curr),
                name === "income"
                  ? "Income"
                  : name === "expense"
                  ? "Expense"
                  : name,
              ]}
              labelFormatter={(l: string, payload: any[]) => {
                const pt = payload?.[0]?.payload;
                const net = pt?.net;
                return net != null
                  ? `${l}  •  Net: ${fmtCurrency(Number(net), curr)}`
                  : l;
              }}
            />
            <Line
              type="monotone"
              dataKey="income"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="expense"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {summary && (
        <div className="mt-3 grid grid-cols-3 gap-3 text-xs text-slate-600">
          <div className="rounded-lg border border-slate-100 p-2">
            <div className="text-slate-500">Total Income</div>
            <div className="font-semibold">
              {fmtCurrency(summary.totalIncome, curr)}
            </div>
          </div>
          <div className="rounded-lg border border-slate-100 p-2">
            <div className="text-slate-500">Total Expense</div>
            <div className="font-semibold">
              {fmtCurrency(summary.totalExpense, curr)}
            </div>
          </div>
          <div className="rounded-lg border border-slate-100 p-2">
            <div className="text-slate-500">Net Balance</div>
            <div className="font-semibold">
              {fmtCurrency(summary.netBalance, curr)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
