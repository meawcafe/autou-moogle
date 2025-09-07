import { IconContext } from "@phosphor-icons/react";

export default function NavItem({
  title,
  icon,
  selected,
}: {
  title: string;
  icon?: React.ReactNode;
  selected?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 px-4 py-2 mr-8 rounded-r-2xl cursor-pointer hover:bg-gray-100 ${
        selected
          ? "bg-gray-50 font-semibold border border-gray-300 border-l-0"
          : ""
      }`}
    >
      <IconContext.Provider
        value={{ size: "1.2rem", color: selected ? "#000000" : "#6b7280" }}
      >
        {icon}
      </IconContext.Provider>
      <span className={`text-sm ${selected ? "text-black" : "text-gray-600"}`}>
        {title}
      </span>
    </div>
  );
}
