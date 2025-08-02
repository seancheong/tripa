import { Badge } from '@/components/ui/badge';
import { getSession } from '@/utils/auth';
import { ArrowRight, BookOpen, MapPin, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="relative mx-auto flex flex-1 flex-col items-center justify-center gap-6 p-4 text-center">
      <Badge variant="secondary" className="gap-2 rounded-full px-4 py-2">
        <Sparkles size={16} className="text-primary" />
        <span className="text-sm font-medium">Track your adventures</span>
      </Badge>

      <div className="mb-6 flex flex-col items-center gap-4">
        <h1 className="text-4xl leading-tight font-bold sm:text-6xl lg:text-7xl">
          <span className="text-gradient-orange">Your Journey</span>
          <br />
          <span>Beautifully Mapped</span>
        </h1>

        <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed sm:text-xl">
          Keep track of your travels and adventures with Tripa. Add locations,
          and notes to create a personalized travel journal that tells your
          story.
        </p>
      </div>

      <div className="mb-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <CTAButton />
      </div>

      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
        <CardItem
          title="Track Locations"
          description="Pin your favorite spots and create a visual map of your adventures"
          icon={
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600">
              <MapPin className="text-white" />
            </div>
          }
        />

        {/* TODO: Enable this when photo attach feature is available */}
        {/* <CardItem
          title="Capture Memories"
          description="Add photos and create lasting memories of your travels"
          icon={
            <div className="bg-accent mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
              <Camera className="text-white" />
            </div>
          }
        /> */}

        <CardItem
          title="Write Stories"
          description="Document your experiences with notes and stories"
          icon={
            <div className="bg-success mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
              <BookOpen className="text-white" />
            </div>
          }
        />
      </div>
    </section>
  );

  async function CTAButton() {
    const session = await getSession();

    return (
      <Link
        href={session ? '/dashboard' : '/signin'}
        className="group bg-primary text-primary-foreground relative inline-flex scale-100 transform items-center overflow-hidden rounded-lg px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full"></span>
        Start Your Journey
        <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    );
  }

  interface CardItemProps {
    title: string;
    description: string;
    icon: React.ReactNode;
  }

  function CardItem({ title, description, icon }: CardItemProps) {
    return (
      <div className="hover:border-primary/50 dark:hover:border-primary/30 dark:border-border bg-tertiary flex flex-col items-center rounded-2xl border border-gray-200/50 p-6 shadow-md backdrop-blur-md transition-all duration-300 hover:shadow-xl dark:hover:shadow-[0_25px_25px_-5px_rgba(0,0,0,0.4),0_10px_10px_-5px_rgba(0,0,0,0.2)]">
        {icon}
        <h3 className="mb-2 font-semibold">{title}</h3>
        <p className="text-muted-foreground text-center text-sm">
          {description}
        </p>
      </div>
    );
  }
}
