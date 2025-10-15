import { Card } from "../ui/Card";
import { Skeleton } from "../ui/Skeleton";
import React from "react";

type WalletCard = {
  id: string;
  name: string;
  type: string;
  cardNumber: string;
  bank: string;
  network: string;
  expiryMonth: number;
  expiryYear: number;
  color?: string;
  isDefault?: boolean;
};

function maskCardNumber(raw: string) {
  if (raw.includes("*")) return raw;
  const digits = raw.replace(/\D/g, "");
  const last4 = digits.slice(-4);
  return `**** **** **** ${last4}`;
}

function formatExpiry(mm: number, yy: number) {
  const m = String(mm).padStart(2, "0");
  const y = String(yy).slice(-2);
  return `${m}/${y}`;
}

function isDark(hex?: string) {
  if (!hex) return false;
  const h = hex.replace("#", "");
  if (h.length !== 6) return false;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
  return brightness < 140;
}

export const WalletList: React.FC<{
  loading?: boolean;
  wallets?: WalletCard[];
}> = ({ loading, wallets = [] }) => (
  <Card title="Wallets">
    {loading ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-28" />
        ))}
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {wallets.map((w) => {
          const dark = isDark(w.color);
          const textClass = dark ? "text-white" : "text-ink";
          const subText = dark ? "text-white/70" : "text-slate-500";
          const ringClass = dark ? "ring-white/10" : "ring-slate-100";

          return (
            <div
              key={w.id}
              className={`relative rounded-xl p-4 ring-1 ${ringClass} overflow-hidden`}
              style={{
                background: w.color ? w.color : "#FFFFFF",
              }}
            >
              <div className="flex items-center justify-between">
                <div className={`text-sm ${subText}`}>{w.name}</div>
                {w.isDefault && (
                  <span
                    className={`px-2 py-0.5 text-[10px] rounded-full border ${
                      dark
                        ? "border-white/30 text-white/90"
                        : "border-slate-300 text-slate-600"
                    }`}
                  >
                    Default
                  </span>
                )}
              </div>

              <div className={`mt-2 text-lg font-semibold ${textClass}`}>
                {maskCardNumber(w.cardNumber)}
              </div>

              <div className="mt-1 flex items-center justify-between">
                <div className={`text-xs ${subText}`}>{w.bank}</div>
                <div className={`text-xs ${subText}`}>
                  {w.network} • {formatExpiry(w.expiryMonth, w.expiryYear)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </Card>
);
