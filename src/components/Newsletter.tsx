
import React, { useState } from 'react';
import Button from './Button';
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Thank you for subscribing!");
      setEmail('');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="bg-navy-900 py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,#F59E0B,transparent_40%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,#4F46E5,transparent_40%)]"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-lg text-white mb-4">Get Weekly Racing Tips</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter for exclusive tips, race previews, and betting strategies delivered straight to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-grow px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
            <Button
              type="submit"
              variant="secondary"
              className="whitespace-nowrap"
              disabled={isLoading}
            >
              {isLoading ? 'Subscribing...' : 'Subscribe Now'}
            </Button>
          </form>
          
          <p className="text-white/60 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
