import React from 'react';

interface QuantumCardProps {
  title: string;
  description: string;
  icon: string;
}

const QuantumCard: React.FC<QuantumCardProps> = ({ title, description, icon }) => {
  return (
    <div className="relative flex flex-col gap-6 p-6">
      <dt className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500/10">
          <img 
            src={`/public/icons/tabler/${icon}.svg`} 
            alt={title}
            className="h-8 w-8 text-primary-500"
          />
        </div>
        <h3 className="text-xl font-semibold leading-7 text-base-200">{title}</h3>
      </dt>
      <dd className="text-base leading-7 text-base-400">{description}</dd>
    </div>
  );
};

export default QuantumCard;
