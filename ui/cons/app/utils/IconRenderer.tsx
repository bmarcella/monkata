import React from 'react';
import * as icons from 'lucide-react';

interface IconRendererProps {
  iconName: string;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ iconName }) => {
  const IconComponent = icons[iconName];

  if (!IconComponent) {
    return <span>Icon not found</span>;
  }

  return <IconComponent />;
};

