import { NavLink } from "react-router-dom";
import logo from "../../assets/maglo-logo.png";
import dashboardLogo from "../../assets/dashboard.png";
import transactionsLogo from "../../assets/transactions.png";
import invoicesLogo from "../../assets/invoices.png";
import walletsLogo from "../../assets/My Wallets.png";
import settingsLogo from "../../assets/Settings.png";

export const Sidebar: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const baseItem =
    "block px-3 py-2 rounded-lg transition-colors text-sm font-medium";
  const activeItem = "bg-[#C8EE44] text-black";
  const idleItem = "text-slate-700 hover:bg-slate-100";

  const Item = ({
    to,
    icon,
    label,
    end,
  }: {
    to: string;
    icon: string;
    label: string;
    end?: boolean;
  }) => (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [baseItem, isActive ? activeItem : idleItem].join(" ")
      }
    >
      <span className="flex items-center">
        <img src={icon} alt="" className="h-5 w-5" />
        <span className="ml-4">{label}</span>
      </span>
    </NavLink>
  );

  return (
    <aside className="hidden lg:flex flex-col px-4 py-4 min-h-[calc(100vh-48px)] w-[220px]" style={{position: "fixed"}}>
      <div className="px-2 py-3 text-xl font-semibold flex items-center">
        <img src={logo} alt="Maglo" />
      </div>

      <nav className="mt-2 space-y-1">
        <Item to="/" end icon={dashboardLogo} label="Dashboard" />
        <Item to="/transactions" icon={transactionsLogo} label="Transactions" />
        <Item to="/invoices" icon={invoicesLogo} label="Invoices" />
        <Item to="/wallets" icon={walletsLogo} label="My Wallets" />
        <Item to="/settings" icon={settingsLogo} label="Settings" />
      </nav>

      <div className="mt-auto pt-4 space-y-1">
        <button
          type="button"
          className="w-full flex items-center px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100"
          onClick={() => {}}
        >
          <svg
            className="h-5 w-5 text-slate-600"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 17h.01M9.09 9a3 3 0 115.82 1c-.57.92-1.91 1.5-1.91 3v.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="ml-4">Help</span>
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100"
        >
          <svg
            className="h-5 w-5 text-slate-600"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15 17l5-5-5-5M20 12H9M12 21a9 9 0 110-18"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="ml-4">Logout</span>
        </button>
      </div>
    </aside>
  );
};
