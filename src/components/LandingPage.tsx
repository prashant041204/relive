import React, { useState } from 'react';
import { 
  Menu, 
  MapPin, 
  Calendar, 
  Video, 
  CheckCircle, 
  Award, 
  ArrowRight, 
  Dumbbell, 
  Smartphone, 
  ShieldCheck, 
  Stethoscope, 
  Clock, 
  User, 
  Activity, 
  Accessibility, 
  Navigation,
  MessageCircle,
  Phone,
  Settings,
  HeartCrack,
  Smile
} from 'lucide-react';

interface LandingPageProps {
  onNavigateToPortal: (role: 'patient' | 'admin', subView?: string) => void;
  onBookImmediate: () => void;
}

export default function LandingPage({ onNavigateToPortal, onBookImmediate }: LandingPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Sports Injury',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', service: 'Sports Injury', message: '' });
    }, 4500);
  };

  const services = [
    {
      id: "sports",
      title: "Sports Injury",
      desc: "Advanced rehabilitation for athletes focusing on strength, agility, and injury prevention for a faster return to play.",
      icon: Dumbbell
    },
    {
      id: "acl",
      title: "ACL Recovery",
      desc: "Post-surgical protocols designed by experts to ensure optimal joint stability and long-term ligament health.",
      icon: ShieldCheck
    },
    {
      id: "chiro",
      title: "Chiropractic",
      desc: "Spinal alignment and posture correction techniques to alleviate chronic pain and improve nervous system function.",
      icon: Accessibility
    },
    {
      id: "postop",
      title: "Post-Op Rehab",
      desc: "Gentle yet effective recovery paths for various surgeries, ensuring safe restoration of mobility and strength.",
      icon: Stethoscope
    },
    {
      id: "geriatric",
      title: "Geriatric Care",
      desc: "Specialized therapy for elderly patients focusing on fall prevention, balance, and maintaining independence.",
      icon: Smile
    },
    {
      id: "neuro",
      title: "Neuro Rehab",
      desc: "Advanced techniques for recovery from stroke, Parkinson's, and other neurological conditions.",
      icon: Activity
    }
  ];

  return (
    <div className="bg-background text-on-surface font-sans selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-10 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA8TjZ2n5__qMdvVbggTJKhOnocVCEoZFJFHvTmyQh_uJ1jV79iM2zv4_iuNPG-YHBYuafGHXf5rIyj5cmVCeb3OWcuB1SG_3ck3ieXjrVzcbIDdNF5dGW6khH8pp1Ghg0P8cp0iybwVNSVFr_9E2C0yRIKSWqlzmDC5NobCze8b12bPEJ3q4j_25rSrgMmMEO-vzUnNFOcs4BH1ldRB3fL-prNi3yuSpHSU9AIT6Y_iF3jGURuNIxgoyaz72FRNmHnIAk7h6Ra-bH9')`
        }}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/75 to-primary/30"></div>
        </div>

        <div className="relative z-10 px-6 md:px-16 w-full max-w-7xl mx-auto py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-container/20 border border-secondary/30 mb-8 backdrop-blur-md">
            <Award className="text-secondary-container h-4 w-4" />
            <span className="text-secondary-container font-semibold uppercase tracking-wider text-[11px]">
              Clinically Proven Excellence
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight max-w-3xl">
            Restore Movement, <br/>
            <span className="text-secondary-fixed text-glow text-secondary-container">Relieve Pain</span>, <br/>
            Rebuild Life.
          </h2>
          
          <p className="text-white/85 text-lg mb-10 max-w-2xl leading-relaxed">
            Experience evidence-based physiotherapy tailored to your unique recovery journey. Our expert practitioners combine clinical precision with compassionate, responsive care.
          </p>

          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onBookImmediate}
              className="h-12 px-8 bg-secondary text-white rounded-full font-medium hover:scale-[1.02] transition-transform flex items-center gap-2 cursor-pointer shadow-lg"
            >
              Book Appointment
              <Calendar className="h-4 w-4" />
            </button>
            <button 
              onClick={() => onNavigateToPortal('patient')}
              className="h-12 px-8 bg-white/10 text-white border border-white/20 backdrop-blur-md rounded-full font-medium hover:bg-white/20 hover:scale-[1.02] transition-all flex items-center gap-2 cursor-pointer"
            >
              Patient Care Portal
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 text-white/70 text-sm">
            <span className="flex items-center gap-2">
              <CheckCircle className="text-secondary h-4 w-4" /> Free Diagnostics Consultation
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="text-secondary h-4 w-4" /> HIPAA-Compliant Medical Records
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="text-secondary h-4 w-4" /> Top ISO-9001 Certified Clinic
            </span>
          </div>
        </div>

        {/* Floating Glass Card - Stats */}
        <div className="hidden lg:block absolute bottom-12 right-16 z-10 glass-card p-6 rounded-2xl shadow-2xl max-w-xs animate-bounce-slow">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center">
              <CheckCircle className="text-secondary h-6 w-6" />
            </div>
            <div>
              <p className="text-primary font-bold text-2xl">98.4%</p>
              <p className="text-on-surface-variant text-xs font-medium">Patient Satisfaction</p>
            </div>
          </div>
          <p className="text-on-surface-variant text-xs leading-relaxed">
            Join over 5,000+ patients who reclaimed their active, pain-free lifestyle.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto" id="services">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl font-bold text-primary mb-4">Our Specializations</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full mb-6"></div>
          <p className="max-w-2xl mx-auto text-on-surface-variant text-sm md:text-base leading-relaxed">
            We provide comprehensive physical therapy solutions using advanced medical diagnostics and expert-led rehabilitation plans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div 
              key={svc.id} 
              className="glass-card p-6 rounded-2xl hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 border border-outline-variant/30 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <svc.icon className="h-6 w-6 text-primary group-hover:text-white" />
                </div>
                <h3 className="font-display text-lg font-bold text-primary mb-3">
                  {svc.title}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  {svc.desc}
                </p>
              </div>
              <button 
                onClick={onBookImmediate}
                className="text-secondary hover:text-on-secondary-container text-xs font-semibold flex items-center gap-1 hover:underline mt-auto text-left cursor-pointer"
              >
                Schedule Consultation <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-surface-container-low py-20 px-6 md:px-16" id="about">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="font-display text-3xl font-bold text-primary leading-snug">
              Excellence in Restorative Physical Therapy
            </h2>
            <p className="text-on-surface-variant text-base leading-relaxed">
              At Re-Live Physiotherapy, we utilize evidence-based guidelines alongside cutting-edge diagnostic tools to expedite healing times and restore long-term athletic or orthopedic movement.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center">
                  <Stethoscope className="text-on-secondary-container h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-primary mb-1">Certified Specialists</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    Our clinical team consists of PhD/Dr level therapists with certifications in spinal adjustment and physical trauma recovery.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center">
                  <Dumbbell className="text-on-secondary-container h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-primary mb-1">State-of-the-Art Gyms</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    Every clinic has dedicated private recovery bays containing computerized resistance machines and gait analyzers.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center">
                  <Clock className="text-on-secondary-container h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-primary mb-1">Dynamic Recoveries</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    With our Patient Care portal, you track real progress markers, view exercises, and message direct care staff 24/7.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-secondary/15 to-transparent blur-2xl opacity-50 rounded-full"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/80">
              <img 
                className="w-full h-auto object-cover transform scale-100 group-hover:scale-[1.01] transition-transform duration-500" 
                alt="Physiotherapy consultation" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBId2vwGA-u9x7kxY3GsjKtTO0GBwbD6TQzY9eTGzpIL2A_WbQuPLLGtjuOvRA-q2sKF_rwmimHysvSsVis5yW25fnk_A8cdd76z4dVEAKnhZ2mRZoaVbkA6w3b5rNPeh88WXnTv6ZclQusZNzeqggWp7DmWdMsYJu0BqdKi0u9kPrhgcxlskmlwhi7ahBE84QxvNhnAd6B9HP7YMUYlwgjKmjrOuQHWP3Og1D-WEGIl0PVxcFeb8kZDFuVjtPlYFRLDqPG8GioY4ST"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form and Location */}
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto" id="contact">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-3xl font-bold text-primary mb-2">Get in Touch</h2>
              <p className="text-on-surface-variant text-sm">
                Request a clinical callback or schedule a physical therapy session with Dr. Rodriguez.
              </p>
            </div>

            {submitted ? (
              <div id="booking-success-card" className="bg-secondary-container/20 border border-secondary/40 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle className="text-secondary h-12 w-12 mx-auto" />
                <h3 className="font-display text-lg font-bold text-primary">Inquiry Received Successfully!</h3>
                <p className="text-on-surface-variant text-sm">
                  Thank you, <strong>{formData.name}</strong>. One of our lead physiotherapists will contact you at <strong>{formData.phone}</strong> within 15 minutes.
                </p>
                <div className="text-[11px] text-secondary font-medium uppercase tracking-wider">
                  HIPAA Secured Connection • Re-Live Physiotherapy
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl border border-outline border-slate-200 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant mb-2">FULL NAME</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-outline-variant" />
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-11 pl-10 pr-4 rounded-xl border border-outline border-slate-300 focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none text-sm transition-all" 
                        placeholder="Alex Johnson"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant mb-2">PHONE NUMBER</label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-outline-variant" />
                      <input 
                        required
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-11 pl-10 pr-4 rounded-xl border border-outline border-slate-300 focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none text-sm transition-all" 
                        placeholder="+1 234 567 890"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-2">SERVICE PREREQUISITE</label>
                  <select 
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full h-11 px-4 rounded-xl border border-outline border-slate-300 focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none text-sm bg-white cursor-pointer"
                  >
                    <option>Sports Injury Recovery</option>
                    <option>ACL Grade 2 / Post-Op Joint Rehab</option>
                    <option>Chiropractic Alignment</option>
                    <option>Geriatric Stability Control</option>
                    <option>Neurological Coordination Training</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-2">REHABILITATION NOTES / QUESTIONS</label>
                  <textarea 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-outline border-slate-300 focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none text-sm transition-all" 
                    placeholder="Describe your current pain level, joint stiffness, or recovery goals..."
                    rows={3}
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full h-11 bg-primary text-white font-semibold text-sm rounded-xl hover:opacity-95 transition-opacity cursor-pointer flex items-center justify-center gap-2"
                >
                  Send Diagnostics Details
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}

            <div className="flex gap-4">
              <a 
                href="https://wa.me/123456789" 
                target="_blank" 
                rel="no-referrer"
                className="flex-1 h-12 rounded-xl bg-[#25D366] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm hover:brightness-105 transition-all"
              >
                <MessageCircle className="h-5 w-5" /> WhatsApp Support
              </a>
              <a 
                href="tel:+123456789" 
                className="flex-1 h-12 rounded-xl border border-slate-300 text-primary font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
              >
                <Phone className="h-4 w-4" /> Call Clinic Center
              </a>
            </div>
          </div>

          {/* Map/Contact Card */}
          <div className="h-[400px] lg:h-full min-h-[350px] rounded-2xl overflow-hidden shadow-inner border border-outline-variant/30 relative">
            <div className="absolute inset-0 bg-slate-100">
              <img 
                className="w-full h-full object-cover grayscale brightness-105" 
                alt="Clinic map locator" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg1T6R7kN52kJBSjT0SuToxm9oej2Igqg7rnC_xJmyey7gpUfjfnuHj8TeiSNFwUjsA-9n3_UUZPC4FRZOc9PywhH6LRUaL3b69m4P_eOQAoTpawd13E-1fcN5J9zXZF1WLrbEpXovMME6gUmtE3mJeITRdikjE-7yfa3zpLLrS2Zg1MWIByAhxwFdw7CBcApwv4WQ1J_eik9b_Nep_KrmcNBKccr3pew154gjff1gMh_UsFFkuh8cpwRXk9MFb6_k0PccCAQYmJwI"
              />
            </div>
            
            <div className="absolute bottom-6 left-6 right-6 glass-card p-4 rounded-xl flex items-center gap-4 border border-white/50 shadow-lg">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-primary text-sm">123 Health Avenue, Suite 500</p>
                <p className="text-xs text-on-surface-variant">Medical District, Wellness City ZIP-94021</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
