import { createContext, useContext, useState, useEffect } from "react";

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  // Initialize state from localStorage immediately
    const [watchlist, setWatchlist] = useState(() => {
        try {
        const stored = localStorage.getItem("watchlist");
        return stored ? JSON.parse(stored) : [];
        } catch {
        return [];
        }
    });

    // Save watchlist to localStorage whenever it changes
    useEffect(() => {
        try {
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        } catch (err) {
        console.error("Failed to save watchlist:", err);
        }
    }, [watchlist]);

    const addToWatchlist = (movie) => {
        setWatchlist((prev) => {
        if (!prev.some((m) => m.id === movie.id)) {
            return [...prev, movie];
        }
        return prev;
        });
    };

    const removeWatchlist = (id) => {
        setWatchlist((prev) => prev.filter((m) => m.id !== id));
    };

    return (
        <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeWatchlist }}>
        {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlist = () => useContext(WatchlistContext);
