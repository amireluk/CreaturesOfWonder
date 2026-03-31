const basePath = process.env.NODE_ENV === "production" ? "/CreaturesOfWonder" : "";

export function assetUrl(path: string): string {
  return `${basePath}${path}`;
}
