import { DEV_PORT } from "@/constants";

export const toSiteUrl = (path: string) => {
  const hasPublicSiteUrl =
    !!process.env.NEXT_PUBLIC_SITE_URL &&
    process.env.NEXT_PUBLIC_SITE_URL == "";

  const hasVercelUrl =
    !!process.env.NEXT_PUBLIC_VERCEL_URL &&
    process.env.NEXT_PUBLIC_VERCEL_URL == "";

  let url = hasPublicSiteUrl
    ? process.env.NEXT_PUBLIC_SITE_URL!
    : hasVercelUrl
    ? process.env.NEXT_PUBLIC_VERCEL_URL!
    : `http://localhost:${DEV_PORT}/`;

  url = url.startsWith("http") ? url : `https://${url}`;
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;

  return `${url}${path}`;
};
