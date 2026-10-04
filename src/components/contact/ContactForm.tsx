"use client";

import clsx from "clsx";
import { Check, CircleAlert } from "lucide-react";
import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { fieldClasses, Select } from "@/components/ui/Select";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { whatsappLink } from "@/data/site";
import {
  budgetOptions,
  buildEnquiryMessage,
  validatedFields,
  validateEnquiry,
  validateField,
  type EnquiryErrors,
  type EnquiryValues,
} from "@/lib/enquiry";

type ContactFormProps = {
  initialValues: EnquiryValues;
  destinationOptions: string[];
  monthOptions: string[];
  travellerOptions: string[];
};

const inputClasses = clsx(fieldClasses, "min-h-12 bg-white px-3.5");
const invalidClasses = "border-brand-dark";

/**
 * "Plan a trip with us" enquiry form (DESIGN.md section 5, Contact). Validates on submit,
 * then re-checks a field as it is corrected. Nothing is sent: a valid submit shows a
 * thank-you panel, and "Send on WhatsApp" opens wa.me with the form content.
 */
export function ContactForm({ initialValues, destinationOptions, monthOptions, travellerOptions }: ContactFormProps) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [sent, setSent] = useState(false);
  const successRef = useRef<HTMLHeadingElement>(null);
  const id = useId();
  const fieldId = (field: keyof EnquiryValues) => `${id}-${field}`;
  const errorId = (field: keyof EnquiryValues) => `${id}-${field}-error`;

  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);

  const update = (field: keyof EnquiryValues) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...values, [field]: event.target.value };
    setValues(next);
    // Once a field has shown an error, re-check it as the visitor types.
    if (errors[field]) setErrors((current) => ({ ...current, [field]: validateField(field, next) }));
  };

  /** Shows the errors and moves focus to the first invalid field. Returns true when the form is valid. */
  const check = (requireMobile: boolean) => {
    const found = validateEnquiry(values, requireMobile);
    setErrors(found);
    const first = validatedFields.find((field) => found[field]);
    if (first) document.getElementById(fieldId(first))?.focus();
    return !first;
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (check(true)) setSent(true);
  };

  const sendOnWhatsApp = () => {
    if (!check(false)) return;
    window.open(whatsappLink(buildEnquiryMessage(values)), "_blank", "noopener,noreferrer");
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setSent(false);
  };

  const describedBy = (field: keyof EnquiryValues) => (errors[field] ? errorId(field) : undefined);
  const textField = (field: "name" | "mobile" | "email") => ({
    id: fieldId(field),
    name: field,
    value: values[field],
    onChange: update(field),
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": describedBy(field),
    className: clsx(inputClasses, errors[field] && invalidClasses),
  });

  const panelClasses = "min-w-0 flex-[999_1_560px] rounded-panel border border-line bg-white p-[clamp(22px,3vw,40px)]";

  if (sent) {
    return (
      <div className={panelClasses} role="status">
        <span className="inline-flex size-[52px] items-center justify-center rounded-[12px] bg-success-tint text-whatsapp">
          <Check size={26} strokeWidth={1.8} aria-hidden="true" />
        </span>
        <h2 ref={successRef} tabIndex={-1} className="mt-5 text-[1.75rem] leading-[1.15] outline-none">
          Thanks, we’ll call you back today.
        </h2>
        <p className="mt-3 max-w-[34rem] text-body">
          {values.name.trim()}, a travel consultant will call you on {values.mobile.trim()} during office hours, Monday to
          Saturday, 10 am to 7 pm. Keep your dates and any questions handy.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button variant="outline" onClick={reset}>
            Send another enquiry
          </Button>
          <Button
            variant="whatsapp"
            icon={<WhatsAppIcon size={18} />}
            href={whatsappLink(buildEnquiryMessage(values))}
            target="_blank"
            rel="noopener noreferrer"
          >
            Also send on WhatsApp
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submit} aria-labelledby={`${id}-title`} className={panelClasses}>
      <h2 id={`${id}-title`} className="mb-1.5 text-[1.75rem] leading-[1.15]">
        Plan a trip with us
      </h2>
      <p className="mb-6 text-muted">Fill this in and a travel consultant will call you back today.</p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-5">
        <Field label="Full name" htmlFor={fieldId("name")} error={errors.name} errorId={errorId("name")}>
          <input {...textField("name")} type="text" autoComplete="name" required />
        </Field>
        <Field label="Mobile number" htmlFor={fieldId("mobile")} error={errors.mobile} errorId={errorId("mobile")}>
          <input
            {...textField("mobile")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="98765 43210"
            required
          />
        </Field>
        <Field
          label={
            <>
              Email <span className="font-normal text-muted">(optional)</span>
            </>
          }
          htmlFor={fieldId("email")}
          error={errors.email}
          errorId={errorId("email")}
        >
          <input {...textField("email")} type="email" autoComplete="email" placeholder="you@example.com" />
        </Field>
        <Field label="Where would you like to go?" htmlFor={fieldId("destination")}>
          <Select
            id={fieldId("destination")}
            name="destination"
            tone="white"
            selectClassName="min-h-12 px-3.5"
            value={values.destination}
            onChange={update("destination")}
          >
            {destinationOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </Select>
        </Field>
        <Field label="Travel month" htmlFor={fieldId("month")}>
          <Select
            id={fieldId("month")}
            name="month"
            tone="white"
            selectClassName="min-h-12 px-3.5"
            value={values.month}
            onChange={update("month")}
          >
            {monthOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </Select>
        </Field>
        <Field label="Travellers" htmlFor={fieldId("travellers")}>
          <Select
            id={fieldId("travellers")}
            name="travellers"
            tone="white"
            selectClassName="min-h-12 px-3.5"
            value={values.travellers}
            onChange={update("travellers")}
          >
            {travellerOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </Select>
        </Field>
      </div>

      <fieldset className="mt-[22px]">
        <legend className="mb-2.5 font-medium">Budget per person</legend>
        <div className="flex flex-wrap gap-2">
          {budgetOptions.map((option) => (
            <label
              key={option}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-pill border border-line bg-white px-4 transition-colors hover:border-ink has-checked:border-brand has-checked:bg-brand-tint"
            >
              <input
                type="radio"
                name="budget"
                value={option}
                checked={values.budget === option}
                onChange={update("budget")}
                className="size-4 accent-brand"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <Field label="Anything else we should know?" htmlFor={fieldId("message")} className="mt-[22px]">
        <textarea
          id={fieldId("message")}
          name="message"
          rows={4}
          value={values.message}
          onChange={update("message")}
          placeholder="Anniversary trip, prefer vegetarian food…"
          className={clsx(fieldClasses, "resize-y bg-white px-3.5 py-3")}
        />
      </Field>

      <div className="mt-[26px] flex flex-wrap items-center gap-x-4 gap-y-3">
        <Button type="submit" size="lg" className="max-sm:w-full">
          Request a call back
        </Button>
        <Button
          variant="whatsapp"
          size="lg"
          icon={<WhatsAppIcon size={18} />}
          onClick={sendOnWhatsApp}
          className="max-sm:w-full"
        >
          Send on WhatsApp
        </Button>
        <span className="text-[0.92rem] text-muted">We never share your number.</span>
      </div>
    </form>
  );
}

type FieldProps = {
  label: ReactNode;
  htmlFor: string;
  error?: string;
  errorId?: string;
  className?: string;
  children: ReactNode;
};

/** Label above a control, with an inline error message below it. */
function Field({ label, htmlFor, error, errorId, className, children }: FieldProps) {
  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      <label htmlFor={htmlFor} className="font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={errorId} className="flex items-start gap-1.5 text-[0.92rem] leading-[1.4] text-brand-dark">
          <CircleAlert size={16} strokeWidth={1.8} aria-hidden="true" className="mt-0.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
