import { type Meta, type StoryObj } from "@storybook/nextjs-vite";

import { ThemeProvider } from "../lib/ThemeContext";
import { ThemeToggle } from "./ThemeToggle";

const meta = {
	title: "Shared/ThemeToggle",
	component: ThemeToggle,
	decorators: [
		(Story) => (
			<ThemeProvider>
				<Story />
			</ThemeProvider>
		)
	]
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
