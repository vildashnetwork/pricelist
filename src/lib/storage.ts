// localStorage helpers for form submissions

export interface ProjectBooking {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  budget?: string;
  description: string;
  createdAt: string;
}

export interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  services: string[];
  budget: string;
  timeline: string;
  description: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const saveBooking = (data: Omit<ProjectBooking, "id" | "createdAt">): ProjectBooking => {
  const booking: ProjectBooking = { ...data, id: generateId(), createdAt: new Date().toISOString() };
  const existing = JSON.parse(localStorage.getItem("vildash_bookings") || "[]");
  existing.push(booking);
  localStorage.setItem("vildash_bookings", JSON.stringify(existing));
  return booking;
};

export const saveQuote = (data: Omit<QuoteRequest, "id" | "createdAt">): QuoteRequest => {
  const quote: QuoteRequest = { ...data, id: generateId(), createdAt: new Date().toISOString() };
  const existing = JSON.parse(localStorage.getItem("vildash_quotes") || "[]");
  existing.push(quote);
  localStorage.setItem("vildash_quotes", JSON.stringify(existing));
  return quote;
};

export const saveContact = (data: Omit<ContactMessage, "id" | "createdAt">): ContactMessage => {
  const msg: ContactMessage = { ...data, id: generateId(), createdAt: new Date().toISOString() };
  const existing = JSON.parse(localStorage.getItem("vildash_contacts") || "[]");
  existing.push(msg);
  localStorage.setItem("vildash_contacts", JSON.stringify(existing));
  return msg;
};

export const getBookings = (): ProjectBooking[] => JSON.parse(localStorage.getItem("vildash_bookings") || "[]");
export const getQuotes = (): QuoteRequest[] => JSON.parse(localStorage.getItem("vildash_quotes") || "[]");
export const getContacts = (): ContactMessage[] => JSON.parse(localStorage.getItem("vildash_contacts") || "[]");
