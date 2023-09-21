import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ImageSkeleton = ({ card }) => {
  return (
    <div>
      {new Array(card).fill(null).map((i) => (
        <Skeleton width='100%' height='100%' />
      ))}
    </div>
  );
};

export default ImageSkeleton;
