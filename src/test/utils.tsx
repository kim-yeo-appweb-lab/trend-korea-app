import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, type RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type ReactElement, type ReactNode } from "react";

import { authQueries } from "../features/auth/model/queries";
import { type User } from "../features/auth/model/types";

type CustomRenderOptions = RenderOptions & {
	initialUser?: User | null;
};

const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: { retry: false },
			mutations: { retry: false }
		}
	});

const createWrapper = (initialUser: User | null = null) => {
	const queryClient = createTestQueryClient();

	if (initialUser) {
		queryClient.setQueryData(authQueries.currentUser().queryKey, initialUser);
	}

	const Wrapper = ({ children }: { children: ReactNode }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
	Wrapper.displayName = "TestWrapper";
	return Wrapper;
};

const customRender = (ui: ReactElement, options: CustomRenderOptions = {}) => {
	const { initialUser = null, ...renderOptions } = options;
	return render(ui, { wrapper: createWrapper(initialUser), ...renderOptions });
};

export { customRender as render, userEvent };
