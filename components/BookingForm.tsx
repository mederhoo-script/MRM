'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface BookingFormProps {
  whatsapp: string;
  whatsappMessage: string;
}

export default function BookingForm({ whatsapp, whatsappMessage }: BookingFormProps) {
  const [form, setForm] = useState({ name: '', email: '', occasion: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello, my name is ${form.name}. I would like to book a consultation${form.occasion ? ` for ${form.occasion}` : ''}. ${form.message || ''}`;
    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="w-12 h-px bg-gold mx-auto mb-6" />
        <p className="font-playfair text-xl text-brand-black mb-2">Thank You</p>
        <p className="font-inter text-sm text-charcoal/70">
          Your request has been sent via WhatsApp. We will be in touch shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
      <div>
        <label className="block font-inter text-xs tracking-widest uppercase text-charcoal/60 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full border-b border-charcoal/20 focus:border-gold outline-none py-2 px-0 font-inter text-sm bg-transparent transition-colors duration-200"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="block font-inter text-xs tracking-widest uppercase text-charcoal/60 mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border-b border-charcoal/20 focus:border-gold outline-none py-2 px-0 font-inter text-sm bg-transparent transition-colors duration-200"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="block font-inter text-xs tracking-widest uppercase text-charcoal/60 mb-2">
          Occasion
        </label>
        <select
          name="occasion"
          value={form.occasion}
          onChange={handleChange}
          className="w-full border-b border-charcoal/20 focus:border-gold outline-none py-2 px-0 font-inter text-sm bg-transparent transition-colors duration-200 cursor-pointer"
        >
          <option value="">Select an occasion</option>
          <option value="Wedding / Bridal">Wedding / Bridal</option>
          <option value="Evening / Gala">Evening / Gala</option>
          <option value="Business / Corporate">Business / Corporate</option>
          <option value="Cultural / Traditional">Cultural / Traditional</option>
          <option value="General Bespoke">General Bespoke</option>
        </select>
      </div>

      <div>
        <label className="block font-inter text-xs tracking-widest uppercase text-charcoal/60 mb-2">
          Tell Us About Your Vision
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={3}
          className="w-full border-b border-charcoal/20 focus:border-gold outline-none py-2 px-0 font-inter text-sm bg-transparent transition-colors duration-200 resize-none"
          placeholder="Describe your dream garment..."
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button type="submit" className="btn-primary">
          Send via WhatsApp
        </button>
        <a
          href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline inline-flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Quick WhatsApp
        </a>
      </div>
    </form>
  );
}
