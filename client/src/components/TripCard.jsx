import React, { useState, useEffect } from "react";

function TripCard({ trip, onTagClick, onCopyLink }) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Keep active photo index in sync if the trip data changes
  useEffect(() => {
    setActivePhotoIndex(0);
  }, [trip]);

  const activePhoto = trip.photos[activePhotoIndex] || trip.photos[0];

  // The small preview photos are the ones whose indices are not the current active index
  const previewPhotos = trip.photos
    .map((photo, index) => ({ photo, index }))
    .filter((item) => item.index !== activePhotoIndex);

  return (
    <div className="relative flex flex-col md:flex-row gap-8 bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-10 shadow-md md:shadow-lg dark:shadow-none hover:shadow-2xl transition-all duration-300 border border-slate-100/50 dark:border-slate-800/80 mb-10">
      {/* Left Column: Main Image */}
      <div className="w-full md:w-[420px] shrink-0 relative overflow-hidden rounded-3xl group">
        <a href={trip.url} target="_blank" rel="noopener noreferrer">
          <img
            src={activePhoto}
            alt={trip.title}
            className="w-full h-[300px] object-cover rounded-3xl transition-transform duration-500 group-hover:scale-105"
          />
        </a>
      </div>

      {/* Right Column: Content */}
      <div className="flex flex-col justify-between flex-grow pr-0 md:pr-20">
        <div>
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-200 leading-snug">
            <a href={trip.url} target="_blank" rel="noopener noreferrer">
              {trip.title}
            </a>
          </h2>

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg mt-4 leading-relaxed">
            {trip.description.slice(0, 100)}...
            <a
              href={trip.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-300 underline font-semibold ml-1 transition-colors"
            >
              อ่านต่อ
            </a>
          </p>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap items-center text-base md:text-lg">
            <span className="text-slate-400 dark:text-slate-500">หมวด</span>
            <div className="flex flex-wrap items-center ml-1 text-slate-600 dark:text-slate-300 font-semibold">
              {trip.tags.map((tag, idx) => {
                const isLast = idx === trip.tags.length - 1;
                const isSecondToLast = idx === trip.tags.length - 2;
                return (
                  <span key={tag} className="inline-flex items-center">
                    <button
                      onClick={() => onTagClick(tag)}
                      className="text-slate-600 dark:text-slate-300 underline decoration-slate-300 dark:decoration-slate-700 hover:text-sky-500 dark:hover:text-sky-400 hover:decoration-sky-500 dark:hover:decoration-sky-400 transition-all cursor-pointer mx-1"
                    >
                      {tag}
                    </button>
                    {isSecondToLast ? (
                      <span className="text-slate-400 dark:text-slate-500 mx-1">และ</span>
                    ) : !isLast ? (
                      <span className="text-slate-400 dark:text-slate-500 mr-1"></span>
                    ) : null}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Small Previews */}
          <div className="flex gap-4 mt-6">
            {previewPhotos.map(({ photo, index }) => (
              <img
                key={index}
                src={photo}
                alt={`Preview ${index + 1}`}
                onClick={() => setActivePhotoIndex(index)}
                className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-2xl cursor-pointer hover:scale-[1.03] active:scale-95 transition-all duration-200 border border-slate-100 dark:border-slate-800 hover:shadow-sm"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Copy Link Button */}
      <div className="absolute bottom-8 right-8">
        <button
          onClick={() => onCopyLink(trip.url)}
          className="p-3 border border-sky-200 dark:border-sky-800/80 text-sky-500 dark:text-sky-400 rounded-full hover:bg-sky-50 dark:hover:bg-sky-950/50 hover:border-sky-300 dark:hover:border-sky-600 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center w-14 h-14 hover:shadow-md bg-white dark:bg-slate-900"
          title="คัดลอกลิงก์"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 rotate-45"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TripCard;
