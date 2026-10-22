import React from 'react';

// One reusable shimmering block. Size/shape comes from the className you pass.
const Shimmer = ({ className = '' }) => (
  <div className={`shimmer rounded-md bg-gray-200 ${className}`} />
);

const ProductSkeleton = () => (
  <div role="status" aria-label="Loading product">
    {/* keyframes live here, so no tailwind.config change is needed */}
    <style>{`
      .shimmer {
        position: relative;
        overflow: hidden;
      }
      .shimmer::after {
        content: '';
        position: absolute;
        inset: 0;
        transform: translateX(-100%);
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.6),
          transparent
        );
        animation: shimmer-slide 1.4s infinite;
      }
      @keyframes shimmer-slide {
        100% { transform: translateX(100%); }
      }
      @media (prefers-reduced-motion: reduce) {
        .shimmer::after { animation: none; }
      }
    `}</style>

    <div className="mx-auto max-w-6xl px-4 py-6 md:py-10 pb-28 md:pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
        {/* ---------- Gallery ---------- */}
        <div className="flex flex-col-reverse md:flex-row gap-3">
          {/* thumbnails */}
          <div className="flex md:flex-col gap-2 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <Shimmer key={i} className="shrink-0 w-16 h-20 md:w-20 md:h-24" />
            ))}
          </div>
          {/* main image */}
          <Shimmer className="flex-1 aspect-[3/4] rounded-lg" />
        </div>

        {/* ---------- Details ---------- */}
        <div className="flex flex-col">
          <Shimmer className="h-4 w-24" />                {/* category */}
          <Shimmer className="mt-3 h-8 w-4/5" />          {/* name */}
          <Shimmer className="mt-3 h-4 w-32" />           {/* stars */}

          <div className="mt-5 flex items-center gap-3">  {/* prices */}
            <Shimmer className="h-9 w-28" />
            <Shimmer className="h-6 w-20" />
          </div>
          <Shimmer className="mt-2 h-3 w-64 max-w-full" /> {/* GST note */}

          <div className="mt-5 space-y-2">                {/* description */}
            <Shimmer className="h-4 w-full" />
            <Shimmer className="h-4 w-full" />
            <Shimmer className="h-4 w-2/3" />
          </div>

          <div className="mt-6">                          {/* sizes */}
            <Shimmer className="h-5 w-28" />
            <div className="mt-3 flex gap-2">
              {[...Array(5)].map((_, i) => (
                <Shimmer key={i} className="h-11 w-12" />
              ))}
            </div>
          </div>

          {/* add to cart: fixed bar on mobile, inline on desktop */}
          <div className="fixed bottom-0 inset-x-0 z-20 bg-white border-t border-gray-200 p-3 md:static md:z-auto md:border-0 md:p-0 md:mt-8">
            <Shimmer className="h-12 w-full md:w-56" />
          </div>

          <div className="mt-6 pt-5 border-t border-gray-200 space-y-3"> {/* meta */}
            <Shimmer className="h-4 w-40" />
            <Shimmer className="h-4 w-56" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProductSkeleton;