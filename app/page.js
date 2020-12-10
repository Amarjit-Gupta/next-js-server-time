"use client";

import { useEffect, useState } from "react";

const Home = () => {
  const [time, setTime] = useState("");  // Display string
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let serverTime = 0;
    let tickInterval;
    let syncInterval;

    // Function to fetch server time
    const fetchServerTime = async () => {
      try {
        const res = await fetch("/api/current", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch server time");
        const data = await res.json();

        serverTime = data.timestamp;

        // Update display immediately
        setTime(
          new Date(serverTime).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          })
        );
        setLoading(false);
        setError("");
      } catch (err) {
        console.error("Time fetch error:", err);
        setError("Could not fetch server time");
        setLoading(false);
      }
    };

    // Initial fetch
    fetchServerTime();

    // Tick every second
    tickInterval = setInterval(() => {
      if (serverTime) {
        serverTime += 1000; // increment 1 second
        setTime(
          new Date(serverTime).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          })
        );
      }
    }, 1000);

    // Auto-sync with server every 5 minutes (300000 ms)
    syncInterval = setInterval(() => {
      fetchServerTime();
    }, 300000);

    // Cleanup on component unmount
    return () => {
      clearInterval(tickInterval);
      clearInterval(syncInterval);
    };
  }, []);

  if (loading) return <p>Loading current time...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Current IST Time:</h2>
      <p>{time}</p>
    </div>
  );
};

export default Home;
