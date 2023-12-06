export default function withCommas(p: number) {
  if (!p) return "0";
  const price = p.toString()?.replace(",", "");
  return Math.round(Number(price))
    .toString()
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
