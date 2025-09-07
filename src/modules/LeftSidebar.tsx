import {
  PaperPlaneRightIcon,
  ScrollIcon,
  SignOutIcon,
  StarIcon,
  TimerIcon,
  TrashIcon,
  TrayIcon,
  WarningOctagonIcon,
} from "@phosphor-icons/react";
import NavItem from "../components/NavItem";
import moogle_icon from "../assets/moogle.png";

export default function LeftSidebar() {
  return (
    <div className="flex flex-col shrink-0 bg-white w-[16rem] h-full rounded-2xl shadow-2xl justify-between">
      <img
        src={moogle_icon}
        alt="Moogle Mail"
        className="h-10 object-contain mt-6"
      />

      <div className="flex flex-col gap-1">
        <NavItem title="Inbox" icon={<TrayIcon />} selected />
        <NavItem title="Starred" icon={<StarIcon />} />
        <NavItem title="Snoozed" icon={<TimerIcon />} />
        <NavItem title="Sent" icon={<PaperPlaneRightIcon />} />
        <NavItem title="Drafts" icon={<ScrollIcon />} />
        <NavItem title="Spam" icon={<WarningOctagonIcon />} />
        <NavItem title="Trash" icon={<TrashIcon />} />
      </div>

      <div className="flex gap-2 items-center mb-6 mx-6">
        <img
          src="https://avatars.githubusercontent.com/u/44252635?v=4"
          alt="User Avatar"
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="flex flex-col w-full">
          <span className="text-[0.7rem] text-gray-500">Logged in as</span>
          <span className="text-base text-gray-600">Milton M</span>
        </div>
        <div>
          <button className="hover:bg-gray-300 h-8 w-8 rounded-full flex items-center justify-center cursor-pointer">
            <SignOutIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
