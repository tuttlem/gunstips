
import React, { useEffect, useRef } from 'react';
import Button from './Button';

const HeroSection = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const children = elementRef.current?.children;
    if (children) {
      Array.from(children).forEach((child) => {
        observer.observe(child);
        child.classList.add('opacity-0');
      });
    }

    return () => {
      if (children) {
        Array.from(children).forEach((child) => {
          observer.unobserve(child);
        });
      }
    };
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-b from-white to-blue-50"
    >
      <div 
        className="absolute inset-0 z-0 opacity-10" 
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264.888-.14 1.652-1.1 2.862-2.88 3.24-5.03.38-2.16-.14-4.41-1.57-6.08-.14-.16-.29-.32-.44-.48C24.4 8.18 25.59 8 26.8 7.86c1.8-.27 3.35-.82 4.28-1.76.93-.94 1.05-1.77.98-2.94-.1-1.17-1.13-2.8-2.9-3.67-1.94-.95-4.05-1.06-6.08-.54-2.03.52-3.87 1.65-5.08 3.24-.58.77-1 1.66-1.25 2.58-.32 1.13-.3 2.28-.07 3.6.36 2.1.25 4.8-1.1 6.44-.15.18-.3.35-.47.5-.92.87-2 1.47-3.25 1.74-1.24.27-2.4.04-3.7-.4-2.53-.85-5.02-.4-6.65 1.1-1.58 1.43-2.2 3.8-1.66 6.5.1.6.3 1.2.57 1.77-.85-.07-1.72-.1-2.6-.1-1.5 0-2.96.13-4.36.37-1.37.22-2.73.58-3.8 1.1-.8.4-1.46.9-1.85 1.52-.38.6-.5 1.28-.27 2.05.36 1.27 1.42 2.1 2.94 2.44 1.3.3 2.87.15 4.27-.34 1.4-.5 2.7-1.32 3.74-2.34.5-.5.93-1.03 1.3-1.6.4-.55.73-1.15 1.05-1.75.2.35.43.7.7 1 .95 1.06 2.27 1.8 3.76 2.16.1.03.22.05.33.07-.17.44-.34.87-.52 1.3-1.13 2.75-2.7 5.3-4.27 6.8-1.57 1.54-2.5 2.1-4.54 2.17-2.07.08-3.33-.75-4.8-2.28-1.47-1.55-2.53-3.8-3.37-5.94-1.63-4.16-1.76-8.5-.77-11.7 1-3.25 3.17-5.6 6.13-6.55 3-1 6.3-.12 9.15 1.85 1.38.95 2.66 2.15 3.96 3.46-.2-1.17-.48-2.35-.9-3.5-.96-2.67-2.96-5.25-5.7-7.2-2.75-1.97-6.32-3.16-10.55-3.13-4.24.02-9.2 1.75-13.03 5.03C1.57 8.5.36 13.42.36 19.42c0 .45.01.9.04 1.33.1 1.2.36 2.4.8 3.6 1.25 3.37 3.6 6.62 6.9 9.04 3.28 2.4 7.5 3.93 12.05 4.08 4.55.15 9.54-1.04 13.43-3.94 3.87-2.9 6.65-7.44 7.1-13.25.1-1.26.06-2.67-.15-3.9-.2-1.2-.56-2.4-1.1-3.5-.96-2.02-2.44-3.78-4.3-5.32-1.85-1.54-4.1-2.88-6.7-3.84-1.78-.64-3.68-1.16-5.65-1.34-1.94-.18-4-.07-5.76.6-3.5 1.35-6.05 4.62-7.08 8.6-.93 3.6-.57 7.7.95 11.13 1.5 3.4 4.05 6.17 7.24 7.82 3.17 1.64 7 2.2 10.3 1.42 3.27-.78 6-2.9 7.93-6.05 1.95-3.17 3.13-7.36 3.3-11.7.18-4.33-.68-8.7-2.8-12-.16-.24-.33-.48-.5-.7.94-.04 1.92.1 2.85.5 1.86.77 3.5 2.4 4.66 4.45 1.16 2.05 1.84 4.54 1.72 7.03-.12 2.5-1.06 5-2.9 6.77-1.84 1.76-4.58 2.77-7.5 2.9-1.2.07-2.33-.04-3.38-.33-1.05-.28-2.04-.8-2.9-1.56-.86-.75-1.55-1.73-1.97-2.97-.42-1.24-.53-2.75-.3-4.67.44-3.6-.3-7.47-2.13-10.64-1.94-3.35-5.26-6.06-10.14-6.66-5.17-.63-9.13 1.3-12.03 4.3-2.82 2.93-4.36 7.13-4.46 11.48-.1 4.35 1.2 8.62 3.2 12 .94 1.58 2.03 3 3.32 4.2-.34.26-.66.53-.98.78C12 42.32 7.98 41.5 5.38 39.15c-2.6-2.34-3.8-6.27-3.12-10.4.67-4.14 3.15-8.38 6.6-11.3 3.47-2.94 7.83-4.56 11.96-4.8 4.13-.26 8.05 1.02 11.14 3.08 3.1 2.08 5.55 4.96 7.08 8.32.79 1.76 1.32 3.66 1.58 5.63.5.36.05.73.08 1.1-.15-.05-.3-.12-.46-.18-2.56-1.08-5.12-.68-7.06.94-1.94 1.6-3.23 4.3-3.58 7.16-.35 2.88.17 5.52 1.58 7.6 1.4 2.06 3.7 3.58 6.8 4.3.76.16 1.57.3 2.37.36.8.07 1.64.08 2.45.05 3.6-.15 6.68-1.6 8.77-3.83 2.1-2.26 3.22-5.33 3.37-8.55.15-3.2-.63-6.5-2.27-9.5.73 3.26 1.3 6.63 1.7 10.02.2 1.67.34 3.35.43 5.03.1 1.7.13 3.4.1 5.13-.04 1.72-.16 3.44-.37 5.17-.2 1.7-.5 3.44-.92 5.13-1.68 6.76-5.13 13.26-10.34 18.9-5.2 5.62-12.35 10.48-20.82 13.84-8.48 3.36-18.28 5.2-28.3 5.46 10-.17 19.8-1.7 28.28-4.7 8.48-3 15.62-7.35 20.6-12.6 5-5.25 8.1-11.6 9.64-18.28.3-1.67.54-3.38.7-5.13.15-1.75.23-3.5.24-5.23.02-1.74-.03-3.48-.15-5.2-.06-.86-.14-1.72-.22-2.57.27 1.3.42 2.6.4 3.82-.01 1.23-.22 2.38-.6 3.34-.88 2.2-2.8 3.95-5.37 4.87-.3.1-.6.2-.92.27.7-.15 1.38-.36 2.05-.64 2.1-.87 4.02-2.45 5.3-4.93 1.27-2.48 1.87-5.74 1.53-9.22-.04-.45-.13-.89-.24-1.33.45 2.74.38 5.95-.92 8.94-1.3 2.98-3.8 5.52-6.95 7.12-3.14 1.62-6.08 2.02-8.67 1.55-1.3-.23-2.52-.68-3.62-1.25zM79.54 28.4c-.15.12-.4.35-.53.47l.82-.22c-.1-.12-.18-.17-.3-.26zm-3.8.43c.3-.1.57-.17.86-.2-.47.05-.8.13-1.14.23l.27-.03z' fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\"
        }}
      ></div>

      <div className="container relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left space-y-10 py-16" ref={elementRef}>
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-gold-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-navy-400/10 rounded-full blur-3xl"></div>
        
        <span className="inline-block py-1 px-3 rounded-full bg-gold-100 text-navy-900 font-medium text-sm">
          #1 Horse Racing Tips
        </span>
        
        <h1 className="heading-xl max-w-4xl">
          Win Big with Expert <span className="text-gold-500">Horse Racing</span> Tips
        </h1>
        
        <p className="body-lg max-w-2xl">
          Access exclusive insights from professional horse racing analysts. Our data-driven approach gives you the competitive edge to make informed betting decisions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="secondary" size="lg">Get Started</Button>
          <Button variant="outline" size="lg">Learn More</Button>
        </div>
        
        <div className="grid grid-cols-3 gap-8 pt-8 md:pt-16 w-full max-w-2xl">
          <div className="flex flex-col items-center lg:items-start">
            <span className="text-3xl font-bold text-navy-900">98%</span>
            <span className="text-navy-700 text-sm">Accuracy Rate</span>
          </div>
          <div className="flex flex-col items-center lg:items-start">
            <span className="text-3xl font-bold text-navy-900">10k+</span>
            <span className="text-navy-700 text-sm">Active Users</span>
          </div>
          <div className="flex flex-col items-center lg:items-start">
            <span className="text-3xl font-bold text-navy-900">250+</span>
            <span className="text-navy-700 text-sm">Tracks Covered</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
