export function getFood() {
  let x = Math.floor(Math.random() * 96);
  let y = Math.floor(Math.random() * 96);
  x = x - (x % 4);
  y = y - (y % 4);
  return { x, y };
}
