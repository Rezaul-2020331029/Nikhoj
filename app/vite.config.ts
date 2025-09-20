// vite.config.ts
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import react from "@vitejs/plugin-react-swc";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve("./src"),
		},
	},
	plugins: [
		// Please make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
		tailwindcss(),
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
		}),
		react(),
		babel({
			babelConfig: {
				plugins: ["babel-plugin-react-compiler"],
			},
		}),
		// ...,
	],
});
