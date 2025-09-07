import { BoxArrowDownIcon, TrashIcon } from "@phosphor-icons/react";
import type { Mail } from "../types";
import { formatDate } from "../utils/formatDate";
import ViewMailModal from "./ViewMailModal";
import { useState } from "react";
import { getInitials } from "../utils";

export default function MailItem({ mail }: { mail: Mail }) {
  const [openMail, setOpenMail] = useState(false);

  return (
    <>
      <ViewMailModal {...{ openMail, setOpenMail, mail }} />
      <tr
        key={mail.id}
        className="hover:bg-gray-50 border-b border-gray-200 cursor-pointer overflow-auto"
        onClick={() => setOpenMail(true)}
      >
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <img
              className="h-10 w-10 rounded-md mr-4 ring-2 ring-[#e0e0e0]"
              src={`https://picsum.photos/5${mail.id}`}
              alt={mail.sender}
            />
            <div>
              <div className="flex items-center gap-2 text-base font-medium text-gray-900">
                {getInitials(mail.sender)}.
                <span className="text-sm text-gray-500">
                  {formatDate(mail.time)}
                </span>
                <span
                  className={`w-max px-2 py-0.5 rounded-full text-xs font-semibold ${
                    mail.important
                      ? "bg-[#e0f2f7] text-[#6fa1e2]"
                      : "bg-red-100 text-[#e46b89]"
                  }`}
                >
                  {mail.important ? "Important" : "Irrelevant"}
                </span>
              </div>
              <div className="text-sm w-fit text-gray-500 text-ellipsis overflow-hidden whitespace-nowrap max-w-[calc(100vw-36rem)]">
                <b>{mail.subject}</b> - {mail.body}
              </div>
            </div>
          </div>
        </td>
        <td className="flex px-4 py-4 whitespace-nowrap text-sm text-gray-500">
          {/* <button
            className="bg-[#6fa1e2] hover:bg-[#a172ec] text-white font-semibold px-3 rounded-2xl flex items-center gap-1 h-8 cursor-pointer mb-2"
            onClick={(e) => {
              e.stopPropagation();
              alert("AI Reply feature coming soon!");
            }}
          >
            <RobotIcon size={18} />
            AI Reply
          </button> */}
          <TrashIcon
            size={36}
            className="cursor-pointer hover:bg-gray-200 rounded-full p-2 text-gray-600"
            onClick={(e) => {
              e.stopPropagation();
              alert("Delete feature coming soon!");
            }}
          />
          <BoxArrowDownIcon
            size={36}
            className="cursor-pointer hover:bg-gray-200 rounded-full p-2 text-gray-600"
            onClick={(e) => {
              e.stopPropagation();
              alert("Delete feature coming soon!");
            }}
          />
        </td>
      </tr>
    </>
  );
}
