/**
 * format the date to YYYY-MM-DD format
 */
export const formatDate = (value: string | number) => {
  const date = new Date(value);

  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date input: ${value}`);
  }

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};
