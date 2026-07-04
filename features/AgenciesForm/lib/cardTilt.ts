import type { MouseEvent } from "react";

// Max rotation (in degrees) the card tilts toward the cursor.
const MAX_TILT = 8;

/**
 * Pointer-tracking 3D tilt used by the General-tab metric cards, shared so
 * every card/panel across the agency tabs animates identically.
 * Spread {...tiltHandlers} onto any card element and give it the tilt CSS
 * (see the `.metricCard` / `.panel` rules in the tab stylesheets).
 */
export function handleCardMove(event: MouseEvent<HTMLElement>) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const px = (event.clientX - rect.left) / rect.width;
  const py = (event.clientY - rect.top) / rect.height;
  const rotateY = (px - 0.5) * 2 * MAX_TILT;
  const rotateX = (0.5 - py) * 2 * MAX_TILT;
  card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
}

export function handleCardLeave(event: MouseEvent<HTMLElement>) {
  event.currentTarget.style.transform =
    "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
}

/** Convenience: spread onto a JSX element to enable the tilt. */
export const tiltHandlers = {
  onMouseMove: handleCardMove,
  onMouseLeave: handleCardLeave,
};
