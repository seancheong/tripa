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
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import clsx from 'clsx';
import { EditIcon, MoreVerticalIcon, Trash2Icon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type HTMLAttributes, type PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

import { deleteLocation } from '../actions/locationAction';

interface LocationCardProps extends HTMLAttributes<HTMLDivElement> {
  href: string;
  title: string;
  description: string | null;
  isHighlighted?: boolean;
}

export default function LocationCard({
  children,
  href,
  title,
  description,
  isHighlighted,
  ...props
}: PropsWithChildren<LocationCardProps>) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDeleteLocation = async () => {
    try {
      console.log('confirm delete');
      setIsDeleting(true);
      await deleteLocation(href);
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
      <Card
        {...props}
        className={clsx(
          'group hover:border-primary justify-between overflow-hidden transition-all duration-300 hover:scale-[1.02]',
          isHighlighted && 'border-primary scale-[1.02]',
        )}
      >
        <CardHeader>
          <CardTitle
            className={clsx(
              'group-hover:text-primary transition-colors duration-200',
              isHighlighted && 'text-primary',
            )}
          >
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
          <CardAction>
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
          </CardAction>
        </CardHeader>

        <CardContent>{children}</CardContent>

        <CardFooter>
          <Link href={href} className="w-full" passHref>
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
        </CardFooter>
      </Card>

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
