import { Flex, Text } from "@mantine/core";
import Link from "next/link";
import { IconCirclePlus } from '@tabler/icons-react';
import styles from "./link-icon.module.css";

export default function AddLinkIcon() {
  return (
    <Link href="/kouki/add" className={styles.button}>
      <Flex justify="center" align="center" gap="xs">
        <IconCirclePlus stroke={2} />
        <Text size="lg">Add</Text>
      </Flex>
    </Link>
  );
}
