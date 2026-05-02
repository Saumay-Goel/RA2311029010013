import { useState, useEffect } from "react";
import { logInfo } from "../utils/logger";

export const useViewedNotifications = () => {
  const [viewedIds, setViewedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem("viewed_notifications");
    if (stored) {
      const parsed = JSON.parse(stored) as string[];
      setTimeout(() => {
        setViewedIds(new Set(parsed));
      }, 0);
    }
  }, []);

  const markAsViewed = (id: string) => {
    setViewedIds((prev) => {
      if (prev.has(id)) return prev;
      const newSet = new Set(prev);
      newSet.add(id);
      localStorage.setItem(
        "viewed_notifications",
        JSON.stringify(Array.from(newSet)),
      );
      logInfo("hook", `Marked notification ${id} as viewed`); // ✅ "hook"
      return newSet;
    });
  };

  return { viewedIds, markAsViewed };
};
