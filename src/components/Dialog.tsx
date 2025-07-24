import { ReactNode, useEffect, useId, useRef } from 'react';

interface DialogProps {
  open?: boolean;
  title: string;
  description: string;
  confirmLabel?: string | ReactNode;
  confirmClassName?: string;
  actionDisabled?: boolean;
  onConfirm?: () => void;
  onClose?: () => void;
}

export default function Dialog({
  open = false,
  title,
  description,
  confirmLabel = 'Confirm',
  confirmClassName = 'btn',
  actionDisabled = false,
  onConfirm,
  onClose,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogTitle = useId();
  const dialogDescription = useId();

  useEffect(() => {
    const dialogEl = dialogRef.current;
    const handleClose = () => {
      onClose?.();
    };

    dialogEl?.addEventListener('close', handleClose);

    return () => dialogEl?.removeEventListener('close', handleClose);
  }, [onClose]);

  const handleConfirm = () => {
    onConfirm?.();
    onClose?.();
  };

  return (
    <dialog
      ref={dialogRef}
      open={open}
      className="modal"
      aria-labelledby={dialogTitle}
      aria-describedby={dialogDescription}
    >
      <div className="modal-box">
        <h3 id={dialogTitle} className="text-lg font-bold">
          {title}
        </h3>
        <p id={dialogDescription} className="py-4">
          {description}
        </p>
        <div className="flex justify-end gap-2">
          <button className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button
            disabled={actionDisabled}
            className={confirmClassName}
            onClick={handleConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
