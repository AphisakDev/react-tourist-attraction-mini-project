import React from "react";

function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="relative w-full max-w-3xl mx-auto mb-16">
      <label className="block text-slate-600 dark:text-slate-400 text-lg font-medium mb-3 text-center">
        ค้นหาที่เที่ยว
      </label>
      <div className="relative border-b-2 border-slate-200 dark:border-slate-800 focus-within:border-sky-400 dark:focus-within:border-sky-500 transition-colors duration-200 pb-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
          className="w-full text-center text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-700 bg-transparent outline-none py-1 text-2xl"
        />
        {value && (
          <button
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 cursor-pointer"
            title="ล้างคำค้นหา"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
