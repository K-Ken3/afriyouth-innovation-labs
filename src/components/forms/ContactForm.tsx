import { draftBody, useEnquiryForm, validate } from "@/hooks/useEnquiryForm";
import { enquiryFormCopy } from "@/content/pages";
import { Button } from "@/components/ui/Button";
import { FormSuccess } from "@/components/ui/FormSuccess";
import {
  CheckboxField,
  FormNotice,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/ui/FormFields";

const contactSubjects = [
  "General enquiry",
  "Research collaboration",
  "Programmes & opportunities",
  "Media or speaking",
  "Accessibility feedback",
  "Something else",
];

type ContactValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
};

const initialValues: ContactValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
  consent: false,
};

function validateContact(values: ContactValues) {
  return {
    name: validate.required(values.name, "Name"),
    email: validate.email(values.email),
    subject: validate.required(values.subject, "Subject"),
    message: validate.min(values.message, 20, "Message"),
    consent: validate.accepted(values.consent),
  };
}

function composeContact(values: ContactValues) {
  return {
    subject: `Contact enquiry — ${values.subject}`,
    body: draftBody([
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Subject: ${values.subject}`,
      `Message:\n${values.message}`,
    ]),
  };
}

export function ContactForm() {
  const {
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
  } = useEnquiryForm(initialValues, validateContact, composeContact);

  if (submitted) {
    return (
      <FormSuccess
        title={enquiryFormCopy.successTitle}
        body={enquiryFormCopy.successBody}
        onReset={reset}
        resetLabel={enquiryFormCopy.resetLabel}
      />
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby="contact-form-title"
      className="card-surface p-6 sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-forest/60">Contact form</p>
          <h2 id="contact-form-title" className="display-md mt-3 text-forest">
            Write a message.
          </h2>
        </div>
        <span className="hidden font-display text-xs uppercase tracking-[0.16em] text-forest/60 sm:block">
          Form 03
        </span>
      </div>

      <p className="mt-3 max-w-lg text-sm leading-relaxed text-forest/60">
        Tell us what you need and the form opens a pre-addressed email draft in
        your mail client. Review the message before you send it.
      </p>

      <div className="mt-6">
        <FormNotice>{enquiryFormCopy.body}</FormNotice>
      </div>

      {deliveryUnavailable ? (
        <div role="alert" className="mt-3">
          <FormNotice>{enquiryFormCopy.unavailable}</FormNotice>
        </div>
      ) : null}

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <TextField
          name="name"
          label="Your name"
          required
          autoComplete="name"
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          onBlur={() => markTouched("name")}
          error={touched.name ? errors.name : undefined}
        />
        <TextField
          name="email"
          label="Email address"
          type="email"
          required
          autoComplete="email"
          hint="Used only to respond to your enquiry."
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          onBlur={() => markTouched("email")}
          error={touched.email ? errors.email : undefined}
        />
        <SelectField
          name="subject"
          label="Subject"
          required
          options={contactSubjects}
          placeholder="Select a subject"
          value={values.subject}
          onChange={(event) => update("subject", event.target.value)}
          onBlur={() => markTouched("subject")}
          error={touched.subject ? errors.subject : undefined}
          className="sm:col-span-2"
        />
        <TextAreaField
          name="message"
          label="Message"
          required
          hint="Minimum 20 characters. Do not include sensitive personal information."
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          onBlur={() => markTouched("message")}
          error={touched.message ? errors.message : undefined}
          className="sm:col-span-2"
        />
      </div>

      <div className="mt-6">
        <CheckboxField
          name="consent"
          checked={values.consent}
          onChange={(checked) => update("consent", checked)}
          onBlur={() => markTouched("consent")}
          error={touched.consent ? errors.consent : undefined}
          label="I agree that AfriYouth may use these details to respond to my enquiry."
        />
      </div>

      <div className="mt-7 flex flex-col gap-3 border-t border-forest/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-forest/60">Required fields are marked *</p>
        <Button type="submit" disabled={isSubmitting} arrow={false}>
          {isSubmitting ? "Opening draft…" : "Open email draft"}
        </Button>
      </div>
    </form>
  );
}
