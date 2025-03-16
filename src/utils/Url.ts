export function replaceUrlParams(
  url: string,
  params: { [key: string]: string }
): string {
  for (const paramName in params) {
    const regex = new RegExp(`:${paramName}`, "g");
    url = url.replace(regex, params[paramName]);
  }

  return url;
}
