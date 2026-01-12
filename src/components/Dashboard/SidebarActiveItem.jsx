import { NavLink } from "react-router";

const SidebarActiveItem = ({ to, label, icon, }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 is-drawer-close:tooltip is-drawer-close:tooltip-right
        ${
          isActive
            ? "bg-secondary text-primary font-semibold"
            : "text-secondary hover:bg-secondary/20"
        }`
      }
      data-tip={label}
    >
      {icon && <span className="text-lg">{icon || label}</span>}
      <span className="is-drawer-close:hidden">{label}</span>
    </NavLink>
  );
};

export default SidebarActiveItem;
