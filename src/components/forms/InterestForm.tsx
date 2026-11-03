import { usePrototypeForm, validate } from "@/hooks/usePrototypeForm";
import { interestOptions, prototypeFormCopy } from "@/content/pages";
import { Button } from "@/components/ui/Button";
import { FormSuccess } from "@/components/ui/FormSuccess";
import {
  CheckboxField,
  PrototypeNotice,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/ui/FormFields";

type InterestValues = {
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  interest: string;
  motivation: string;
  consent: boolean;
};

const initialValues: InterestValues = {
  firstName: "",
  lastName: "",
  email: "",
  location: "",
  interest: "",
  motivation: "",
  consent: false,
};

function validateInterest(values: InterestValues) {
  return {
    firstName: validate.required(values.firstName, "First name"),
    lastName: validate.required(values.lastName, "Last name"),
    email: validate.email(values.email),
    interest: validate.required(values.interest, "Area of interest"),
    motivation: validate.min(values.motivation, 30, "Your note"),
    consent: validate.accepted(values.consent),
  };
}

export function InterestForm() {
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
  } = usePrototypeForm(initialValues, validateInterest);

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
      aria-labelledby="interest-form-title"
      className="card-surface p-6 sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-forest/50">Register interest</p>
          <h2 id="interest-form-title" className="display-md mt-3 text-forest">
            Tell us where your interest sits.
          </h2>
        </div>
        <span className="hidden font-display text-xs uppercase tracking-[0.16em] text-forest/30 sm:block">
          Form 01
        </span>
      </div>

      <p className="mt-3 max-w-lg text-sm leading-relaxed text-forest/60">
        This is not an application. It is a way to signal which future calls or
        learning opportunities would be relevant to you.
      </p>

      <div className="mt-6">
        <PrototypeNotice>{prototypeFormCopy.body}</PrototypeNotice>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <TextField
          name="firstName"
          label="First name"
          required
          autoComplete="given-name"
          value={values.firstName}
          onChange={(event) => update("firstName", event.target.value)}
          onBlur={() => markTouched("firstName")}
          error={touched.firstName ? errors.firstName : undefined}
        />
        <TextField
          name="lastName"
          label="Last name"
          required
          autoComplete="family-name"
          value={values.lastName}
          onChange={(event) => update("lastName", event.target.value)}
          onBlur={() => markTouched("lastName")}
          error={touched.lastName ? errors.lastName : undefined}
        />
        <TextField
          name="email"
          label="Email address"
          type="email"
          required
          autoComplete="email"
          hint="Used only to demonstrate field validation in this prototype."
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          onBlur={() => markTouched("email")}
          error={touched.email ? errors.email : undefined}
        />
        <TextField
          name="location"
          label="City or country"
          autoComplete="address-level2"
          value={values.location}
          onChange={(event) => update("location", event.target.value)}
          onBlur={() => markTouched("location")}
          error={touched.location ? errors.location : undefined}
        />
        <SelectField
          name="interest"
          label="Area of interest"
          required
          options={interestOptions}
          placeholder="Select an area"
          value={values.interest}
          onChange={(event) => update("interest", event.target.value)}
          onBlur={() => markTouched("interest")}
          error={touched.interest ? errors.interest : undefined}
          className="sm:col-span-2"
        />
        <TextAreaField
          name="motivation"
          label="What would you like to explore?"
          required
          hint="A sentence or two is enough. Minimum 30 characters."
          value={values.motivation}
          onChange={(event) => update("motivation", event.target.value)}
          onBlur={() => markTouched("motivation")}
          error={touched.motivation ? errors.motivation : undefined}
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
              I understand this prototype form does not send or store my details,
              and that no application or response will be created.
            </>
          }
        />
      </div>

      <div className="mt-7 flex flex-col gap-3 border-t border-forest/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-forest/45">Required fields are marked *</p>
        <Button type="submit" disabled={isSubmitting} arrow={false}>
          {isSubmitting ? "Validating…" : "Register interest"}
        </Button>
      </div>
    </form>
  );
}
