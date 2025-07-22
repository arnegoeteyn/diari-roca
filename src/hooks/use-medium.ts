import * as React from "react";

const MEDIUM_BREAKPOINT = 1200;

export function useIsMedium() {
  const [isMedium, setIsMedium] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MEDIUM_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMedium(window.innerWidth < MEDIUM_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMedium(window.innerWidth < MEDIUM_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMedium;
}
