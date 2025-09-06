import React from 'react';
import Image from '@theme/IdealImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function OptimizedImage({src, alt, ...props}) {
  const imageSrc = useBaseUrl(src);
  
  // Check if the image is a GIF or SVG (don't optimize these)
  if (src.endsWith('.gif') || src.endsWith('.svg')) {
    return (
      <img 
        src={imageSrc} 
        alt={alt} 
        loading="lazy"
        {...props}
      />
    );
  }
  
  // Use IdealImage for other formats (PNG, JPG, etc.)
  return (
    <Image 
      img={src} 
      alt={alt}
      {...props}
    />
  );
}