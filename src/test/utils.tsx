import { render, type RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type ReactElement, type ReactNode } from "react";

import { AuthProvider } from "../features/auth/model/AuthContext";
import { type User } from "../features/auth/model/types";

type CustomRenderOptions = RenderOptions & {
	initialUser?: User | null;
};

const createWrapper = (initialUser: User | null = null) => {
	const Wrapper = ({ children }: { children: ReactNode }) => (
		<AuthProvider initialUser={initialUser}>{children}</AuthProvider>
	);
	Wrapper.displayName = "TestWrapper";
	return Wrapper;
};

const customRender = (ui: ReactElement, options: CustomRenderOptions = {}) => {
	const { initialUser = null, ...renderOptions } = options;
	return render(ui, { wrapper: createWrapper(initialUser), ...renderOptions });
};

export { customRender as render, userEvent };
