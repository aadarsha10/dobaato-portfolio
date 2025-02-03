import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
	isDark: boolean;
	toggleTheme: () => void;
}

// Create a default value for the context
const defaultThemeContextValue: ThemeContextType = {
	isDark: false, // Default to light mode
	toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultThemeContextValue);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [isDark, setIsDark] = useState(
		() => localStorage.getItem("theme") === "dark"
	);

	useEffect(() => {
		document.documentElement.setAttribute(
			"class",
			isDark ? "dark" : "light"
		);
		document.documentElement.setAttribute(
			"data-theme",
			isDark ? "dark" : "light"
		);
		localStorage.setItem("theme", isDark ? "dark" : "light");
	}, [isDark]);

	const toggleTheme = () => {
		setIsDark((prev) => !prev);
	};

	return (
		<ThemeContext.Provider value={{ isDark, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
