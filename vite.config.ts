import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss(), svgr()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	preview: {
		allowedHosts: true,
		port: 4200,
		host: true,
		cors: true,
	},
	server: {
		allowedHosts: true,
		host: true,
		port: 4200,
		cors: true,
	},
});
