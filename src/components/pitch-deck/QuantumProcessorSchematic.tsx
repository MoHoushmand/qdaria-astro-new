// components/QuantumProcessorSchematic.tsx
'use client';

import React from 'react';
import Image from 'next/image'; // or the correct path to your Image component

// If Image is a custom component, ensure it accepts props
const ImageComponent = (props: { src: string; alt: string; className: string }) => {
    const { alt, ...rest } = props;
    return <Image {...rest} alt={alt || ''} layout="responsive" />;
};

export const QuantumProcessorSchematic: React.FC = () => {
  return (
    <div className="relative group">
        <ImageComponent
         src="/Non-Abelian-Braiding.png"
         alt="Non Abelian Braiding"
         className="w-32 h-32 rounded-full mx-auto mb-4"
         // Removed width and height props
    />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
        <p className="text-white text-center text-sm">
          Advanced topological qubit architecture for optimal performance and scalability
        </p>
      </div>
    </div>
  );
};