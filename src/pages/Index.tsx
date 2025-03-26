
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeatureCard from '@/components/FeatureCard';
import TestimonialCard from '@/components/TestimonialCard';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import { Calendar, TrendingUp, BarChart, Zap, Award, Clock } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    // Intersection Observer for animation on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Select all sections that should be animated
    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach((section) => {
      section.classList.add('opacity-0');
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  // Features data
  const features = [
    {
      icon: TrendingUp,
      title: 'Data-Driven Insights',
      description: 'Our algorithms analyze historical data and current form to provide the most accurate predictions.'
    },
    {
      icon: Calendar,
      title: 'Daily Updates',
      description: 'Get fresh tips every day for races across the globe, delivered directly to your app.'
    },
    {
      icon: BarChart,
      title: 'Performance Tracking',
      description: 'Track your betting performance over time and adjust your strategy based on results.'
    },
    {
      icon: Zap,
      title: 'Real-Time Alerts',
      description: 'Receive instant notifications for late scratches, track condition changes, and betting opportunities.'
    },
    {
      icon: Award,
      title: 'Expert Analysis',
      description: 'Our team of horse racing professionals provide detailed analysis on every selection.'
    },
    {
      icon: Clock,
      title: 'Race Reminders',
      description: 'Never miss a race with our customizable reminder system for your selected events.'
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: 'Michael Thompson',
      position: 'Professional Bettor',
      quote: "GunsTips has completely transformed my approach to horse race betting. The accuracy of their predictions is truly remarkable."
    },
    {
      name: 'Sarah Johnson',
      position: 'Racing Enthusiast',
      quote: "I've tried many tipping services, but none come close to the consistency of GunsTips. It's worth every penny."
    },
    {
      name: 'Robert Chen',
      position: 'Weekend Punter',
      quote: "What I love most is how easy it is to use. The interface is intuitive and the tips are explained clearly with detailed reasoning."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      
      <main>
        <HeroSection />
        
        {/* Features Section */}
        <section id="features" className="section-padding bg-navy-900">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
              <span className="inline-block py-1 px-3 rounded-full bg-purple-900/50 text-purple-300 font-medium text-sm mb-3">
                Features
              </span>
              <h2 className="heading-lg mb-4">Everything You Need for Successful Betting</h2>
              <p className="body-md text-gray-300">
                Our comprehensive suite of tools and insights provides everything you need to make informed betting decisions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="animate-on-scroll" style={{ animationDelay: `${index * 100}ms` }}>
                  <FeatureCard 
                    icon={feature.icon} 
                    title={feature.title} 
                    description={feature.description} 
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="section-padding bg-navy-800">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
              <span className="inline-block py-1 px-3 rounded-full bg-purple-900/50 text-purple-300 font-medium text-sm mb-3">
                Testimonials
              </span>
              <h2 className="heading-lg mb-4">What Our Users Say</h2>
              <p className="body-md text-gray-300">
                Join thousands of satisfied users who have transformed their betting experience with GunsTips.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="animate-on-scroll" style={{ animationDelay: `${index * 100}ms` }}>
                  <TestimonialCard 
                    name={testimonial.name} 
                    position={testimonial.position} 
                    quote={testimonial.quote} 
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="section-padding bg-navy-900">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center animate-on-scroll">
              <h2 className="heading-lg mb-6">Ready to Start Winning?</h2>
              <p className="body-md text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of successful bettors who have already discovered the GunsTips advantage. Get started today and see the difference for yourself.
              </p>
              <a 
                href="#" 
                className="inline-block bg-purple-600 text-white py-3 px-8 rounded-md font-medium hover:bg-purple-700 transition-colors"
              >
                Start Your Free Trial
              </a>
            </div>
          </div>
        </section>
        
        <Newsletter />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
