import { Sidebar } from "../components/Shell/Sidebar";
import { Topbar } from "../components/Shell/Topbar";
import { SummaryCards } from "../components/dashboard/SummaryCards";
import { RecentTransactions } from "../components/dashboard/RecentTransactions";
import { ScheduledTransfers } from "../components/dashboard/ScheduledTransfers";
import { WorkingCapitalChart } from "../components/charts/WorkingCapitalChart";
import { WalletWidget } from "../components/dashboard/WalletWidget";
import { useProfile } from "../hooks/api/useUser";
import {
  useSummary,
  useWallet,
  useRecentTransactions,
  useScheduledTransfers,
  useWorkingCapital,
} from "../hooks/api/useFinancial";
import { useAuthStore } from "../stores/auth";

export default function Dashboard() {
  const { data: me } = useProfile();
  const { data: summary, isLoading: sumL } = useSummary();
  const { data: walletRes, isLoading: walletL } = useWallet();
  const { data: txRes, isLoading: txL } = useRecentTransactions();
  const { data: scheduledRes, isLoading: schL } = useScheduledTransfers();
  const { data: wc, isLoading: wcL } = useWorkingCapital();
  const logout = useAuthStore((s) => s.logout);

  const currency =
    (summary as any)?.data?.totalBalance?.currency ??
    (summary as any)?.currency ??
    "USD";

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-4 sm:py-6 grid gap-6 lg:grid-cols-[220px_1fr_360px]">
        <div className="hidden lg:block">
          <Sidebar onLogout={logout} />
        </div>

        <main className="flex flex-col gap-6 bg-white lg:bg-white rounded-2xl lg:rounded-none">
          <div className="lg:hidden bg-white rounded-2xl shadow-card">
            <Topbar name={me?.data?.fullName}/>
          </div>

          <div className="px-4 sm:px-6">
            <div className="py-4 sm:py-6 text-[20px] sm:text-[24px] font-semibold">
              Dashboard
            </div>

            <SummaryCards
              loading={sumL}
              currency={currency}
              data={(summary as any)?.data ?? summary}
            />

            <div
              className="bg-white rounded-2xl p-4 sm:p-6 mt-4"
              style={{
                borderRadius: "10px",
                borderWidth: "1px",
                borderColor: "#F5F5F5",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-700">
                  Working Capital
                </h3>
                <div className="text-xs text-slate-500 rounded-lg border border-slate-200 px-2 py-1">
                  Last 6 months
                </div>
              </div>

              {wcL ? (
                <div className="h-56 sm:h-64">
                  <div className="skeleton h-full rounded-xl" />
                </div>
              ) : (
                wc && (
                  <WorkingCapitalChart
                    data={wc.data.data.map((p: any) => ({
                      label: p.month,
                      income: p.income,
                      expense: p.expense,
                      net: p.net,
                    }))}
                    currency={wc.data.currency}
                  />
                )
              )}
            </div>

            <div
              className="bg-white rounded-2xl p-4 sm:p-6 mt-4"
              style={{
                borderRadius: "10px",
                borderWidth: "1px",
                borderColor: "#F5F5F5",
              }}
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-sm font-semibold text-slate-700">
                  Recent Transaction
                </h3>
                <button className="text-emerald-700 text-sm font-medium inline-flex items-center gap-1">
                  View All <span>›</span>
                </button>
              </div>
              <RecentTransactions
                loading={txL}
                items={(txRes as any)?.data?.transactions}
                currency={currency}
              />
            </div>
          </div>
        </main>

        <aside className="flex flex-col gap-6 bg-white">
          <div className="hidden lg:block">
            <Topbar
              name={me?.data?.fullName}
            />
          </div>

          <WalletWidget
            loading={walletL}
            wallets={(walletRes as any)?.data?.cards}
          />

          <div className="bg-white rounded-2xl p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-700">
                Scheduled Transfers
              </h3>
              <button className="text-emerald-700 text-sm font-medium inline-flex items-center gap-1">
                View All <span>›</span>
              </button>
            </div>
            <ScheduledTransfers
              loading={schL}
              items={(scheduledRes as any)?.data?.transfers}
              currency={currency}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
