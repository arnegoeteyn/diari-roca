import Actions from "@/components/actions/actions";
import { isActive } from "@/util";
import { AppShell, Burger, Group, NavLink, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ArrowUp, Globe, Settings, Zap } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

export function CollapseLayout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const location = useLocation();

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
        <AppShell.Section>
          <Title order={4}>Navigation</Title>
          <NavLink
            component={Link}
            to="routes"
            label="Routes"
            leftSection={<ArrowUp />}
            active={isActive(location.pathname, "routes")}
          />
          <NavLink
            component={Link}
            to="ascents"
            label="Ascents"
            leftSection={<Zap />}
            active={isActive(location.pathname, "ascents")}
          />
          <NavLink
            component={Link}
            to="areas"
            label="Areas"
            leftSection={<Globe />}
            active={isActive(location.pathname, "areas")}
          />
          <NavLink
            component={Link}
            to="settings"
            label="Settings"
            leftSection={<Settings />}
            active={isActive(location.pathname, "settings")}
          />
        </AppShell.Section>
        <AppShell.Section>
          <Title order={4}>Actions</Title>
          <Actions location={location.pathname} />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
