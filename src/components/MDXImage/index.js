import React from 'react';
import OptimizedImage from '../OptimizedImage';

export default function MDXImage({src, alt, title, ...props}) {
  // If the src is a relative path starting with ../static, convert it
  const imageSrc = src.startsWith('../static/') 
    ? src.replace('../static/', '/') 
    : src;
  
  return (
    <OptimizedImage 
      src={imageSrc}
      alt={alt}
      title={title}
      {...props}
    />
  );
}