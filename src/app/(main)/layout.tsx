import { Footer, Header } from "../../shared/layouts";

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="bg-bg flex min-h-screen flex-col">
			<Header />
			<main className="flex-1">{children}</main>
			<Footer />
		</div>
	);
}
