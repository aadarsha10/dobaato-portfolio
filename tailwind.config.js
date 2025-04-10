/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "selector",
	theme: {
		extend: {
			animation: {
				marquee: "marquee var(--duration, 30s) linear infinite",
			},
			keyframes: {
				marquee: {
					to: { transform: "translateX(-50%)" },
				},
			},
			colors: {
				primary: {
					50: "#f0f9ff",
					100: "#e0f2fe",
					200: "#bae6fd",
					300: "#7dd3fc",
					400: "#38bdf8",
					500: "#0A45EC",
					600: "#0284c7",
					700: "#0369a1",
					800: "#075985",
					900: "#0c4a6e",
					1000: "#0A45EC",
				},
				dark: {
					100: "#1E1E1E",
					200: "#171717",
					300: "#121212",
				},
				green: {
					1000: "#1976D2",
				},
				"custom-blue-start": "#a1c4fd",
				"custom-blue-end": "#c2e9fb",
			},
			fontFamily: {
				sans: ["Inter", "sans-serif"],
			},
		},
	},
	plugins: [
		function ({ addUtilities }) {
			addUtilities({
				".fade-after::after": {
					content: "''",
					position: "absolute",
					bottom: "0",
					left: "0",
					right: "0",
					height: "40px",
					background: "linear-gradient(to top, #F5F6FA, transparent)",
					pointerEvents: "none",
				},
				".fade-dark-after::after": {
					content: "''",
					position: "absolute",
					bottom: "0",
					left: "0",
					right: "0",
					height: "40px",
					background:
						"linear-gradient(to top, #10172A, transparent) !important",
					pointerEvents: "none",
				},
			});
		},
	],
};
