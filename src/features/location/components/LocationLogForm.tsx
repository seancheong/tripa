import FormField from '@/components/FormField';
import {
  InsertLocationLog,
  InsertLocationLogType,
} from '@/db/schema/locationLog';
import { formatDate } from '@/utils/formatDate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

interface LocationLogFormProps {
  submitLabel: string;
  isFormSubmitting: boolean;
  defaultValues: InsertLocationLogType;
  submitHandler: SubmitHandler<InsertLocationLogType>;
}

export default function LocationLogForm({
  submitLabel,
  isFormSubmitting,
  defaultValues,
  submitHandler,
}: LocationLogFormProps) {
  const router = useRouter();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<InsertLocationLogType>({
    defaultValues,
    resolver: zodResolver(InsertLocationLog),
    mode: 'onBlur',
  });

  const watchedStartedAt = watch('startedAt');
  const watchedEndedAt = watch('endedAt');

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(submitHandler)}
    >
      <FormField label="Name" error={errors.name}>
        <input
          {...register('name')}
          className={`input w-full ${errors.name && 'input-error'}`}
        />
      </FormField>

      <FormField label="Description" error={errors.description}>
        <textarea
          {...register('description')}
          rows={5}
          className={`textarea w-full ${errors.description && 'textarea-error'}`}
        />
      </FormField>

      <FormField label="Started At" error={errors.startedAt}>
        <input
          {...register('startedAt', {
            setValueAs: (value) => new Date(value).getTime(),
          })}
          type="date"
          value={formatDate(watchedStartedAt)}
          className={`input w-full ${errors.startedAt && 'input-error'}`}
        />
      </FormField>

      <FormField label="Ended At" error={errors.endedAt}>
        <input
          {...register('endedAt', {
            setValueAs: (value) => new Date(value).getTime(),
          })}
          type="date"
          value={formatDate(watchedEndedAt)}
          className={`input w-full ${errors.endedAt && 'input-error'}`}
        />
      </FormField>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          disabled={isFormSubmitting}
          className="btn btn-outline min-w-20"
          onClick={() => router.back()}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isFormSubmitting}
          className="btn btn-primary min-w-20"
        >
          {isFormSubmitting ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  );
}
