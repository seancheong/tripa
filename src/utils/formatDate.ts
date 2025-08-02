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

export const formatDateRange = (
  start: string | number,
  end: string | number,
) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (isNaN(startDate.getTime())) {
    throw new Error(`Invalid start date input: ${start}`);
  }

  if (isNaN(endDate.getTime())) {
    throw new Error(`Invalid end date input: ${end}`);
  }

  return start === end
    ? startDate.toLocaleDateString()
    : `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
};

export const formatDuration = (
  start: string | number,
  end: string | number,
) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (isNaN(startDate.getTime())) {
    throw new Error(`Invalid start date input: ${start}`);
  }

  if (isNaN(endDate.getTime())) {
    throw new Error(`Invalid end date input: ${end}`);
  }

  const diffMs = endDate.getTime() - startDate.getTime();
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
  }
  return `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
};
