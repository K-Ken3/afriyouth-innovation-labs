import { usePrototypeForm, validate } from "@/hooks/usePrototypeForm";
import { collaborationOptions } from "@/content/partners";
import { prototypeFormCopy } from "@/content/pages";
import { Button } from "@/components/ui/Button";
import { FormSuccess } from "@/components/ui/FormSuccess";
import {
  CheckboxField,
  PrototypeNotice,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/ui/FormFields";

type PartnerValues = {
  name: string;
  organisation: string;
  role: string;
  email: string;
  collaboration: string;
  context: string;
  consent: boolean;
};

const initialValues: PartnerValues = {
  name: "",
  organisation: "",
  role: "",
  email: "",
  collaboration: "",
  context: "",
  consent: false,
};

function validatePartner(values: PartnerValues) {
  return {
    name: validate.required(values.name, "Name"),
    organisation: validate.required(values.organisation, "Organisation"),
    email: validate.email(values.email),
    collaboration: validate.required(values.collaboration, "Collaboration type"),
    context: validate.min(values.context, 40, "The context"),
    consent: validate.accepted(values.consent),
  };
}

export function PartnerForm() {
  const {
    values,
    errors,
    touched,
    submitted,
    isSubmitting,
    update,
    markTouched,
    handleSubmit,
    reset,
  } = usePrototypeForm(initialValues, validatePartner);

  if (submitted) {
    return (
      <FormSuccess
        title={prototypeFormCopy.successTitle}
        body={prototypeFormCopy.successBody}
        onReset={reset}
        resetLabel={prototypeFormCopy.resetLabel}
      />
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby="partner-form-title"
      className="card-surface p-6 sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-forest/50">Start a conversation</p>
          <h2 id="partner-form-title" className="display-md mt-3 text-forest">
            Bring us the question.
          </h2>
        </div>
        <span className="hidden font-display text-xs uppercase tracking-[0.16em] text-forest/30 sm:block">
          Form 02
        </span>
      </div>

      <p className="mt-3 max-w-lg text-sm leading-relaxed text-forest/60">
        A scoping conversation starts with the decision you need to inform, not a
        pre-written brief. Share as much context as you can.
      </p>

      <div className="mt-6">
        <PrototypeNotice>{prototypeFormCopy.body}</PrototypeNotice>
      </div>

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
          name="organisation"
          label="Organisation"
          required
          autoComplete="organization"
          value={values.organisation}
          onChange={(event) => update("organisation", event.target.value)}
          onBlur={() => markTouched("organisation")}
          error={touched.organisation ? errors.organisation : undefined}
        />
        <TextField
          name="role"
          label="Role"
          autoComplete="organization-title"
          value={values.role}
          onChange={(event) => update("role", event.target.value)}
          onBlur={() => markTouched("role")}
          error={touched.role ? errors.role : undefined}
        />
        <TextField
          name="email"
          label="Email address"
          type="email"
          required
          autoComplete="email"
          hint="Validated locally only. Nothing is sent."
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          onBlur={() => markTouched("email")}
          error={touched.email ? errors.email : undefined}
        />
        <SelectField
          name="collaboration"
          label="Collaboration type"
          required
          options={collaborationOptions}
          placeholder="Select a starting point"
          value={values.collaboration}
          onChange={(event) => update("collaboration", event.target.value)}
          onBlur={() => markTouched("collaboration")}
          error={touched.collaboration ? errors.collaboration : undefined}
          className="sm:col-span-2"
        />
        <TextAreaField
          name="context"
          label="What are you trying to decide or change?"
          required
          hint="Context, constraints and who needs to act on the result. Minimum 40 characters."
          value={values.context}
          onChange={(event) => update("context", event.target.value)}
          onBlur={() => markTouched("context")}
          error={touched.context ? errors.context : undefined}
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
          label={
            <>
              I understand this prototype form does not transmit or store this
              enquiry, and that no partnership or response is created.
            </>
          }
        />
      </div>

      <div className="mt-7 flex flex-col gap-3 border-t border-forest/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-forest/45">Required fields are marked *</p>
        <Button type="submit" disabled={isSubmitting} arrow={false}>
          {isSubmitting ? "Validating…" : "Outline a conversation"}
        </Button>
      </div>
    </form>
  );
}
