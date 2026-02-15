import "../src/app/globals.css";

import type { Preview } from "@storybook/nextjs-vite";
import { useEffect } from "react";

import { ThemeProvider } from "../src/shared/lib/ThemeContext";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},

		a11y: {
			test: "todo"
		},

		backgrounds: {
			default: "light",
			values: [
				{ name: "light", value: "#fafafa" },
				{ name: "dark", value: "#0a0a0a" }
			]
		},

		docs: {
			toc: true
		}
	},

	decorators: [
		(Story, context) => {
			const theme = context.globals.backgrounds?.value === "#0a0a0a" ? "dark" : "light";

			// 스토리북 테마에 맞춰 data-theme 속성 설정
			useEffect(() => {
				document.documentElement.setAttribute("data-theme", theme);
				document.documentElement.style.colorScheme = theme;
			}, [theme]);

			return (
				<ThemeProvider>
					<Story />
				</ThemeProvider>
			);
		}
	]
};

export default preview;
