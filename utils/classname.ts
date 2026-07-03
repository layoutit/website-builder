export function classname(
  ...args: (string | boolean | undefined | null)[]
): string {
  return args.filter((x) => x).join(" ");
}
