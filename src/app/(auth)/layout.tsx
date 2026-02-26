import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type ReactNode } from "react";

export default async function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
	const cookieStore = await cookies();
	const hasAccessToken = cookieStore.has("access_token");

	if (hasAccessToken) {
		redirect("/");
	}

	return (
		<div className="bg-bg flex min-h-screen items-center justify-center px-4">
			<div className="w-full max-w-md">{children}</div>
		</div>
	);
}
