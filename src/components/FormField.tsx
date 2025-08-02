import { PropsWithChildren } from 'react';
import { FieldError } from 'react-hook-form';

import { FormLabel } from './ui/form';

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
      <FormLabel>{label}</FormLabel>
      {children}
      {error && <p className="label text-error">{error.message}</p>}
    </fieldset>
  );
}
