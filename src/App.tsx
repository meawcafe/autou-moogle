import type { Mail } from "./types";
import { useEffect, useState } from "react";
import { getMails } from "./services/api";
import ComposeModal from "./components/ComposeModal";
import LeftSidebar from "./modules/LeftSidebar";
import MailsContainer from "./modules/MailsContainer";

function App() {
  const [mails, setMails] = useState<Mail[]>([]);
  const [fileredMails, setFilteredMails] = useState<Mail[]>([]);
  const [openCompose, setOpenCompose] = useState(false);

  const handleGetMails = () => {
    getMails()
      .then((data) => {
        setMails(data);
        setFilteredMails(data);
      })
      .catch((err) => console.error("Error fetching mails:", err));
  };

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredMails(mails);
      return;
    }

    // get all mails that match the query in subject, sender or body
    const lowerCaseQuery = query.toLowerCase();
    const filtered = mails.filter(
      (mail) =>
        mail.subject.toLowerCase().includes(lowerCaseQuery) ||
        mail.sender.toLowerCase().includes(lowerCaseQuery) ||
        mail.body.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredMails(filtered);
  };

  const handleFilterImportant = (important: string) => {
    // const filtered = mails.filter((mail) => mail.important === important);
    // setFilteredMails(filtered);
    if (important === "all") {
      setFilteredMails(mails);
    } else if (important === "important") {
      const filtered = mails.filter((mail) => mail.important === true);
      setFilteredMails(filtered);
    } else if (important === "not_important") {
      const filtered = mails.filter((mail) => mail.important === false);
      setFilteredMails(filtered);
    }
  };

  useEffect(() => {
    handleGetMails();
  }, []);

  return (
    <>
      <ComposeModal
        {...{
          composeAction: "new",
          openCompose,
          setOpenCompose,
          handleGetMails,
        }}
      />
      <div className="bg-gray-50 flex h-svh w-screen overflow-hidden gap-4 p-4">
        <LeftSidebar />

        <MailsContainer
          {...{
            fileredMails,
            setOpenCompose,
            handleSearch,
            handleFilterImportant,
          }}
        />
      </div>
    </>
  );
}

export default App;
