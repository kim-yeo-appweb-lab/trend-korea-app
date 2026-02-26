import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	test: {
		environment: "happy-dom",
		setupFiles: ["./src/test/setup.ts"],
		include: ["src/**/*.test.{ts,tsx}"],
		passWithNoTests: true,
		coverage: {
			provider: "v8",
			include: ["src/**/*.{ts,tsx}"],
			exclude: ["src/test/**", "src/**/*.d.ts", "src/app/**/*.tsx"]
		}
	}
});
