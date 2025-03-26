
import React from 'react';

interface TestimonialCardProps {
  name: string;
  position: string;
  quote: string;
  image?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, position, quote, image }) => {
  return (
    <div className="glass p-6 rounded-xl h-full flex flex-col">
      <div className="mb-4">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.33333 21.3333C11.1743 21.3333 12.6667 19.841 12.6667 18C12.6667 16.159 11.1743 14.6667 9.33333 14.6667C7.49238 14.6667 6 16.159 6 18C6 19.841 7.49238 21.3333 9.33333 21.3333Z" fill="#F59E0B"/>
          <path d="M22.6667 21.3333C24.5076 21.3333 26 19.841 26 18C26 16.159 24.5076 14.6667 22.6667 14.6667C20.8257 14.6667 19.3333 16.159 19.3333 18C19.3333 19.841 20.8257 21.3333 22.6667 21.3333Z" fill="#F59E0B"/>
          <path d="M12.6667 18V14.6667C12.6667 11.7211 10.2789 9.33333 7.33333 9.33333" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M26 18V14.6667C26 11.7211 23.6122 9.33333 20.6667 9.33333" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <p className="text-gray-200 italic mb-6 flex-grow">{quote}</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-orange-400/20 overflow-hidden">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-orange-400/30 flex items-center justify-center">
              <span className="text-white text-sm font-medium">{name.charAt(0)}</span>
            </div>
          )}
        </div>
        <div>
          <h4 className="font-semibold text-white">{name}</h4>
          <p className="text-sm text-gray-400">{position}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
