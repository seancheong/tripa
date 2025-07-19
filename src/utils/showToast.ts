export const showToast = ({
  message,
  type,
  duration = 3000,
}: {
  message: string;
  type?: 'info' | 'success' | 'error';
  duration?: number;
}) => {
  const toastContainer = document.getElementById('daisy-toast');
  if (!toastContainer) return;

  const toast = document.createElement('div');
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');
  toast.setAttribute('aria-atomic', 'true');
  toast.className = `alert ${type ? `alert-${type}` : ''} text-sm shadow-lg`;
  const span = document.createElement('span');
  span.textContent = message;
  toast.appendChild(span);
  toastContainer.appendChild(toast);

  setTimeout(() => toast.remove(), duration);
};
