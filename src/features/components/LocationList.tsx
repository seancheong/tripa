'use client';

import { CirclePlusIcon } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

import { getLocations } from '../location/actions/locationAction';

interface LocationListProps {
  locationsData: ReturnType<typeof getLocations>;
}

export default function LocationList({ locationsData }: LocationListProps) {
  const locations = use(locationsData);

  return locations.length > 0 ? (
    <ul className="mt-4 flex flex-nowrap gap-2 overflow-x-auto overflow-y-hidden">
      {locations.map(({ id, name, description }) => (
        <li
          key={id}
          className="card card-compact bg-base-300 h-28 w-72 shrink-0"
        >
          <div className="card-body">
            <h3>{name}</h3>
            <p>{description}</p>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <div className="mt-4 flex flex-col gap-2">
      <p>Add a location to get started</p>
      <Link href="/dashboard/add" className="btn btn-primary w-40">
        Add Location <CirclePlusIcon size={16} />
      </Link>
    </div>
  );
}
