// next/image does not add basePath to unoptimized sources, so do it here.
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`
