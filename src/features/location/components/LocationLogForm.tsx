import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import {
  InsertLocationLog,
  InsertLocationLogType,
} from '@/db/schema/locationLog';
import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/formatDate';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, Loader2Icon } from 'lucide-react';
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

  const form = useForm<InsertLocationLogType>({
    defaultValues,
    resolver: zodResolver(InsertLocationLog),
    mode: 'onBlur',
  });

  const { control, watch, handleSubmit } = form;

  const watchedStartedAt = watch('startedAt');

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Log Name *</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Tokyo Skytree" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  {...field}
                  placeholder="Tell us more about the experience..."
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="startedAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Started At *</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        formatDate(field.value)
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(field.value)}
                    onSelect={(date) => {
                      const timestamp =
                        date instanceof Date ? date.getTime() : date;
                      field.onChange(timestamp);
                    }}
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="endedAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Ended At *</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        formatDate(field.value)
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(field.value)}
                    onSelect={(date) => {
                      const timestamp =
                        date instanceof Date ? date.getTime() : date;
                      field.onChange(timestamp);
                    }}
                    disabled={(date) => date < new Date(watchedStartedAt)}
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row justify-between gap-3 lg:justify-end">
          <Button
            type="button"
            variant="outline"
            className="border-border hover:bg-muted w-1/2 bg-transparent lg:w-20"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground w-1/2 lg:w-20"
            disabled={isFormSubmitting}
          >
            {isFormSubmitting ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              submitLabel
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
