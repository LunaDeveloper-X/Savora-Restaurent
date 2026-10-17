import { useState, type FormEvent } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle, Send } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import { restaurantInfo } from '@/data/restaurant';
import type { ContactFormData } from '@/types';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const e: FormErrors = {};

    if (!formData.name.trim()) {
      e.name = 'Please enter your name.';
    } else if (formData.name.trim().length < 2) {
      e.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      e.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = 'Please enter a valid email address.';
    }

    if (!formData.subject.trim()) {
      e.subject = 'Please enter a subject.';
    }

    if (!formData.message.trim()) {
      e.message = 'Please enter a message.';
    } else if (formData.message.trim().length < 10) {
      e.message = 'Message must be at least 10 characters.';
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const inputClass = (hasError?: string) =>
    `w-full bg-white border px-4 py-3.5 text-sm text-espresso-700 placeholder:text-espresso-300 focus:outline-none transition-colors ${
      hasError
        ? 'border-wine-500 focus:border-wine-500'
        : 'border-espresso-200 focus:border-amber-400'
    }`;

  const labelClass = 'block text-xs font-medium uppercase tracking-[0.15em] text-espresso-500 mb-2';

  const contactCards = [
    {
      icon: MapPin,
      title: 'Address',
      lines: [restaurantInfo.address],
    },
    {
      icon: Phone,
      title: 'Phone',
      lines: [restaurantInfo.phone],
    },
    {
      icon: Mail,
      title: 'Email',
      lines: [restaurantInfo.email],
    },
    {
      icon: Clock,
      title: 'Hours',
      lines: restaurantInfo.hours.map((h) => `${h.day}: ${h.time}`),
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Contact Us"
        description="Have a question, planning a private event, or want to share your experience? We would love to hear from you."
        image="https://images.pexels.com/photos/12688961/pexels-photo-12688961.jpeg?auto=compress&cs=tinysrgb&h=900&w=1920"
      />

      {/* Contact info cards */}
      <section className="py-20 md:py-28 bg-cream-50">
        <div className="container-wide">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16">
            {contactCards.map((card, idx) => (
              <Reveal key={card.title} delay={idx * 100}>
                <div className="bg-white p-8 h-full shadow-sm hover:shadow-lg transition-shadow duration-500">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center bg-amber-50 text-amber-500">
                    <card.icon size={22} />
                  </div>
                  <h3 className="text-base font-serif font-medium text-espresso-800 mb-3">
                    {card.title}
                  </h3>
                  <div className="space-y-1">
                    {card.lines.map((line, i) => (
                      <p key={i} className="text-sm text-espresso-400 leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            {/* Map placeholder */}
            <Reveal>
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[400px] bg-espresso-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Stylized map placeholder */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/4 left-1/4 w-1/2 h-px bg-espresso-300 rotate-12" />
                    <div className="absolute top-1/3 right-1/4 w-1/3 h-px bg-espresso-300 -rotate-6" />
                    <div className="absolute bottom-1/3 left-1/3 w-2/5 h-px bg-espresso-300 rotate-3" />
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-espresso-300" />
                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-espresso-300" />
                    <div className="absolute top-0 bottom-0 left-1/3 w-px bg-espresso-300" />
                    <div className="absolute top-0 bottom-0 right-1/4 w-px bg-espresso-300" />
                  </div>
                  <div className="relative text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center bg-amber-500 rounded-full shadow-lg">
                      <MapPin size={24} className="text-espresso-900" />
                    </div>
                    <p className="text-lg font-serif text-espresso-700">SAVORA Restaurant</p>
                    <p className="text-sm text-espresso-400 mt-1">{restaurantInfo.address}</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={150}>
              {submitted ? (
                <div className="bg-white p-8 md:p-10 shadow-sm text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center bg-sage-100 rounded-full">
                    <CheckCircle size={32} className="text-sage-500" />
                  </div>
                  <h3 className="text-2xl font-serif font-light text-espresso-800 mb-4">
                    Message Sent
                  </h3>
                  <p className="text-espresso-400 leading-relaxed">
                    Thank you, {formData.name}. We have received your message and will get back to
                    you at {formData.email} within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="mt-6 text-sm font-medium uppercase tracking-[0.15em] text-amber-600 hover:text-amber-500 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="bg-white p-8 md:p-10 shadow-sm">
                  <h3 className="text-xl font-serif font-medium text-espresso-800 mb-6">
                    Send Us a Message
                  </h3>

                  <div className="space-y-5">
                    <div>
                      <label htmlFor="name" className={labelClass}>
                        Your Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Jane Doe"
                        className={inputClass(errors.name)}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-wine-500">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="jane@email.com"
                        className={inputClass(errors.email)}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-wine-500">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="subject" className={labelClass}>
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        placeholder="Private event inquiry"
                        className={inputClass(errors.subject)}
                      />
                      {errors.subject && (
                        <p className="mt-1.5 text-xs text-wine-500">{errors.subject}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className={labelClass}>
                        Message
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        placeholder="Tell us how we can help..."
                        rows={5}
                        className={inputClass(errors.message)}
                      />
                      {errors.message && (
                        <p className="mt-1.5 text-xs text-wine-500">{errors.message}</p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-8 w-full bg-amber-500 text-espresso-900 py-4 text-sm font-medium uppercase tracking-[0.18em] hover:bg-amber-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 inline-flex items-center justify-center gap-2"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
