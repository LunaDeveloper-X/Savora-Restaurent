import { useState, type FormEvent } from 'react';
import { Calendar, Clock, Users, CheckCircle, CalendarCheck } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import Reveal from '@/components/ui/Reveal';
import type { ReservationData } from '@/types';

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
  guests?: string;
}

const timeSlots = [
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM',
  '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM',
  '10:00 PM',
];

const today = new Date().toISOString().split('T')[0];

export default function Reservations() {
  const [formData, setFormData] = useState<ReservationData>({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    specialRequests: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const e: FormErrors = {};

    if (!formData.fullName.trim()) {
      e.fullName = 'Please enter your full name.';
    } else if (formData.fullName.trim().length < 2) {
      e.fullName = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      e.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      e.phone = 'Please enter your phone number.';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 10) {
      e.phone = 'Please enter a valid phone number (at least 10 digits).';
    }

    if (!formData.date) {
      e.date = 'Please select a date.';
    } else if (formData.date < today) {
      e.date = 'Please select a future date.';
    }

    if (!formData.time) {
      e.time = 'Please select a time.';
    }

    if (formData.guests < 1 || formData.guests > 20) {
      e.guests = 'Party size must be between 1 and 20 guests.';
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

  const handleChange = (field: keyof ReservationData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: 2,
      specialRequests: '',
    });
    setErrors({});
    setSubmitted(false);
  };

  const inputClass = (hasError?: string) =>
    `w-full bg-white border px-4 py-3.5 text-sm text-espresso-700 placeholder:text-espresso-300 focus:outline-none transition-colors ${
      hasError
        ? 'border-wine-500 focus:border-wine-500'
        : 'border-espresso-200 focus:border-amber-400'
    }`;

  const labelClass = 'block text-xs font-medium uppercase tracking-[0.15em] text-espresso-500 mb-2';

  if (submitted) {
    return (
      <>
        <PageHero
          eyebrow="Reservation"
          title="Book a Table"
          image="https://images.pexels.com/photos/8856554/pexels-photo-8856554.jpeg?auto=compress&cs=tinysrgb&h=900&w=1920"
        />
        <section className="py-24 md:py-32 bg-cream-50">
          <div className="container-narrow text-center">
            <Reveal>
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center bg-sage-100 rounded-full">
                <CheckCircle size={40} className="text-sage-500" />
              </div>
              <h2 className="text-display font-serif font-light text-espresso-800">
                Reservation Confirmed
              </h2>
              <div className="mt-6 mx-auto h-px w-12 bg-amber-400" />
              <p className="mt-6 text-lg text-espresso-400 leading-relaxed max-w-md mx-auto">
                Thank you, {formData.fullName}. We have received your reservation request and a
                confirmation email is on its way to {formData.email}.
              </p>

              <div className="mt-10 bg-white p-8 max-w-md mx-auto text-left shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-amber-500" />
                    <span className="text-sm text-espresso-600">
                      <span className="text-espresso-400">Date:</span>{' '}
                      {new Date(formData.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-amber-500" />
                    <span className="text-sm text-espresso-600">
                      <span className="text-espresso-400">Time:</span> {formData.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users size={18} className="text-amber-500" />
                    <span className="text-sm text-espresso-600">
                      <span className="text-espresso-400">Party Size:</span> {formData.guests}{' '}
                      {formData.guests === 1 ? 'guest' : 'guests'}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-8 text-sm text-espresso-400">
                If you need to modify or cancel your reservation, please call us at (212) 555-0184.
              </p>

              <button
                onClick={resetForm}
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-amber-600 hover:text-amber-500 transition-colors"
              >
                <CalendarCheck size={16} />
                Make Another Reservation
              </button>
            </Reveal>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Reservations"
        title="Reserve Your Table"
        description="Make your next dining experience unforgettable. Secure your table at SAVORA — we look forward to welcoming you."
        image="https://images.pexels.com/photos/8856554/pexels-photo-8856554.jpeg?auto=compress&cs=tinysrgb&h=900&w=1920"
      />

      <section className="py-20 md:py-28 bg-cream-50">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-start">
            {/* Sidebar */}
            <Reveal>
              <div className="bg-espresso-900 p-8 lg:p-10 text-cream-100">
                <h3 className="text-xl font-serif font-medium text-cream-50 mb-6">
                  Reserve Your Table
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-amber-300 mb-2">
                      Opening Hours
                    </p>
                    <div className="space-y-1.5 text-sm text-cream-100/70">
                      <p>Mon – Thu: 12:00 PM – 10:00 PM</p>
                      <p>Fri – Sun: 12:00 PM – 11:00 PM</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-amber-300 mb-2">
                      Party Size
                    </p>
                    <p className="text-sm text-cream-100/70">
                      Up to 20 guests. For larger parties or private events, please call us
                      directly.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-amber-300 mb-2">
                      Contact
                    </p>
                    <p className="text-sm text-cream-100/70">(212) 555-0184</p>
                    <p className="text-sm text-cream-100/70">hello@savora.com</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={150}>
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-white p-8 md:p-10 shadow-sm"
              >
                <h3 className="text-xl font-serif font-medium text-espresso-800 mb-6">
                  Your Details
                </h3>

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label htmlFor="fullName" className={labelClass}>
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      placeholder="Jane Doe"
                      className={inputClass(errors.fullName)}
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 text-xs text-wine-500">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
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

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="(212) 555-0184"
                      className={inputClass(errors.phone)}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-wine-500">{errors.phone}</p>
                    )}
                  </div>

                  {/* Date */}
                  <div>
                    <label htmlFor="date" className={labelClass}>
                      Date
                    </label>
                    <input
                      id="date"
                      type="date"
                      min={today}
                      value={formData.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                      className={inputClass(errors.date)}
                    />
                    {errors.date && (
                      <p className="mt-1.5 text-xs text-wine-500">{errors.date}</p>
                    )}
                  </div>

                  {/* Time */}
                  <div>
                    <label htmlFor="time" className={labelClass}>
                      Time
                    </label>
                    <select
                      id="time"
                      value={formData.time}
                      onChange={(e) => handleChange('time', e.target.value)}
                      className={inputClass(errors.time)}
                    >
                      <option value="">Select a time</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                    {errors.time && (
                      <p className="mt-1.5 text-xs text-wine-500">{errors.time}</p>
                    )}
                  </div>

                  {/* Guests */}
                  <div className="sm:col-span-2">
                    <label htmlFor="guests" className={labelClass}>
                      Number of Guests
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          handleChange('guests', Math.max(1, formData.guests - 1))
                        }
                        className="flex h-10 w-10 items-center justify-center border border-espresso-200 text-espresso-600 hover:border-amber-400 hover:text-amber-600 transition-colors"
                        aria-label="Decrease guests"
                      >
                        –
                      </button>
                      <span className="text-lg font-serif text-espresso-800 min-w-[2rem] text-center">
                        {formData.guests}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleChange('guests', Math.min(20, formData.guests + 1))
                        }
                        className="flex h-10 w-10 items-center justify-center border border-espresso-200 text-espresso-600 hover:border-amber-400 hover:text-amber-600 transition-colors"
                        aria-label="Increase guests"
                      >
                        +
                      </button>
                      <span className="text-sm text-espresso-400">
                        {formData.guests === 1 ? 'guest' : 'guests'}
                      </span>
                    </div>
                    {errors.guests && (
                      <p className="mt-1.5 text-xs text-wine-500">{errors.guests}</p>
                    )}
                  </div>

                  {/* Special Requests */}
                  <div className="sm:col-span-2">
                    <label htmlFor="specialRequests" className={labelClass}>
                      Special Requests <span className="text-espresso-300">(optional)</span>
                    </label>
                    <textarea
                      id="specialRequests"
                      value={formData.specialRequests}
                      onChange={(e) => handleChange('specialRequests', e.target.value)}
                      placeholder="Dietary restrictions, celebrations, seating preferences..."
                      rows={4}
                      className={inputClass(undefined)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-8 w-full bg-amber-500 text-espresso-900 py-4 text-sm font-medium uppercase tracking-[0.18em] hover:bg-amber-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
                >
                  Reserve Now
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
