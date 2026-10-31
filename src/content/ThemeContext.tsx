"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type ThemeContextType = {
  themeColor: string;
  setThemeColor: (color: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeColor, setThemeColor] = useState("teal"); 

  useEffect(() => {
    // লোকালস্টোরেজ থেকে সেভ করা থিম লোড করা
    const savedTheme = localStorage.getItem("app-theme");
    if (savedTheme) {
      setThemeColor(savedTheme);
    }
  }, []);

  const changeTheme = (color: string) => {
    setThemeColor(color);
    localStorage.setItem("app-theme", color);
  };

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor: changeTheme }}>
      <div data-theme={themeColor} className={`theme-${themeColor} w-full min-h-screen`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};