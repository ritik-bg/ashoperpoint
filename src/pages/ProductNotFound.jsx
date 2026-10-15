import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Keyframes used by the arbitrary animate-[...] classes below.
// (Tailwind already ships "spin"; the rest are defined here so no config change is needed.)
const keyframes = `
@keyframes float { 50% { transform: translateY(-8px); } }
@keyframes search {
  25% { transform: translate(-22px, 10px) rotate(-8deg); }
  60% { transform: translate(8px, 18px) rotate(8deg); }
}
@keyframes fall {
  0%   { opacity: 0; transform: translateY(-14px); }
  20%  { opacity: 1; }
  100% { opacity: 0; transform: translateY(46px); }
}
`;

const btn =
  "inline-block rounded-full border-2 border-[#ffc800a8] px-[22px] py-[13px] font-semibold text-[#2b2b2b] transition hover:-translate-y-0.5";

const ProductNotFound = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-5 py-8 dark:bg-[#1d1b16]">
      <style>{keyframes}</style>

      {/* background blobs */}
      <div className="absolute -right-[120px] -top-[140px] h-[420px] w-[420px] rounded-full bg-[#ffc800a8]" />
      <div className="absolute -bottom-[90px] -left-20 h-[260px] w-[260px] rounded-full bg-[#ffc800a8] opacity-70" />

      <main className="relative z-10 w-full max-w-[560px] rounded-[28px] border-[3px] border-[#ffc800a8] bg-white px-7 pb-8 pt-9 text-center shadow-[10px_10px_0_#ffc800a8] dark:bg-[#2a2720]">
        {/* 4 [magnifier] 4 */}
        <div
          className="flex items-center justify-center gap-1.5 text-[clamp(64px,16vw,104px)] font-extrabold leading-none tracking-[-2px] text-[#2b2b2b] dark:text-white"
          aria-label="404"
        >
          <span>4</span>
          <span className="grid h-[0.78em] w-[0.78em] animate-[spin_6s_linear_infinite] place-items-center rounded-full bg-[#ffc800a8] motion-reduce:animate-none">
            <svg
              viewBox="0 0 24 24"
              className="h-[62%] w-[62%]"
              fill="none"
              stroke="#fff"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-4-4" />
            </svg>
          </span>
          <span>4</span>
        </div>

        {/* illustration */}
        <div className="relative mx-auto mt-1.5 h-[170px]">
          <svg
            viewBox="0 0 400 170"
            className="h-full overflow-visible"
            role="img"
            aria-label="Empty shopping cart with a magnifying glass"
          >
            <ellipse cx="170" cy="158" rx="90" ry="8" fill="#ffc800a8" opacity=".5" />

            <g className="animate-[float_3.2s_ease-in-out_infinite] motion-reduce:animate-none">
              <path
                d="M90 40h28l22 78h96l20-56H126"
                fill="#fff"
                stroke="#ffc800"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M132 62h110l-16 52H146z" fill="#ffc800a8" />
              <circle cx="156" cy="138" r="11" fill="#fff" stroke="#ffc800" strokeWidth="7" />
              <circle cx="226" cy="138" r="11" fill="#fff" stroke="#ffc800" strokeWidth="7" />
              <text
                x="186"
                y="104"
                textAnchor="middle"
                fontSize="40"
                fontWeight="800"
                fill="#fff"
                fontFamily="system-ui, sans-serif"
              >
                ?
              </text>
            </g>

            {/* falling price tags */}
            <g className="animate-[fall_4s_ease-in_infinite] motion-reduce:animate-none">
              <rect x="120" y="0" width="38" height="20" rx="6" fill="#ffc800a8" />
              <circle cx="130" cy="10" r="3" fill="#fff" />
            </g>
            <g className="animate-[fall_4s_ease-in_infinite] [animation-delay:1.3s] motion-reduce:animate-none">
              <rect x="200" y="-6" width="38" height="20" rx="6" fill="#ffc800a8" />
              <circle cx="210" cy="4" r="3" fill="#fff" />
            </g>
            <g className="animate-[fall_4s_ease-in_infinite] [animation-delay:2.6s] motion-reduce:animate-none">
              <rect x="160" y="-12" width="38" height="20" rx="6" fill="#ffc800a8" />
              <circle cx="170" cy="-2" r="3" fill="#fff" />
            </g>

            {/* searching magnifier */}
            <g className="animate-[search_3.5s_ease-in-out_infinite] [transform-origin:200px_60px] motion-reduce:animate-none">
              <circle cx="300" cy="62" r="30" fill="#ffffff55" stroke="#ffc800" strokeWidth="8" />
              <path d="M322 86l32 34" stroke="#ffc800" strokeWidth="12" strokeLinecap="round" />
              <path d="M286 52a18 18 0 0 1 14-9" stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" />
            </g>
          </svg>
        </div>

        <h1 className="mb-2 mt-3.5 text-[clamp(22px,5vw,28px)] font-semibold text-[#2b2b2b] dark:text-white">
          Oops! This product went missing
        </h1>
        <p className="mx-auto mb-[22px] max-w-[400px] leading-relaxed text-[#6b6b6b] dark:text-[#c9c3b3]">
          We looked on every shelf, but the item you want isn't here. It may be sold out, moved, or the link is
          broken.
        </p>

        {/* search */}
        <form onSubmit={handleSearch} className="mx-auto mb-[18px] flex max-w-[420px] gap-2">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for something else..."
            aria-label="Search products"
            className="min-w-0 flex-1 rounded-full border-2 border-[#ffc800a8] bg-white px-4 py-[13px] text-[#2b2b2b] outline-none focus:border-[#ffc800] dark:bg-[#1d1b16] dark:text-white"
          />
          <button type="submit" className={`${btn} bg-[#ffc800a8] hover:bg-[#ffc800]`}>
            Search
          </button>
        </form>

        {/* actions */}
        <div className="flex flex-wrap justify-center gap-2.5">
          <Link to="/" className={`${btn} bg-[#ffc800a8] hover:bg-[#ffc800]`}>
            Back to Shop
          </Link>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={`${btn} bg-transparent !text-[#2b2b2b] hover:bg-[#ffc800a8] dark:!text-white`}
          >
            Go Back
          </button>
        </div>

        {/* quick links */}
        <div className="mt-[22px] flex flex-wrap items-center justify-center gap-2 text-sm text-[#6b6b6b] dark:text-[#c9c3b3]">
          <span>Try:</span>
          {[
            ["Mens", "/mens"],
            ["Womens", "/womens"],
            ["New Arrivals", "/new-arrivals"],
          ].map(([label, to]) => (
            <Link
              key={to}
              to={to}
              className="rounded-full bg-[#ffc800a8] px-[13px] py-[5px] text-[#2b2b2b] no-underline hover:bg-[#ffc800] dark:text-white dark:hover:text-[#2b2b2b]"
            >
              {label}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductNotFound;