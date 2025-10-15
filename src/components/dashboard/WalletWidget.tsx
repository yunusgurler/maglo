import React from "react";
import { Skeleton } from "../ui/Skeleton";
import masterLogo from "../../assets/Mastercard-logo.svg";
import wifiLogo from "../../assets/wifi.3 1.png";
import simcardLogo from "../../assets/simcard.png";
import visaLogo from "../../assets/visa.png";

type Wallet = {
  id: string;
  name: string;
  type: "credit" | "debit" | string;
  cardNumber: string;
  bank: string; 
  network: "Visa" | "Mastercard" | string;
  expiryMonth: number;
  expiryYear: number;
  color?: string; 
  isDefault?: boolean;
};

function mask(n: string) {
  if (n.includes("*")) return n;
  const d = n.replace(/\D/g, "");
  const groups = d.match(/.{1,4}/g) ?? [];
  const last = groups.pop() ?? "";
  return [groups.map(() => "•".repeat(4)).join(""), last]
    .filter(Boolean)
    .join("");
}
const mmYY = (m: number, y: number) =>
  `${String(m).padStart(2, "0")}/${String(y).slice(-2)}`;

const splitBank = (s?: string) => {
  if (!s) return { brand: "Maglo.", bank: "" };
  const [brandRaw, bankRaw] = s.split("|").map((x) => x?.trim());
  const brand = brandRaw?.replace(/Maglo\.?/, "Maglo.") || "Maglo.";
  const bank = bankRaw || "";
  return { brand, bank };
};

const Chip = ({ dim = 28 }: { dim?: number }) => (
  <img src={simcardLogo} width={30} height={24}></img>
);

const Contactless = () => <img src={wifiLogo} width={33} height={34}></img>;

const VisaBadge = () => <img src={visaLogo} width={33} height={21}></img>;
const MasterBadge = () => <img src={masterLogo} width={47} height={36}></img>;

function orderCards(list: Wallet[]) {
  if (!list?.length) return [undefined, undefined] as const;
  const sorted = [...list].sort(
    (a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0)
  );
  return [sorted[0], sorted[1]] as const;
}

export const WalletWidget: React.FC<{
  loading: boolean;
  wallets?: Wallet[];
  api?: { cards?: Wallet[] };
}> = ({ loading, wallets, api }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-card">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Wallet</h3>
        <Skeleton className="h-[220px] sm:h-[250px] rounded-2xl" />
      </div>
    );
  }

  const list: Wallet[] = wallets ?? api?.cards ?? [];
  const [primary, secondary] = orderCards(list);

  return (
    <div className="bg-white rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-800">Wallet</h3>
        <button className="text-slate-400 text-xl leading-none">•••</button>
      </div>

      <div className="lg:hidden space-y-3">
        {primary && (
          <div
            className="rounded-[18px] h-[160px] text-white shadow-lg"
            style={{
              background:
                "linear-gradient(135deg,#2A2E32 0%,#1B1D20 55%,#0F1113 100%)",
            }}
          >
            <div className="h-full px-5 py-4 flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[18px] font-bold">
                    {splitBank(primary.bank).brand}
                  </span>
                  <span className="text-white/60 text-sm">
                    {splitBank(primary.bank).bank}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Contactless />
                  {primary.network === "Visa" ? <VisaBadge /> : <MasterBadge />}
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <Chip />
                <div className="text-[20px] tracking-[0.22em] font-semibold select-none">
                  {mask(primary.cardNumber)}
                </div>
              </div>
              <div className="mt-auto text-xs text-white/80">
                {mmYY(primary.expiryMonth, primary.expiryYear)}
              </div>
            </div>
          </div>
        )}

        {secondary && (
          <div
            className="rounded-[18px] h-[150px] shadow-lg border border-black/5 overflow-hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(220,225,232,0.75) 0%, rgba(255,255,255,0.9) 46%, #FFFFFF66 100%)",
            }}
          >
            <div className="h-full px-5 py-4 flex flex-col relative">
              <div className="absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-black/20 to-transparent" />
              <div className="flex items-center justify-between relative">
                <div className="flex items-center gap-2">
                  <span className="text-[18px] font-bold text-slate-900">
                    {splitBank(secondary.bank).brand}
                  </span>
                  <span className="text-slate-600 text-sm">
                    {splitBank(secondary.bank).bank}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Contactless />
                  {secondary.network === "Visa" ? (
                    <VisaBadge />
                  ) : (
                    <MasterBadge />
                  )}
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 relative">
                <Chip />
                <div className="text-[18px] tracking-[0.18em] font-extrabold text-slate-900 select-none">
                  {mask(secondary.cardNumber)}
                </div>
              </div>
              <div className="mt-auto text-[12px] text-slate-500 relative">
                {mmYY(secondary.expiryMonth, secondary.expiryYear)}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="relative h-[250px] hidden lg:block">
        {primary && (
          <div
            className="absolute inset-x-0 top-0 h-[170px] rounded-[18px] text-white shadow-lg"
            style={{
              background: "linear-gradient(135deg,#4A4A49 0%,#20201F 100%)",
            }}
          >
            <div className="h-full px-5 py-4 flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[18px] font-bold">
                    {splitBank(primary.bank).brand}
                  </span>
                  <div className="w-px h-6 bg-gray-400" aria-hidden />

                  <span className="text-white/60 text-sm">
                    {splitBank(primary.bank).bank}
                  </span>
                </div>
              </div>
              <div className="text-white/80 flex items-center justify-between">
                <Chip />
                <Contactless />
              </div>
              <div className="mt-5 flex items-center gap-3">
                <div className="text-[20px] tracking-[0.24em] font-semibold select-none">
                  {primary.cardNumber}
                </div>
                <div
                  className="flex items-center gap-2 text-slate-700"
                  style={{ position: "absolute", bottom: 10, right: 20 }}
                >
                  {primary.network === "Visa" ? <VisaBadge /> : <MasterBadge />}
                </div>
              </div>
            </div>
          </div>
        )}

        {secondary && (
          <div className="absolute left-5 right-0 top-[126px]">
            <div
              className="relative h-[150px] rounded-[18px] shadow-lg border border-black/5 overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, rgba(220,225,232,0.75) 0%, rgba(255,255,255,0.9) 46%, #FFFFFF 100%)",
              }}
            >
              <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-black/20 to-transparent" />
              <div className="absolute inset-x-0 top-[40%] h-4 rounded-full blur-[10px] bg-black/20 opacity-50" />
              <div className="relative h-full px-5 py-4 flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[18px] font-bold text-slate-900">
                      {splitBank(secondary.bank).brand}
                    </span>
                    <div className="w-px h-6 bg-gray-400" aria-hidden />
                    <span className="text-slate-600 text-sm">
                      {splitBank(secondary.bank).bank}
                    </span>
                  </div>
                </div>
                <div className="text-white/80 flex items-center justify-between">
                  <Chip />
                  <Contactless />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="text-[20px] tracking-[0.18em] font-extrabold text-slate-900 select-none">
                        {mask(secondary.cardNumber)}
                      </div>
                    </div>
                    <div className="mt-auto text-[12px] text-slate-500">
                      {mmYY(secondary.expiryMonth, secondary.expiryYear)}
                    </div>
                  </div>
                  <div>
                    {secondary.network === "Visa" ? (
                      <VisaBadge />
                    ) : (
                      <MasterBadge />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
