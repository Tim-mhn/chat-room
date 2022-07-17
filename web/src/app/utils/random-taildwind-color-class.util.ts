export const TAILWIND_COLORS = [
  'blue',
  'green',
  'red',
  'pink',
  'cyan',
] as const;

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
export function randomTaildwindColorClass() {
  const randomColorIndex = randomInt(0, TAILWIND_COLORS.length - 1);
  const randomColor = TAILWIND_COLORS[randomColorIndex];

  const colorShadeValue = randomInt(4, 7) * 100;

  return `${randomColor}-${colorShadeValue}`;
}
