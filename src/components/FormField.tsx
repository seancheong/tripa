import { PropsWithChildren } from 'react';
import { FieldError } from 'react-hook-form';

interface FormFieldProps {
  label: string;
  error?: FieldError;
}

export default function FormField({
  children,
  label,
  error,
}: PropsWithChildren<FormFieldProps>) {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      {children}
      {error && <p className="label text-error">{error.message}</p>}
    </fieldset>
  );
}
