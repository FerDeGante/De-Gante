"use client";

import { LiquidNavbar, NimbusIcons } from "@/components/ui/liquid-glass-navbar";
import type { ActaContent } from "@/content/acta";
import styles from "@/app/(acta)/acta/acta.module.css";

export function ActaNavigation({
  navigation,
}: {
  navigation: ActaContent["navigation"];
}) {
  return (
    <LiquidNavbar
      tone="light"
      defaultActive={0}
      sound={false}
      ariaLabel={navigation.label}
      className={styles.liquidNav}
      items={navigation.items.map((item) => ({
        label: item.label,
        href: item.href,
        icon: NimbusIcons[item.icon],
        fx: "none",
      }))}
    />
  );
}
