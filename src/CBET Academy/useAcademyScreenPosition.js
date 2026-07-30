import { useEffect } from "react";

const SCREEN_TARGETS = {
  dashboard: "cbet-academy-top",
  hospital: "cbet-hospital-map",
  serviceCall1048: "service-call-top",
  serviceCall1052: "service-call-top",
  mission1: "mission-1-active",
  equipmentLearning: "equipment-learning-center",
};

const SELF_POSITIONED_SCREENS = new Set([
    "mission2",
    "mission3",
    "certificates"
]);

function scrollToTarget(id) {
  const target = document.getElementById(id);
  if (!target) return false;

  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const headerOffset = 18;
  const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;

  window.scrollTo({
    top: Math.max(0, top),
    left: 0,
    behavior: reduceMotion ? "auto" : "smooth",
  });

  return true;
}

/**
 * Keeps top-level Academy screens positioned consistently after React renders.
 * Mission 2 and Mission 3 retain their own internal step-scrolling behavior.
 */
export default function useAcademyScreenPosition(screen) {
  useEffect(() => {
    const previousScrollRestoration =
      "scrollRestoration" in window.history
        ? window.history.scrollRestoration
        : null;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const positionScreen = () => {
      if (SELF_POSITIONED_SCREENS.has(screen)) return;

      const targetId = SCREEN_TARGETS[screen];
      if (targetId && scrollToTarget(targetId)) return;

      // Mission 1 may briefly render before its active target is mounted.
      if (screen === "mission1") return;

      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    positionScreen();
    const timers = [0, 60, 180, 420, 850].map((delay) =>
      window.setTimeout(positionScreen, delay)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      if (
        previousScrollRestoration !== null &&
        "scrollRestoration" in window.history
      ) {
        window.history.scrollRestoration = previousScrollRestoration;
      }
    };
  }, [screen]);
}
