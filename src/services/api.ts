import type { AiReplyRequest, AiReplyResponse, Mail, NewMail } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ApiOptions {
  method?: string;
  path: string;
  body?: unknown;
}

// wrapper for fetch with error handling
async function apiRequest<T>({ method = 'GET', path, body }: ApiOptions): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // authentication token here but for now I don't have auth :)
  };

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  // basic error handling
  if (!response.ok) {
    const error =  await response.json()
    alert(error.status.message);
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}


export async function getMails(): Promise<Mail[]> {
  const response = await apiRequest<{ data: Mail[] }>({ path: 'get-mails' });
  return response.data;
}

export async function createEmail(email: NewMail): Promise<Mail> {
  const res = await apiRequest<Mail>({ method: 'POST', path: 'add-mail', body: email });
  return res;
}

export async function getAiReply(prompt: AiReplyRequest): Promise<AiReplyResponse> {
  const res = await apiRequest<{ data: { reply: AiReplyResponse } }>({ method: 'POST', path: 'ai-reply', body: prompt });
  return res.data.reply;
}