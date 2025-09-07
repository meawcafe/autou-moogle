import {
  CircleNotchIcon,
  PaperPlaneTiltIcon,
  RobotIcon,
  XIcon,
} from "@phosphor-icons/react";
import ComposeInput from "./ComposeImput";
import { useState } from "react";
import { createEmail, getAiReply } from "../../services/api";
import type { Mail } from "../../types";

interface ComposeModalProps {
  mail?: Mail;
  composeAction?: "reply" | "new";
  openCompose: boolean;
  setOpenCompose: (open: boolean) => void;
  handleGetMails?: () => void;
}

export default function ComposeModal({
  mail,
  composeAction,
  openCompose,
  setOpenCompose,
  handleGetMails,
}: ComposeModalProps) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateEmail = () => {
    if (!subject || !body) {
      alert("Subject and body are required.");
      return;
    }

    setLoading(true);
    createEmail({
      sender: "Milton M",
      subject,
      body,
    })
      .then(() => {
        alert("Email sent successfully!");
        setOpenCompose(false);
        setSubject("");
        setBody("");
        if (handleGetMails) {
          handleGetMails();
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error creating email:", err);
        setLoading(false);
      });
  };

  const handleAiReply = () => {
    setLoading(true);
    getAiReply({
      sender: "Milton M",
      subject: mail?.subject ?? "",
      body: mail?.body ?? "",
      context: subject,
    })
      .then((reply) => {
        setSubject(reply.subject);
        setBody(reply.body);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error getting AI reply:", err);
        setLoading(false);
      });
  };

  return (
    <div
      className={`fixed inset-0 bg-black/25 flex z-50`}
      style={{
        opacity: openCompose ? 1 : 0,
        left: openCompose ? 0 : "100%",
        transition: openCompose
          ? `opacity 600ms ease-in-out, left 0s 0s`
          : `opacity 600ms ease-in-out, left 0s 600ms`,
        pointerEvents: openCompose ? "auto" : "none",
      }}
      onClick={() => setOpenCompose(false)}
    >
      <div
        className="bg-white w-[30rem] h-[32rem] rounded-t-2xl absolute p-4 left-1/2 -translate-x-1/2 border border-gray-200"
        style={{
          transition: openCompose
            ? "bottom 800ms ease, opacity 900ms 100ms"
            : "bottom 600ms cubic-bezier(0.8, 0, 1, 1), opacity 500ms 100ms",
          opacity: openCompose ? 1 : 0,
          bottom: openCompose ? "0%" : "-100vh",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex justify-between relative items-center pt-2">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2"></div>
          <span className="font-medium text-md text-gray-600 px-4">
            {composeAction === "reply" ? "Reply" : "New Message"}
          </span>
          <XIcon
            size={32}
            className="cursor-pointer hover:bg-gray-200 rounded-full p-2 text-gray-600"
            onClick={() => setOpenCompose(false)}
          />
        </div>
        {/* body */}
        <div className="mt-4">
          <ComposeInput
            label="To"
            value="me@localhost.com"
            onChange={() => {}}
            readonly={true}
          />
          <ComposeInput
            value={subject}
            onChange={setSubject}
            placeholder="Subject"
          />
          <textarea
            className="w-full h-[60%] mt-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 resize-y max-h-[16.5rem]"
            placeholder="Write your message..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        {/* footer */}
        <div className="flex justify-end mt-4">
          {composeAction === "reply" ? (
            <button
              className="bg-[#6fa1e2] hover:bg-[#a172ec] text-white font-semibold px-3 rounded-2xl flex items-center gap-1 h-8 cursor-pointer mb-2"
              onClick={(e) => {
                e.stopPropagation();
                handleAiReply();
              }}
              disabled={loading}
            >
              {loading ? (
                <CircleNotchIcon
                  className="animate-spin"
                  weight="bold"
                  size={18}
                />
              ) : (
                <RobotIcon size={18} />
              )}
              AI Reply
            </button>
          ) : (
            <button
              className="bg-[#6fa1e2] hover:bg-[#a172ec] text-white font-semibold px-4 rounded-2xl flex items-center gap-2 h-10 cursor-pointer"
              onClick={() => handleCreateEmail()}
              disabled={loading}
            >
              {loading ? (
                <CircleNotchIcon
                  className="animate-spin"
                  weight="bold"
                  size={20}
                />
              ) : (
                <PaperPlaneTiltIcon size={20} />
              )}
              Send
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
