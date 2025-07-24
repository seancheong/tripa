'use client';

import Dialog from '@/components/Dialog';
import { showToast } from '@/utils/showToast';
import { EllipsisVerticalIcon, MapPinPlusIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';

import { deleteLocation, getLocation } from '../actions/locationAction';
import { useLocation } from '../contexts/locationContext';

interface LocationDetailsProps {
  locationData: ReturnType<typeof getLocation>;
}

export default function LocationDetails({
  locationData,
}: LocationDetailsProps) {
  const location = use(locationData);
  const { setSelectedLocation } = useLocation();
  const router = useRouter();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (location) setSelectedLocation(location);
  }, [location, setSelectedLocation]);

  if (!location)
    return <h2 className="text-error text-lg">Location not found</h2>;

  const handleDeleteLocation = () => {
    setDeleteDialogOpen(true);
    (document.activeElement as HTMLAnchorElement)?.blur();
  };

  const handleConfirmDeleteLocation = async () => {
    try {
      setIsDeleting(true);
      await deleteLocation(location.slug);
      showToast({
        message: `Location "${location.name}" deleted successfully.`,
      });
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to delete location:', error);
      showToast({
        type: 'error',
        message: 'Failed to delete location. Please try again later.',
        duration: 10000,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex items-center">
        <h2 className="text-xl">Location page: {location.name}</h2>

        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-sm m-1 p-0">
            <EllipsisVerticalIcon />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <button onClick={handleDeleteLocation}>
                <TrashIcon size={16} /> Delete
              </button>
            </li>
          </ul>
        </div>
      </div>

      {location.description && (
        <p className="text-sm">{location.description}</p>
      )}

      {location.locationLogs.length === 0 && (
        <div className="mt-4">
          <p className="text-sm italic">Add a location log to get started </p>

          <Link
            href={`/dashboard/location/${location.slug}/add`}
            className="btn btn-primary mt-2"
          >
            Add location Log <MapPinPlusIcon size={16} />
          </Link>
        </div>
      )}

      <Dialog
        open={deleteDialogOpen}
        title="Are you sure?"
        description={`Deleting location "${location.name}" will remove all associated logs and cannot be undone.`}
        confirmLabel={
          isDeleting ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            'Delete'
          )
        }
        confirmClassName="btn btn-error"
        actionDisabled={isDeleting}
        onConfirm={handleConfirmDeleteLocation}
        onClose={() => setDeleteDialogOpen(false)}
      />
    </>
  );
}
