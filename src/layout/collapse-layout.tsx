import { AppShell, Burger, Group, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowUp, IconSettings, IconWorld } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";

export function CollapseLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const location = useLocation();

  const isActive = (base: string) =>
    location.pathname === `/${base}` ||
    location.pathname.startsWith(`/${base}/`);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLink
          component={Link}
          to="routes"
          label="Routes"
          leftSection={<IconArrowUp />}
          active={isActive("routes")}
        />
        <NavLink
          component={Link}
          to="areas"
          label="Areas"
          leftSection={<IconWorld />}
          active={isActive("areas")}
        />
        <NavLink
          component={Link}
          to="settings"
          label="Settings"
          leftSection={<IconSettings />}
          active={isActive("settings")}
        />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
