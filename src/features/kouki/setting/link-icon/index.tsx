import Link from "next/link";
import styles from "./link-icon.module.css";
import { IconSettings } from "@tabler/icons-react";

export default function SettingLinkIcon() {
	return (
		<Link href="/kouki/settings" className={styles.icon}>
			<IconSettings stroke={2} size={30} />
		</Link>
	);
}
