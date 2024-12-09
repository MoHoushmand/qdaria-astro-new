// components/ProductTabs.tsx
'use client';

import React from 'react';

interface Tab {
  id: string;
  label: string;
}

interface ProductTabsProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

export const ProductTabs: React.FC<ProductTabsProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center space-x-4 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 rounded-md transition-colors duration-300 ${
            activeTab === tab.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};