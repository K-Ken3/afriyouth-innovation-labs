import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "@/content/site";

export type FormErrors<T> = Partial<Record<keyof T, string>>;
export type EnquiryDraft = { subject: string; body: string };

/**
 * Client-side enquiry state. A valid submission opens a pre-addressed email
 * draft in the visitor's mail client; the site never stores or transmits the
 * answers itself.
 */
export function useEnquiryForm<T extends Record<string, string | boolean>>(
  initialValues: T,
  validate: (values: T) => FormErrors<T>,
  compose: (values: T) => EnquiryDraft,
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryUnavailable, setDeliveryUnavailable] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, []);

  const update = <K extends keyof T>(key: K, value: T[K]) => {
    const next = { ...values, [key]: value } as T;
    setValues(next);
    if (touched[key]) {
      const nextErrors = validate(next);
      setErrors((previous) => ({ ...previous, [key]: nextErrors[key] }));
    }
  };

  const markTouched = (key: keyof T) => {
    setTouched((previous) => ({ ...previous, [key]: true }));
    const nextErrors = validate(values);
    setErrors((previous) => ({ ...previous, [key]: nextErrors[key] }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    const allTouched = Object.keys(values).reduce<Partial<Record<keyof T, boolean>>>(
      (accumulator, key) => {
        accumulator[key as keyof T] = true;
        return accumulator;
      },
      {},
    );
    setTouched(allTouched);
    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors).find(
      (key) => nextErrors[key as keyof T],
    );
    if (firstError) {
      const field = event.currentTarget.querySelector<HTMLElement>(
        `[name="${firstError}"]`,
      );
      field?.focus();
      return;
    }

    setIsSubmitting(true);
    timer.current = window.setTimeout(() => {
      setIsSubmitting(false);
      const recipient = site.contact.email;
      if (!recipient) {
        setDeliveryUnavailable(true);
        return;
      }
      const draft = compose(values);
      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(
        draft.subject,
      )}&body=${encodeURIComponent(draft.body)}`;
      setSubmitted(true);
    }, 480);
  };

  const reset = () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setSubmitted(false);
    setIsSubmitting(false);
    setDeliveryUnavailable(false);
  };

  return {
    values,
    errors,
    touched,
    submitted,
    isSubmitting,
    deliveryUnavailable,
    update,
    markTouched,
    handleSubmit,
    reset,
  };
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const validate = {
  required(value: string, label: string): string | undefined {
    if (!value.trim()) return `${label} is required.`;
    return undefined;
  },
  min(value: string, length: number, label: string): string | undefined {
    if (value.trim().length < length) {
      return `${label} must be at least ${length} characters.`;
    }
    return undefined;
  },
  email(value: string): string | undefined {
    if (!value.trim()) return "Email address is required.";
    if (!EMAIL_PATTERN.test(value.trim())) {
      return "Enter a valid email address, for example name@example.org.";
    }
    return undefined;
  },
  accepted(value: boolean): string | undefined {
    if (!value) return "Please confirm that you agree to be contacted about this enquiry.";
    return undefined;
  },
};

export function draftBody(lines: (string | undefined)[]): string {
  return lines.filter(Boolean).join("\n\n");
}
