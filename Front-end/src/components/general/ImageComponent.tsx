import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


interface ImageProps {
  alt: string;
  src: string;
  caption: string;
  width?: number;
  height?: number;
}

const ImageComponent: React.FC<{ image: ImageProps }> = ({ image }) => (
  <LazyLoadImage
    src={image.src}  // Normal image source
    alt={image.alt}
    height={image.height}
    width={image.width}
    effect="blur"  // Apply blur effect until the image is fully loaded
    placeholderSrc={image.src}
  />

);

export default ImageComponent;