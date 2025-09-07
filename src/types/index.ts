export type Mail = {
  id: number;
  sender: string;
  subject: string;
  body: string;
  snippet: string;
  time: string;
  important: true | false;
};

export type NewMail = {
  sender: string;
  subject: string;
  body: string;
};

export type AiReplyRequest = {
  sender: string;
  subject: string;
  body: string;
  context: string;
};

export type AiReplyResponse = {
  body: string;
  subject: string;
};