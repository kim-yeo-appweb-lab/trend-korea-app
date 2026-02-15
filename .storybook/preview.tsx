import "../src/styles/globals.css";

import type { Preview } from "@storybook/nextjs-vite";
import { useEffect } from "react";

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

		docs: {
			toc: true
		}
	},

	globalTypes: {
		theme: {
			description: "테마 전환",
			toolbar: {
				title: "Theme",
				icon: "circlehollow",
				items: [
					{ value: "light", icon: "sun", title: "Light" },
					{ value: "dark", icon: "moon", title: "Dark" }
				],
				dynamicTitle: true
			}
		}
	},

	initialGlobals: {
		theme: "light"
	},

	decorators: [
		(Story, context) => {
			const theme = context.globals.theme ?? "light";

			useEffect(() => {
				document.documentElement.setAttribute("data-theme", theme);
				document.documentElement.style.colorScheme = theme;

				// Storybook 본문 배경색 동기화
				document.body.style.backgroundColor = theme === "dark" ? "#0a0a0a" : "#fafafa";
			}, [theme]);

			return <Story />;
		}
	]
};

export default preview;
