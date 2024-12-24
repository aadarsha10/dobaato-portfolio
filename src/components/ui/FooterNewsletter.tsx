import { useState } from 'react';
import { useNewsletterForm } from '../../hooks/useNewsletterForm';

export default function FooterNewsletter() {
  const { subscribe, isLoading, error, success } = useNewsletterForm();

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
      <p className="text-gray-400 mb-4">
        Subscribe to our newsletter for updates and insights.
      </p>
      
      <form onSubmit={subscribe} className="space-y-3">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className="w-full px-4 py-2 rounded-lg bg-dark-200 border border-dark-200 text-white placeholder-gray-400 focus:ring-primary-500 focus:border-primary-500"
        />
        
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">Successfully subscribed!</p>}
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 rounded-lg bg-primary-500 text-white font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
}