import React from "react";
import { fmtCurrency } from "../../lib/fmt";
import { Skeleton } from "../ui/Skeleton";
import walletLogo from "../../assets/wallet.png";
import walletLogo2 from "../../assets/wallet2.png";
type Money = { amount: number; currency: string };
type Summary = {
  totalBalance: Money;
  totalExpense: Money;
  totalSavings: Money;
};

const WalletMini = ({
  dark = false,
  key = "",
}: {
  dark?: boolean;
  key: string;
}) => (
  <span
    className={`inline-flex items-center justify-center rounded-full ${
      dark ? "bg-white/15" : "bg-slate-200/60"
    }`}
    style={{ width: 42, height: 42 }}
  >
    {key === "totalSavings" ? (
      <img src={walletLogo} width={20} height={20}></img>
    ) : (
      <img src={walletLogo2} width={20} height={20}></img>
    )}
  </span>
);

export const SummaryCards: React.FC<{
  loading: boolean;
  currency?: string;
  data?: { data?: Summary } | Summary;
}> = ({ loading, currency, data }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-2xl bg-white shadow-card p-6">
            <Skeleton className="h-6 w-24" />
            <div className="mt-3">
              <Skeleton className="h-7 w-28" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const s: Summary | undefined = (data as any)?.data ?? (data as any);
  if (!s) return null;

  const items = [
    {
      key: "totalBalance",
      title: "Total balance",
      value: s.totalBalance,
      variant: "dark" as const,
    },
    {
      key: "totalExpense",
      title: "Total spending",
      value: s.totalExpense,
      variant: "light" as const,
    },
    {
      key: "totalSavings",
      title: "Total saved",
      value: s.totalSavings,
      variant: "light" as const,
    },
  ];

  return (
    <div
      className="flex items-center"
      style={{
        borderRadius: 10,
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        gap: 15,
        opacity: 1,
      }}
    >
      {items.map(({ key, title, value, variant }) => {
        const curr = currency || value.currency || "USD";

        if (variant === "dark") {
          return (
            <div
              key={key}
              className="rounded-2xl px-5 py-4 bg-[#3A3E43] text-white"
            >
              <div className="flex items-center gap-4">
                <WalletMini dark key={key} />
                <div className="flex flex-col">
                  <span className="text-[14px] leading-[18px] font-medium text-white/65">
                    {title}
                  </span>
                  <span className="mt-1 text-[12px] leading-[32px] font-extrabold tracking-tight">
                    {fmtCurrency(value.amount, curr)}
                  </span>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div
            style={{
              borderRadius: 10,
              paddingTop: 20,
              paddingRight: 20,
              paddingBottom: 20,
              paddingLeft: 20,
              gap: 15,
              opacity: 1,
              backgroundColor: "#F8F8F8",
            }}
          >
            <div className="flex items-center gap-3">
              <WalletMini key={key} />
              <div>
                <div className="text-[12px] leading-[18px] text-slate-400">
                  {title}
                </div>
                <div className="mt-1 text-[12px] leading-[26px] font-semibold text-slate-900">
                  {fmtCurrency(value.amount, curr)}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
