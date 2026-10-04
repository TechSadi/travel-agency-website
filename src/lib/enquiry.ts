// Contact form model, validation and the WhatsApp message. Client-side only: nothing is sent to a server.

export type EnquiryValues = {
  name: string;
  mobile: string;
  email: string;
  destination: string;
  month: string;
  travellers: string;
  budget: string;
  message: string;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

export const NOT_SURE = "Not sure yet";
export const FLEXIBLE = "Flexible";

export const budgetOptions = ["Under ₹50k", "₹50k to ₹1 lakh", "₹1 to 2 lakh", "Above ₹2 lakh"];

export const emptyEnquiry: EnquiryValues = {
  name: "",
  mobile: "",
  email: "",
  destination: NOT_SURE,
  month: FLEXIBLE,
  travellers: "2 adults",
  budget: "",
  message: "",
};

/** "2 adults", "2 adults and 1 child". */
export function travellersLabel(adults: number, children = 0): string {
  const adultText = `${adults} ${adults === 1 ? "adult" : "adults"}`;
  if (children <= 0) return adultText;
  return `${adultText} and ${children} ${children === 1 ? "child" : "children"}`;
}

export const travellerOptions = [
  travellersLabel(1),
  travellersLabel(2),
  travellersLabel(2, 1),
  travellersLabel(2, 2),
  travellersLabel(3),
  travellersLabel(4),
  "Group of 5 to 10",
  "Group of more than 10",
];

/**
 * The 10 digits of an Indian mobile number, or null. Accepts spaces, dashes and
 * brackets, and a +91, 91 or 0 prefix: "+91 98765 43210" → "9876543210".
 */
export function normaliseIndianMobile(input: string): string | null {
  let digits = input.replace(/[\s\-().]/g, "");
  if (digits.startsWith("+91")) digits = digits.slice(3);
  else if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Field-level checks. `requireMobile` is off for WhatsApp, where the agency already sees the number. */
export function validateField(field: keyof EnquiryValues, values: EnquiryValues, requireMobile = true): string | undefined {
  const value = values[field].trim();
  switch (field) {
    case "name":
      return value ? undefined : "Enter your name";
    case "mobile":
      if (!value) return requireMobile ? "Enter your mobile number so we can call you back" : undefined;
      return normaliseIndianMobile(value) ? undefined : "Enter a 10-digit Indian mobile number, like 98765 43210";
    case "email":
      return !value || EMAIL_PATTERN.test(value) ? undefined : "Enter a valid email address, like you@example.com";
    default:
      return undefined;
  }
}

export const validatedFields = ["name", "mobile", "email"] as const;

export function validateEnquiry(values: EnquiryValues, requireMobile = true): EnquiryErrors {
  const errors: EnquiryErrors = {};
  for (const field of validatedFields) {
    const error = validateField(field, values, requireMobile);
    if (error) errors[field] = error;
  }
  return errors;
}

/** The form content as a WhatsApp message, one detail per line. Empty fields are left out. */
export function buildEnquiryMessage(values: EnquiryValues): string {
  const mobile = normaliseIndianMobile(values.mobile);
  const lines: [string, string][] = [
    ["Name", values.name.trim()],
    ["Mobile", mobile ? `+91 ${mobile.slice(0, 5)} ${mobile.slice(5)}` : values.mobile.trim()],
    ["Email", values.email.trim()],
    ["Destination", values.destination],
    ["Travel month", values.month],
    ["Travellers", values.travellers],
    ["Budget per person", values.budget],
    ["Note", values.message.trim()],
  ];
  return [
    "Hello Suman Holidays, I would like to plan a trip.",
    ...lines.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`),
  ].join("\n");
}
