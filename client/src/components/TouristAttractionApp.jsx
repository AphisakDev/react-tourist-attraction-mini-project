import React, { useState, useEffect } from "react";
import SkeletonCard from "./SkeletonCard";
import TripCard from "./TripCard";
import SearchBar from "./SearchBar";

function TouristAttractionApp() {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Sync theme with HTML class list and localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Debounce search input text
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  // Fetch trips from API when debounced value changes
  useEffect(() => {
    let active = true;

    async function loadTrips() {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:4001/trips?keywords=${encodeURIComponent(debouncedSearchText)}`
        );
        if (!response.ok) {
          throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูลจากเซิร์ฟเวอร์");
        }
        const data = await response.json();
        if (active) {
          setTrips(data.data || []);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err.message);
          setTrips([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadTrips();

    return () => {
      active = false;
    };
  }, [debouncedSearchText]);

  // Click tag to search (append and prevent duplicates)
  const handleTagClick = (tag) => {
    const currentText = searchText.trim();
    const keywords = currentText === "" ? [] : currentText.split(/\s+/);
    if (!keywords.includes(tag)) {
      keywords.push(tag);
    }
    setSearchText(keywords.join(" "));
  };

  // Copy link to clipboard and show toast
  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url)
      .then(() => {
        setToast({ show: true, message: "คัดลอกลิงก์สำเร็จแล้ว!" });
        setTimeout(() => {
          setToast({ show: false, message: "" });
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy link:", err);
      });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative">
      {/* Dark Mode Toggle Button */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="absolute top-6 right-6 p-3 rounded-full bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 flex items-center justify-center w-12 h-12 active:scale-95 hover:bg-slate-50 dark:hover:bg-slate-800"
        title={isDarkMode ? "เปลี่ยนเป็นโหมดสว่าง" : "เปลี่ยนเป็นโหมดมืด"}
      >
        {isDarkMode ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-amber-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m0 13.5V21M4.22 4.22l1.58 1.58m12.42 12.42 1.58 1.58M3 12h2.25m13.5 0H21M4.22 19.78l1.58-1.58m12.42-12.42 1.58-1.58M12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-indigo-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
        )}
      </button>

      {/* Container */}
      <div className="max-w-6xl mx-auto">
        {/* Title Header */}
        <header className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-bold text-sky-500 tracking-tight mb-4">
            เที่ยวไหนดี
          </h1>
        </header>

        {/* Search Box */}
        <SearchBar
          value={searchText}
          onChange={setSearchText}
          onClear={() => setSearchText("")}
        />

        {/* Content list */}
        <main>
          {loading ? (
            // Render loading skeletons
            Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          ) : error ? (
            // Render error state
            <div className="text-center py-12">
              <p className="text-red-500 font-medium">{error}</p>
              <button
                onClick={() => setSearchText(searchText)}
                className="mt-4 px-4 py-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
              >
                ลองใหม่อีกครั้ง
              </button>
            </div>
          ) : trips.length > 0 ? (
            // Render trip list
            trips.map((trip) => (
              <TripCard
                key={trip.eid}
                trip={trip}
                onTagClick={handleTagClick}
                onCopyLink={handleCopyLink}
              />
            ))
          ) : (
            // Empty results
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 text-slate-300 mx-auto mb-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z"
                />
              </svg>
              <p className="text-slate-500 font-medium">ไม่พบสถานที่ท่องเที่ยวที่คุณค้นหา</p>
              <p className="text-slate-400 text-sm mt-1">ลองเปลี่ยนคำค้นหาใหม่ หรือคลิกที่แท็กหมวดหมู่ยอดนิยมด้านบน</p>
            </div>
          )}
        </main>
      </div>

      {/* Floating Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 backdrop-blur-md text-white text-sm px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-bounce-short">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4 text-emerald-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
          <span className="font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
}

export default TouristAttractionApp;
