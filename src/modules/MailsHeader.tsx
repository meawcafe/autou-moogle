import { PencilIcon } from "@phosphor-icons/react";

export default function MailsHeader({
  setOpenCompose,
  handleSearch,
  handleFilterImportant,
}: {
  setOpenCompose: (open: boolean) => void;
  handleSearch: (query: string) => void;
  handleFilterImportant: (important: string) => void;
}) {
  return (
    <div className="flex justify-between items-center bg-white w-full rounded-2xl shadow-md">
      <input
        type="text"
        className="rounded-l-2xl focus:outline-none focus:ring-1 focus:ring-blue-200 px-4 h-10 w-full"
        placeholder="Search by subject, sender or body..."
        onChange={(e) => handleSearch(e.target.value)}
      />

      {/* filter important or not important */}
      <select
        className="h-10 border-l border-gray-200 px-2 focus:outline-none focus:ring-1 focus:ring-blue-200 text-gray-600 outline-none"
        onChange={(e) => handleFilterImportant(e.target.value)}
      >
        <option value="all">All</option>
        <option value="important">Important</option>
        <option value="not_important">Not Important</option>
      </select>

      <button
        className="bg-[#6fa1e2] hover:bg-[#a172ec] text-white font-semibold px-4 rounded-r-2xl flex items-center gap-2 h-10 cursor-pointer"
        onClick={() => setOpenCompose(true)}
      >
        <PencilIcon /> Compose
      </button>
    </div>
  );
}
