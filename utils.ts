export function assertHTMLElement<T extends Element>(
  element: string,
  root: HTMLElement
): T {
  const elem = root.querySelector<T>(element);
  if (elem) return elem;
  throw new Error("Not an HTMLElement");
}

export function unreachable(param: never) {
  throw new Error(param);
}
