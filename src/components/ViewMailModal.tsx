import { ArrowBendUpLeftIcon, XIcon } from "@phosphor-icons/react";
import type { Mail } from "../types";
import ComposeModal from "./ComposeModal";
import { useState } from "react";

interface ViewModalProps {
  openMail: boolean;
  setOpenMail: (open: boolean) => void;
  mail: Mail;
}

export default function ViewMailModal({
  openMail,
  setOpenMail,
  mail,
}: ViewModalProps) {
  const [openCompose, setOpenCompose] = useState(false);
  return (
    <>
      <ComposeModal
        {...{ mail, composeAction: "reply", openCompose, setOpenCompose }}
      />
      <div
        className={`fixed inset-0 bg-black/25 flex z-40`}
        style={{
          opacity: openMail ? 1 : 0,
          left: openMail ? 0 : "100%",
          transition: openMail
            ? `opacity 600ms ease-in-out, left 0s 0s`
            : `opacity 600ms ease-in-out, left 0s 600ms`,
          pointerEvents: openMail ? "auto" : "none",
        }}
        onClick={() => setOpenMail(false)}
      >
        <div
          className="bg-white w-[40rem] h-[30rem] rounded-t-2xl absolute py-4 px-8 left-1/2 -translate-x-1/2 border border-gray-200"
          style={{
            transition: openMail
              ? "bottom 800ms ease, opacity 900ms 100ms"
              : "bottom 600ms cubic-bezier(0.8, 0, 1, 1), opacity 500ms 100ms",
            opacity: openMail ? 1 : 0,
            bottom: openMail ? "0%" : "-100vh",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* header */}
          <div className="flex justify-between relative items-center pt-2">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2"></div>
            <span className="font-medium text-md text-gray-600">View Mail</span>
            <XIcon
              size={32}
              className="cursor-pointer hover:bg-gray-200 rounded-full p-2 text-gray-600"
              onClick={() => setOpenMail(false)}
            />
          </div>
          {/* body */}
          <div className="mt-4">
            <div className="flex gap-4">
              <img
                className="h-11 w-11 rounded-md ring-2 ring-[#e0e0e0]"
                src={`https://picsum.photos/5${mail.id}`}
                alt={mail.sender}
              />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-600">
                  {mail.sender}
                </span>
                <span className="text-sm text-gray-500">me@localhost.com</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-lg mt-4 text-gray-600">
                {mail.subject}
              </h2>
              <p className="text-gray-500 whitespace-pre-wrap max-h-60 overflow-y-auto">
                {mail.body}
              </p>
            </div>
          </div>
          {/* footer */}
          <div className="flex justify-end mt-4">
            <button
              className="bg-[#6fa1e2] hover:bg-[#a172ec] text-white font-semibold px-4 rounded-2xl flex items-center gap-2 h-10 cursor-pointer"
              onClick={() => setOpenCompose(true)}
            >
              <ArrowBendUpLeftIcon weight="fill" size={26} /> Reply
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
