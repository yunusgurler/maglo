import searchLogo from "../../assets/search.png";
import notificationsLogo from "../../assets/notifications.png";
export const Topbar: React.FC<{
  name?: string;
}> = ({ name = "" }) => {
  const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=random&size=64`;

  return (
    <header className="h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-5 text-slate-400">
        <button
          type="button"
          aria-label="Search"
          className="hover:text-slate-500 transition"
        >
          <img src={searchLogo} width={24} height={24}></img>
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative hover:text-slate-500 transition"
        >
          <img src={notificationsLogo} width={24} height={24}></img>
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500" />
        </button>
      </div>

      <button
        type="button"
        className="inline-flex items-center rounded-full bg-white border border-slate-200 shadow-sm pl-1.5 pr-2 py-1.5"
      >
        <img
          src={avatar}
          alt={name}
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="mx-2 text-sm font-medium text-slate-800">{name}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          className="text-slate-500"
        >
          <path
            d="M8 10l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </header>
  );
};
