import { useEffect, useRef, useState, type FormEvent } from "react";

export type FormErrors<T> = Partial<Record<keyof T, string>>;

/**
 * Client-side prototype form state. No request is made anywhere in this hook:
 * it exists to demonstrate validation, loading and success states honestly.
 */
export function usePrototypeForm<T extends Record<string, string | boolean>>(
  initialValues: T,
  validate: (values: T) => FormErrors<T>,
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  };

  return {
    values,
    errors,
    touched,
    submitted,
    isSubmitting,
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
    if (!value) return "Please confirm that you understand the prototype notice.";
    return undefined;
  },
};
