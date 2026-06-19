import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronRight, 
  CheckCircle, 
  Download, 
  Trash2, 
  User, 
  DollarSign, 
  CloudUpload, 
  Plus, 
  Sparkles, 
  Lock, 
  Menu,
  Clock,
  ExternalLink,
  PlusCircle,
  HelpCircle,
  Check,
  CreditCard,
  Building
} from 'lucide-react';
import { Appointment, Activity, HealthMetric } from '../types';

interface PatientPortalProps {
  upcomingAppointment: Appointment | null;
  onConfirmPresence: () => void;
  activities: Activity[];
  onAddActivity: (activity: Activity) => void;
  metrics: HealthMetric[];
  onUpdateMetric: (id: string, val: number) => void;
  onBookAppointment: (appointment: Appointment) => void;
  onNavigateToRecords: () => void;
  duesPaid: boolean;
  onPayDues: () => void;
}

export default function PatientPortal({
  upcomingAppointment,
  onConfirmPresence,
  activities,
  onAddActivity,
  metrics,
  onUpdateMetric,
  onBookAppointment,
  onNavigateToRecords,
  duesPaid,
  onPayDues
}: PatientPortalProps) {
  // Modal states
  const [showBookModal, setShowBookModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [payingLoading, setPayingLoading] = useState(false);
  const [hasConfirmedPresence, setHasConfirmedPresence] = useState(false);

  // New Appointment Form state
  const [newAppt, setNewAppt] = useState({
    doctor: 'Dr. Sarah Thompson, DPT',
    date: '2026-06-25',
    time: '11:30 AM',
    reason: 'Knee extension stiffness check'
  });

  // Track patient self-stretch
  const [stretchesDone, setStretchesDone] = useState<string[]>([]);
  const dailyStretches = [
    { id: 'quads', name: 'Isometric Quad Sets (3 x 15 reps)', reps: '10s hold' },
    { id: 'slr', name: 'Straight Leg Raises (2 x 10 reps)', reps: 'Slow lift' },
    { id: 'patellar', name: 'Patellar Glides (15 reps)', reps: 'Gentle mobilizations' }
  ];

  const handleToggleStretch = (id: string, name: string) => {
    let next;
    if (stretchesDone.includes(id)) {
      next = stretchesDone.filter(x => x !== id);
    } else {
      next = [...stretchesDone, id];
      // Log as activity
      onAddActivity({
        id: Math.random().toString(),
        type: 'attendance',
        title: `Logged Home Exercise`,
        description: `Patient completed: ${name}`,
        date: 'Today'
      });
    }
    setStretchesDone(next);
  };

  const handleConfirmPresence = () => {
    setHasConfirmedPresence(true);
    onConfirmPresence();
    onAddActivity({
      id: Math.random().toString(),
      type: 'attendance',
      title: 'Session Presence Confirmed',
      description: 'Presence check-in completed for Dr. Thompson.',
      date: 'Today'
    });
  };

  const submitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
    
    const booked: Appointment = {
      id: Math.random().toString(),
      patientName: 'Alex Johnson',
      patientId: '#RL-9021',
      doctorName: newAppt.doctor.split(',')[0],
      time: newAppt.time,
      date: newAppt.date,
      reason: newAppt.reason,
      status: 'pending', // Admin approves it!
      room: 'Consultation Room 02'
    };

    setTimeout(() => {
      onBookAppointment(booked);
      onAddActivity({
        id: Math.random().toString(),
        type: 'billing',
        title: 'New Appointment Scheduled',
        description: `Requested session with ${booked.doctorName} for ${newAppt.date} at ${newAppt.time}`,
        date: 'Today'
      });
      setBookingConfirmed(false);
      setShowBookModal(false);
    }, 1500);
  };

  const submitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPayingLoading(true);
    setTimeout(() => {
      onPayDues();
      onAddActivity({
        id: Math.random().toString(),
        type: 'billing',
        title: 'Paid Active Balance',
        description: 'Successfully paid outstanding invoice of $150.00 for October sessions.',
        date: 'Today'
      });
      setPayingLoading(false);
      setShowPayModal(false);
    }, 1500);
  };

  // Compute overall recovery percentage from slider values or hardcoded
  const flexibilityMetric = metrics.find(m => m.id === 'flex') || { value: 85 };
  const painMetric = metrics.find(m => m.id === 'pain') || { value: 60 }; // 60% reduction
  const strengthMetric = metrics.find(m => m.id === 'strength') || { value: 90 };
  
  // Custom combined recovery scoring
  const computedRecovery = Math.round((flexibilityMetric.value + painMetric.value + strengthMetric.value) / 3.1);

  return (
    <div className="space-y-8">
      {/* Dashboard Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-outline">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary">Good Morning, Alex</h1>
          <p className="text-on-surface-variant text-sm mt-1">Here's your recovery summary for today.</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-secondary animate-pulse"></span>
          <span className="text-xs font-semibold text-secondary-container bg-secondary/15 px-3 py-1.5 rounded-full border border-secondary/20">
            Active Treatment Plan (#RL-9021)
          </span>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recovery Progress Dial (Glass Card) */}
        <div className="glass-card md:col-span-2 p-6 rounded-2xl border border-outline flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="relative w-44 h-44 flex-shrink-0">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle 
                className="text-slate-200" 
                cx="50" 
                cy="50" 
                fill="transparent" 
                r="40" 
                stroke="currentColor" 
                strokeWidth="7"
              />
              <circle 
                className="text-secondary transition-all duration-1000 ease-out" 
                cx="50" 
                cy="50" 
                fill="transparent" 
                r="40" 
                stroke="currentColor" 
                strokeWidth="7"
                strokeDasharray="251.32" 
                strokeDashoffset={251.32 - (computedRecovery / 100) * 251.32}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold font-display text-primary">{computedRecovery}%</span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-on-surface-variant">Recovered</span>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-secondary text-right">Overall Status</span>
              <h2 className="font-display text-xl font-bold text-primary mt-1">Recovery Progress</h2>
              <p className="text-on-surface-variant text-sm leading-relaxed mt-2">
                You are making excellent strides in your lower back & left knee rehabilitation. Complete your prescribed home stretches to keep up the momentum.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-semibold">Lower Back</span>
              <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-semibold">Strength Training</span>
              <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-semibold">ACL Grade 2</span>
            </div>
          </div>
        </div>

        {/* Upcoming Session Widgets */}
        <div className="bg-primary text-white p-6 rounded-2xl flex flex-col justify-between shadow-lg relative overflow-hidden">
          {/* Subtle glow background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Calendar className="text-secondary h-5 w-5" />
              </div>
              <span className="text-[11px] font-bold bg-white/20 px-3 py-1 rounded-full uppercase tracking-wider">
                Tomorrow
              </span>
            </div>

            {upcomingAppointment ? (
              <div className="space-y-1">
                <p className="text-white/60 text-xs font-medium uppercase tracking-wider">UPCOMING SESSION</p>
                <h3 className="font-display text-2xl font-bold text-white">{upcomingAppointment.time}</h3>
                <p className="text-on-primary-container text-sm font-semibold mt-4">
                  {upcomingAppointment.doctorName}
                </p>
                <p className="text-white/60 text-xs">{upcomingAppointment.room || 'Consultation Room 04'}</p>
              </div>
            ) : (
              <div className="space-y-1 py-4">
                <p className="text-white/70 text-sm">No scheduled clinic appointments.</p>
                <button 
                  onClick={() => setShowBookModal(true)}
                  className="text-secondary text-sm font-bold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  Schedule rehab now <Plus className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {upcomingAppointment && (
            <button 
              disabled={hasConfirmedPresence}
              onClick={handleConfirmPresence}
              className={`mt-6 w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                hasConfirmedPresence 
                  ? 'bg-secondary/20 text-secondary border border-secondary/30 pointer-events-none' 
                  : 'bg-white text-primary hover:bg-secondary-container hover:text-on-secondary-container cursor-pointer'
              }`}
            >
              {hasConfirmedPresence ? (
                <span className="flex items-center justify-center gap-2">
                  <Check className="h-4 w-4" /> Presence Confirmed!
                </span>
              ) : (
                'Confirm Presence'
              )}
            </button>
          )}
        </div>
      </div>

      {/* Quick Actions Router */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button 
          onClick={() => setShowBookModal(true)}
          className="flex items-center justify-between p-5 rounded-2xl bg-white border border-outline hover:bg-slate-50 transition-all group cursor-pointer text-left shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <span className="font-display font-bold text-primary block text-sm">Schedule Session</span>
              <span className="text-xs text-on-surface-variant">Book a physical appointment</span>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-outline-variant group-hover:text-primary transition-colors" />
        </button>

        <button 
          onClick={onNavigateToRecords}
          className="flex items-center justify-between p-5 rounded-2xl bg-white border border-outline hover:bg-slate-50 transition-all group cursor-pointer text-left shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <CloudUpload className="h-5 w-5" />
            </div>
            <div>
              <span className="font-display font-bold text-primary block text-sm">Upload Clinical Files</span>
              <span className="text-xs text-on-surface-variant">Drop MRI scans or report PDFs</span>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-outline-variant group-hover:text-primary transition-colors" />
        </button>

        <button 
          onClick={() => setShowPayModal(true)}
          className="flex items-center justify-between p-5 rounded-2xl bg-white border border-outline hover:bg-slate-50 transition-all group cursor-pointer text-left shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <span className="font-display font-bold text-primary block text-sm">Patient Account Ledger</span>
              <span className="text-xs text-on-surface-variant">
                {duesPaid ? 'No outstanding dues' : 'Active Balance: $150.00'}
              </span>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-outline-variant group-hover:text-primary transition-colors" />
        </button>
      </div>

      {/* Main Bottom Section: stretch list along with health trackers & activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Prescribed Exercises State Tracker */}
        <div className="lg:col-span-1 bg-white border border-outline rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-50">
            <h3 className="font-display text-base font-bold text-primary">Daily Stretching Checklist</h3>
            <span className="text-xs font-semibold text-secondary">
              {stretchesDone.length} / {dailyStretches.length} Completed
            </span>
          </div>

          <p className="text-xs text-on-surface-variant">
            Cross-check exercises completed at home to feed diagnostic metrics into your clinical chart.
          </p>

          <div className="space-y-3">
            {dailyStretches.map((str) => {
              const isChecked = stretchesDone.includes(str.id);
              return (
                <div 
                  key={str.id}
                  onClick={() => handleToggleStretch(str.id, str.name)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                    isChecked 
                      ? 'bg-secondary-container/10 border-secondary/30' 
                      : 'bg-slate-50/50 border-slate-100 hover:border-secondary'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                      isChecked 
                        ? 'bg-secondary border-secondary text-white' 
                        : 'border-slate-300 group-hover:border-secondary bg-white'
                    }`}>
                      {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                    </div>
                    <div>
                      <p className={`text-xs font-bold transition-all ${isChecked ? 'text-primary/70 line-through' : 'text-primary'}`}>
                        {str.name}
                      </p>
                      <p className="text-[10px] text-on-surface-variant">{str.reps}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center: Recent activity */}
        <div className="lg:col-span-1 bg-white border border-outline rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-display text-base font-bold text-primary">Recent Diary Activity</h3>
          
          <div className="space-y-4 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
            {activities.slice(0, 3).map((act, idx) => (
              <div key={act.id || idx} className="flex gap-4 relative">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 z-10 shadow-sm border ${
                  act.type === 'prescription' 
                    ? 'bg-secondary/15 text-secondary border-secondary/20' 
                    : act.type === 'attendance'
                    ? 'bg-primary/10 text-primary border-primary/20'
                    : 'bg-slate-100 text-slate-500 border-slate-200'
                }`}>
                  <Clock className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold text-primary leading-tight">{act.title}</h4>
                    <span className="text-[9px] text-on-surface-variant whitespace-nowrap">{act.date}</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    {act.description}
                  </p>
                  {act.linkText && (
                    <button 
                      onClick={() => act.linkText?.includes('Download') && window.open('/src/types.ts')}
                      className="text-[11px] text-secondary font-bold flex items-center gap-1 hover:underline cursor-pointer pt-1"
                    >
                      {act.linkText} <Download className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Health trackers */}
        <div className="lg:col-span-1 bg-white border border-outline rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-50">
            <h3 className="font-display text-base font-bold text-primary">Health Indicators</h3>
            <Sparkles className="text-secondary h-4 w-4" />
          </div>

          <p className="text-xs text-on-surface-variant">
            These scores indicate clinical evaluation and daily subjective recovery metrics.
          </p>

          <div className="space-y-5 pt-2">
            {metrics.map((met) => (
              <div key={met.id} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-on-surface-variant">{met.name}</span>
                  <span className="text-primary font-bold">{met.value}%</span>
                </div>
                
                <div className="relative group">
                  <input 
                    type="range"
                    min="10"
                    max="100"
                    value={met.value}
                    onChange={(e) => onUpdateMetric(met.id, parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 accent-secondary rounded-full cursor-pointer outline-none focus:ring-0"
                  />
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden absolute top-0 -z-10">
                    <div 
                      className="h-full bg-secondary transition-all" 
                      style={{ width: `${met.value}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL 1: BOOKING WIDGET */}
      {showBookModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={() => setShowBookModal(false)}></div>
          <div className="relative bg-white rounded-3xl w-full max-w-md p-6 overflow-hidden shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display text-lg font-bold text-primary">Schedule New Appointment</h3>
              <button 
                onClick={() => setShowBookModal(false)}
                className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100 text-on-surface cursor-pointer font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {bookingConfirmed ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mx-auto">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h4 className="font-display text-base font-bold text-primary">Appointment Submitted!</h4>
                <p className="text-xs text-on-surface-variant">
                  Your request with <strong>Dr. Sarah Thompson</strong> has been added onto the pending clinical approvals queue.
                </p>
                <div className="text-[10px] text-secondary font-bold uppercase tracking-widest pt-2">
                  Re-Live Health Cloud Integrator
                </div>
              </div>
            ) : (
              <form onSubmit={submitBooking} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-on-surface-variant mb-1 uppercase">ASSIGNED CARE PHYSICIAN</label>
                  <select 
                    value={newAppt.doctor}
                    onChange={(e) => setNewAppt({ ...newAppt, doctor: e.target.value })}
                    className="w-full text-xs h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-secondary"
                  >
                    <option>Dr. Sarah Thompson, DPT (ACL Lead)</option>
                    <option>Dr. Arthur Morgan, PT (Spine Specialist)</option>
                    <option>Sr. Sarah Kim, PT (Senior Orthopedist)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-on-surface-variant mb-1 uppercase">DATE</label>
                    <input 
                      type="date"
                      value={newAppt.date}
                      onChange={(e) => setNewAppt({ ...newAppt, date: e.target.value })}
                      className="w-full text-xs h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-on-surface-variant mb-1 uppercase">PREFFERED TIME</label>
                    <select 
                      value={newAppt.time}
                      onChange={(e) => setNewAppt({ ...newAppt, time: e.target.value })}
                      className="w-full text-xs h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                    >
                      <option>10:00 AM</option>
                      <option>11:30 AM</option>
                      <option>01:00 PM</option>
                      <option>03:30 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-on-surface-variant mb-1 uppercase">REACTION / REHAB NOTES</label>
                  <textarea 
                    value={newAppt.reason}
                    onChange={(e) => setNewAppt({ ...newAppt, reason: e.target.value })}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                    rows={2}
                    placeholder="E.g., Knee flexion swelling check"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-2.5 bg-primary text-white font-bold text-xs uppercase tracking-wider rounded-lg mt-2 hover:bg-primary-container transition-colors cursor-pointer"
                >
                  Send Appointment Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: PATIENT ACCOUNT LEDGER / PAYMENT */}
      {showPayModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={() => setShowPayModal(false)}></div>
          <div className="relative bg-white rounded-3xl w-full max-w-md p-6 overflow-hidden shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <DollarSign className="text-secondary h-5 w-5" />
                <h3 className="font-display text-lg font-bold text-primary">Patient Ledger</h3>
              </div>
              <button 
                onClick={() => setShowPayModal(false)}
                className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100 text-on-surface cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-100">
                <div className="flex justify-between text-xs">
                  <span className="text-on-surface-variant">Outstanding Session Invoices:</span>
                  <span className="font-bold text-primary">{duesPaid ? '$0.00' : '$150.00'}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-on-surface-variant">Copay Deductibles:</span>
                  <span className="font-bold text-primary">$0.00</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-bold">
                  <span className="text-primary">Total Balance Due:</span>
                  <span className="text-secondary font-display font-bold">{duesPaid ? '$0.00' : '$150.00'}</span>
                </div>
              </div>

              {duesPaid ? (
                <div className="text-center py-6 space-y-2">
                  <CheckCircle className="text-secondary h-12 w-12 mx-auto" />
                  <p className="text-xs font-bold text-primary">Ledger Balance Cleared!</p>
                  <p className="text-[11px] text-on-surface-variant">There are no outstanding invoices. Thank you!</p>
                </div>
              ) : (
                <form onSubmit={submitPayment} className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-on-surface-variant uppercase">Cardholder Name</label>
                    <input 
                      required
                      type="text"
                      className="w-full text-xs h-9 bg-slate-50 border border-slate-200 rounded-lg px-3"
                      placeholder="Alex Johnson"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2 space-y-1">
                      <label className="block text-[10px] font-bold text-on-surface-variant uppercase">Mock Card Number</label>
                      <input 
                        required
                        type="text"
                        className="w-full text-xs h-9 bg-slate-50 border border-slate-200 rounded-lg px-3"
                        placeholder="•••• •••• •••• 9021"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-on-surface-variant uppercase">CVV</label>
                      <input 
                        required
                        type="password"
                        className="w-full text-xs h-9 bg-slate-50 border border-slate-200 rounded-lg px-3"
                        placeholder="•••"
                        maxLength={3}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-on-surface-variant pt-1 px-1">
                    <Lock className="text-secondary h-3.5 w-3.5" />
                    <span>Secure PCI-DSS Compliant Gateway • Re-Live FinCloud</span>
                  </div>

                  <button 
                    disabled={payingLoading}
                    type="submit"
                    className="w-full py-2.5 bg-secondary text-white font-bold text-xs uppercase tracking-wider rounded-lg mt-2 cursor-pointer hover:brightness-[1.05]"
                  >
                    {payingLoading ? 'Processing secure payment...' : 'Pay Invoice Outright ($150.00)'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
