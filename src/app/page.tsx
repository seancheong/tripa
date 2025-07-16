import { Map } from 'lucide-react';

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Welcome to Tripa!</h1>
      <button className="btn btn-secondary">
        View Map <Map size={16} />
      </button>
    </div>
  );
}
