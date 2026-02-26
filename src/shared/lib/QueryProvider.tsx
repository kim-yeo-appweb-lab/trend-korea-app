"use client";

import { type DehydratedState, HydrationBoundary, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type PropsWithChildren, useState } from "react";

import { makeQueryClient } from "./makeQueryClient";

let browserQueryClient: ReturnType<typeof makeQueryClient> | undefined;

const getQueryClient = () => {
	if (typeof window === "undefined") return makeQueryClient();
	if (!browserQueryClient) browserQueryClient = makeQueryClient();
	return browserQueryClient;
};

export const QueryProvider = ({
	children,
	dehydratedState
}: PropsWithChildren<{ dehydratedState?: DehydratedState }>) => {
	const [queryClient] = useState(getQueryClient);

	return (
		<QueryClientProvider client={queryClient}>
			<HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};
