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
    <div
      className={`w-[${width}px] h-[${height}px] mb-8 rounded-lg overflow-hidden`}
    >
      <Image
        src={src}
        alt={alt}
        // style={{ objectFit: "cover" }}
        height={height}
        width={width}
        className="!h-[200px] object-cover w-full rounded-lg"
        priority
      />
    </div>
  );
}
