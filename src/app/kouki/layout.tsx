import { Container } from "@mantine/core";
import HeaderTab from "~/features/kouki/common/header/tab";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container p={20} size="lg">
      <HeaderTab />
      {children}
    </Container>
  );
}
