'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EditIcon, MoreVerticalIcon, Trash2Icon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { deleteLocation } from '../actions/locationAction';
import { useLocation } from '../contexts/locationContext';

interface LocationDropdownButtonProps {
  id: number;
  href: string;
  title: string;
}

export default function LocationDropdownButton({
  id,
  href,
  title,
}: LocationDropdownButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const { setSelectedLocation } = useLocation();

  const handleConfirmDeleteLocation = async () => {
    try {
      setIsDeleting(true);
      await deleteLocation(id);
      setSelectedLocation(null);
      toast.success(`Location "${title}" deleted successfully.`);
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to delete location:', error);
      toast.error('Failed to delete location. Please try again later.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">
            <MoreVerticalIcon size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href={`${href}/edit`}>
                <EditIcon size={16} /> Edit Location
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <AlertDialogTrigger className="w-full">
                <Trash2Icon size={16} /> Delete Location
              </AlertDialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {`Deleting location "${title}" will remove all associated logs and cannot be undone.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={handleConfirmDeleteLocation}
              className="bg-error hover:bg-error/80 text-error-foreground"
            >
              {isDeleting ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                'Delete'
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
