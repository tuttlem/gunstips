
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="glass p-6 rounded-xl hover-scale">
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gold-100 text-gold-500 mb-5">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold text-navy-900 mb-3">{title}</h3>
      <p className="text-navy-700">{description}</p>
    </div>
  );
};

export default FeatureCard;
