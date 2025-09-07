import MailItem from "../components/MailItem";
import type { Mail } from "../types";
import MailsHeader from "./MailsHeader";

export default function MailsContainer({
  fileredMails,
  setOpenCompose,
  handleSearch,
  handleFilterImportant,
}: {
  fileredMails: Mail[];
  setOpenCompose: (open: boolean) => void;
  handleSearch: (query: string) => void;
  handleFilterImportant: (important: string) => void;
}) {
  return (
    <div className="flex flex-col h-full gap-4 w-full">
      <MailsHeader
        {...{ setOpenCompose, handleSearch, handleFilterImportant }}
      />
      <div className="flex flex-col bg-white w-full h-full rounded-2xl shadow-lg overflow-auto">
        <table className="w-full">
          <thead className="">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Inbox
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {fileredMails.length !== 0 ? (
              fileredMails.map((mail) => <MailItem key={mail.id} mail={mail} />)
            ) : (
              <tr>
                <td
                  colSpan={2}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                >
                  No mails found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
