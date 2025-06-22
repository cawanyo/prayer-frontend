import { useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";

const AUTO_LOGOUT_MINUTES = 15;

export const useIdleLogout = () => {
  const auth = useAuth();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      auth?.logout();
    }, AUTO_LOGOUT_MINUTES * 60 * 1000); // 15 minutes
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "mousedown", "touchstart"];

    events.forEach(event =>
      window.addEventListener(event, resetTimer, { passive: true })
    );

    resetTimer(); // start on mount

    return () => {
      events.forEach(event =>
        window.removeEventListener(event, resetTimer)
      );
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
};
