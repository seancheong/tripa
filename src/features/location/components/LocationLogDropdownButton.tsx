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
import {
  EditIcon,
  Loader2Icon,
  MoreVerticalIcon,
  Trash2Icon,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { deleteLocationLog } from '../actions/locationLogAction';

interface LocationLogDropdownButtonProps {
  id: number;
  locationSlug: string;
  href: string;
  title: string;
}

export default function LocationLogDropdownButton({
  id,
  locationSlug,
  href,
  title,
}: LocationLogDropdownButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDeleteLog = async () => {
    try {
      setIsDeleting(true);
      await deleteLocationLog(id);
      toast.success(`Log "${title}" deleted successfully.`);
      router.push(`/dashboard/location/${locationSlug}`);
    } catch (error) {
      console.error('Failed to delete log:', error);
      setIsDeleting(false);
      toast.error('Failed to delete log. Please try again later.');
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
                <EditIcon size={16} /> Edit Log
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <AlertDialogTrigger className="w-full">
                <Trash2Icon size={16} /> Delete Log
              </AlertDialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {`Deleting log: "${title}" cannot be undone.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={handleConfirmDeleteLog}
              className="bg-error hover:bg-error/80 text-error-foreground"
            >
              {isDeleting ? (
                <Loader2Icon size={16} className="animate-spin" />
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
