"use client";

import Image from "next/image";

interface BannerImageProps {
  src: string;
  height: number;
  width: number;
  alt: string;
}

export function BannerImage({ src, height, width, alt }: BannerImageProps) {
  return (
    <div className="w-full mb-8">
      <Image
        src={src}
        height={height}
        width={width}
        alt={alt}
        className="w-full h-auto rounded-lg"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
