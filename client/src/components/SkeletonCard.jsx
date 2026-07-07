import React from "react";

function SkeletonCard() {
  return (
    <div className="flex flex-col md:flex-row gap-8 bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-10 shadow-md md:shadow-lg dark:shadow-none border border-slate-100 dark:border-slate-800 mb-10 animate-pulse">
      <div className="w-full md:w-[420px] shrink-0 h-[300px] bg-slate-200 dark:bg-slate-800 rounded-3xl"></div>
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-3/4 mb-4"></div>
          <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-full mb-3"></div>
          <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-5/6 mb-4"></div>
          <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-1/2 mb-6"></div>
          <div className="flex gap-4">
            <div className="w-24 h-24 md:w-28 md:h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
            <div className="w-24 h-24 md:w-28 md:h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
            <div className="w-24 h-24 md:w-28 md:h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;
