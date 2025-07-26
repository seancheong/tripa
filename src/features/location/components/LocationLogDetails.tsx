'use client';

import Dialog from '@/components/Dialog';
import { formatDate } from '@/utils/formatDate';
import { showToast } from '@/utils/showToast';
import { Edit2Icon, EllipsisVerticalIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';

import type { getLocation } from '../actions/locationAction';
import {
  deleteLocationLog,
  type getLocationLog,
} from '../actions/locationLogAction';
import { useLocation } from '../contexts/locationContext';
import { useLocationLog } from '../contexts/locationLogContext';

interface LocationLogDetailsProps {
  locationData: ReturnType<typeof getLocation>;
  logData: ReturnType<typeof getLocationLog>;
}

export default function LocationLogDetails({
  locationData,
  logData,
}: LocationLogDetailsProps) {
  const location = use(locationData);
  const log = use(logData);
  const router = useRouter();
  const { setSelectedLocation } = useLocation();
  const { setSelectedLog } = useLocationLog();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (location) setSelectedLocation(location);
    if (log) setSelectedLog(log);

    return () => setSelectedLog(null);
  }, [location, log, setSelectedLocation, setSelectedLog]);

  if (!location || !log) {
    return <div className="text-error">Log not found</div>;
  }

  const handleDeleteLog = () => {
    setDeleteDialogOpen(true);
    (document.activeElement as HTMLAnchorElement)?.blur();
  };

  const handleConfirmDeleteLog = async () => {
    try {
      setIsDeleting(true);
      await deleteLocationLog(log.id);
      showToast({
        message: `Log "${log.name}" deleted successfully.`,
      });
      router.push(`/dashboard/location/${location.slug}`);
    } catch (error) {
      console.error('Failed to delete log:', error);
      setIsDeleting(false);
      showToast({
        type: 'error',
        message: 'Failed to delete log. Please try again later.',
        duration: 10000,
      });
    }
  };

  return (
    <>
      <div>
        <p className="text-sm text-gray-500 italic">
          {formatDate(log.startedAt)}{' '}
          {log.startedAt !== log.endedAt && `/ ${formatDate(log.endedAt)}`}
        </p>

        <div className="flex items-center">
          <h2 className="text-xl">{log.name}</h2>

          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              aria-label={`More actions for log "${log.name}"`}
              className="btn btn-sm m-1 p-0"
            >
              <EllipsisVerticalIcon />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <Link
                  href={`/dashboard/location/${location.slug}/${log.id}/edit`}
                >
                  <Edit2Icon size={16} /> Edit
                </Link>
              </li>
              <li>
                <button onClick={handleDeleteLog}>
                  <TrashIcon size={16} /> Delete
                </button>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-sm">{log.description}</p>
      </div>

      <Dialog
        open={deleteDialogOpen}
        title="Are you sure?"
        description={`Deleting log: "${log.name}" cannot be undone.`}
        confirmLabel={
          isDeleting ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            'Delete'
          )
        }
        confirmClassName="btn btn-error"
        actionDisabled={isDeleting}
        onConfirm={handleConfirmDeleteLog}
        onClose={() => setDeleteDialogOpen(false)}
      />
    </>
  );
}
