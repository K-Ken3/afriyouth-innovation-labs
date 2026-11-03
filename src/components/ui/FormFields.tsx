import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Check, Info } from "lucide-react";
import { cn } from "@/lib/cn";

type SharedFieldProps = {
  name: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
};

function FieldShell({
  name,
  label,
  error,
  hint,
  required,
  className,
  children,
}: SharedFieldProps & { children: ReactNode }) {
  return (
    <div className={cn("w-full", className)}>
      <label htmlFor={name} className="field-label">
        {label}
        {required ? (
          <span className="ml-1 text-clay" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 text-[0.65rem] font-normal tracking-normal text-forest/45 normal-case">
            optional
          </span>
        )}
      </label>
      {hint ? (
        <p id={`${name}-hint`} className="mb-2 text-xs leading-relaxed text-forest/60">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <span id={`${name}-error`} role="alert" className="field-error">
          {error}
        </span>
      ) : null}
    </div>
  );
}

function describedBy(name: string, error?: string, hint?: string): string | undefined {
  const ids = [hint ? `${name}-hint` : null, error ? `${name}-error` : null].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}

type TextFieldProps = SharedFieldProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "className" | "required">;

export function TextField({ name, label, error, hint, required, className, ...props }: TextFieldProps) {
  return (
    <FieldShell
      name={name}
      label={label}
      error={error}
      hint={hint}
      required={required}
      className={className}
    >
      <input
        id={name}
        name={name}
        className={cn("field-input", error && "border-[#a33a2a]")}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
        required={required}
        {...props}
      />
    </FieldShell>
  );
}

type TextAreaFieldProps = SharedFieldProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "className" | "required">;

export function TextAreaField({
  name,
  label,
  error,
  hint,
  required,
  className,
  ...props
}: TextAreaFieldProps) {
  return (
    <FieldShell
      name={name}
      label={label}
      error={error}
      hint={hint}
      required={required}
      className={className}
    >
      <textarea
        id={name}
        name={name}
        className={cn("field-input min-h-36 resize-y", error && "border-[#a33a2a]")}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
        required={required}
        {...props}
      />
    </FieldShell>
  );
}

type SelectFieldProps = SharedFieldProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "name" | "className" | "required"> & {
    options: string[];
    placeholder?: string;
  };

export function SelectField({
  name,
  label,
  error,
  hint,
  required,
  className,
  options,
  placeholder = "Select an option",
  ...props
}: SelectFieldProps) {
  return (
    <FieldShell
      name={name}
      label={label}
      error={error}
      hint={hint}
      required={required}
      className={className}
    >
      <select
        id={name}
        name={name}
        className={cn("field-input appearance-none pr-10", error && "border-[#a33a2a]")}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
        required={required}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

type CheckboxFieldProps = {
  name: string;
  label: ReactNode;
  error?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  onBlur?: () => void;
};

export function CheckboxField({
  name,
  label,
  error,
  checked,
  onChange,
  onBlur,
}: CheckboxFieldProps) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <span className="relative mt-0.5 flex h-5 w-5 flex-none items-center justify-center">
          <input
            id={name}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={(event) => onChange(event.target.checked)}
            onBlur={onBlur}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${name}-error` : undefined}
            className={cn(
              "peer h-5 w-5 appearance-none rounded-[0.3rem] border bg-paper transition-colors",
              error ? "border-[#a33a2a]" : "border-forest/40",
              "checked:border-forest checked:bg-forest",
            )}
          />
          <Check
            aria-hidden="true"
            className="pointer-events-none absolute h-3.5 w-3.5 text-lime opacity-0 peer-checked:opacity-100"
            strokeWidth={3}
          />
        </span>
        <label htmlFor={name} className="text-sm leading-relaxed text-forest/75">
          {label}
        </label>
      </div>
      {error ? (
        <span id={`${name}-error`} role="alert" className="field-error">
          {error}
        </span>
      ) : null}
    </div>
  );
}

export function PrototypeNotice({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-forest/15 bg-sage/45 px-4 py-3 text-sm leading-relaxed text-forest/75">
      <Info aria-hidden="true" className="mt-0.5 h-4 w-4 flex-none" />
      <p>{children}</p>
    </div>
  );
}
