import AddLinkIcon from "~/features/kouki/add/link-icon";
import HeaderTab from "~/features/kouki/common/header/tab";
import SettingLinkIcon from "~/features/kouki/setting/link-icon";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<HeaderTab />
			<SettingLinkIcon />
			<AddLinkIcon />
			{children}
		</>
	);
}
