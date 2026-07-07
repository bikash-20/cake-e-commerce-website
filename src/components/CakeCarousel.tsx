import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import CakeCard from './CakeCard';
import type { Cake } from '../data/cakes';

type Props = {
  cakes: Cake[];
};

export default function CakeCarousel({ cakes }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
    skipSnaps: true,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6 pl-6 pr-6 md:pl-12 md:pr-12">
          {cakes.map((cake) => (
            <div key={cake.id} className="flex-[0_0_auto]">
              <CakeCard cake={cake} />
            </div>
          ))}
        </div>
      </div>

      {/* edge fades — subtle, asymmetric */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-cream to-transparent md:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-cream to-transparent md:w-20" />

      {/* arrow controls */}
      <div className="mx-6 mt-8 flex items-center justify-between md:mx-12">
        <p className="eyebrow">Drag to explore</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            aria-label="Previous"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-divider text-ink transition-all hover:border-ink disabled:opacity-40"
          >
            <ArrowLeft size={14} />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            aria-label="Next"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-divider text-ink transition-all hover:border-ink disabled:opacity-40"
          >
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}