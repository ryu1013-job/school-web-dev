import { Container } from "@mantine/core";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Container p={20} size="lg">
			{children}
		</Container>
	);
}
