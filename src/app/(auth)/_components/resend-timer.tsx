"use client";

import React from "react";
import { useEffect, useState } from "react";
import useForget from "../forget/_hooks/use-forget";

export default function ResendCode() {
  // State
  const [timeLeft, setTimeLeft] = useState(60);
  const { forget } = useForget();
  useEffect(() => {
    // Decrease timer every 1s until it reaches 0
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  // Function
  const handleResend = () => {
    const email = localStorage.getItem("email");
    if (email) {
      forget({ email });
    }
    setTimeLeft(60);
  };

  return (
    <span className="text-sm text-gray-700">
      Didn’t receive the code?{" "}
      {timeLeft > 0 ? (
        <span className="text-gray-500">Resend in {timeLeft}s</span>
      ) : (
        <button
          onClick={handleResend}
          className="text-blue-600 font-medium underline"
        >
          Resend
        </button>
      )}
    </span>
  );
}
