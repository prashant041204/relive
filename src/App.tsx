import React, { useState } from 'react';
import { 
  Menu, 
  User, 
  Stethoscope, 
  Calendar, 
  Smartphone, 
  MapPin, 
  CreditCard, 
  ShieldAlert, 
  FileCheck, 
  Grid2X2,
  FileText,
  Activity,
  Smile,
  LogOut,
  Sparkles,
  Award,
  BellRing,
  Info
} from 'lucide-react';

import LandingPage from './components/LandingPage';
import PatientPortal from './components/PatientPortal';
import PatientRecords from './components/PatientRecords';
import AdminPortal from './components/AdminPortal';

import { Appointment, Activity as ActivityType, HealthMetric, MedicalRecord, Bed, Staff } from './types';

export default function App() {
  // Global Role / Active Portal Navigator State
  // 'landing' | 'patient' | 'admin'
  const [currentRole, setCurrentRole] = useState<'landing' | 'patient' | 'admin'>('landing');
  
  // Under patient portal, toggle between 'dashboard' and 'records'
  const [patientSubView, setPatientSubView] = useState<'dashboard' | 'records'>('dashboard');

  // Trigger global system notifications / toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Shared Global App State
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 'miller',
      patientName: 'Thomas Miller',
      patientId: '#RL-1024',
      reason: 'Post-Op ACL Rehab',
      time: '10:30 AM',
      date: '2026-06-20',
      status: 'pending',
      doctorName: 'Dr. Sarah Thompson'
    },
    {
      id: 'jenkins',
      patientName: 'Sarah Jenkins',
      patientId: '#RL-4402',
      reason: 'Chronic Lumbar Pain',
      time: '11:15 AM',
      date: '2026-06-20',
      status: 'pending',
      doctorName: 'Dr. Sarah Thompson'
    },
    {
      id: 'chen',
      patientName: 'Michael Chen',
      patientId: '#RL-9921',
      reason: 'Stroke Recovery',
      time: '01:00 PM',
      date: '2026-06-20',
      status: 'pending',
      doctorName: 'Dr. Sarah Thompson'
    }
  ]);

  // Alex Johnson's accepted upcoming appointment tomorrow morning
  const [patientUpcoming, setPatientUpcoming] = useState<Appointment | null>({
    id: 'alex_tomorrow',
    patientName: 'Alex Johnson',
    patientId: '#RL-9021',
    reason: 'Knee rehabilitation routine',
    time: '10:00 AM',
    date: '2026-06-20',
    status: 'accepted',
    doctorName: 'Dr. Sarah Thompson',
    room: 'Consultation Room 04'
  });

  const [duesPaid, setDuesPaid] = useState(false);

  // Initial medical records lists
  const [records, setRecords] = useState<MedicalRecord[]>([
    {
      id: 'rec_mri',
      name: 'Knee MRI - Left',
      date: 'Oct 12, 2024',
      size: '4.2 MB',
      type: 'pdf',
      category: 'MRI'
    },
    {
      id: 'rec_xray',
      name: 'Post-Op X-Ray',
      date: 'Sept 28, 2024',
      size: '1.8 MB',
      type: 'jpg',
      category: 'X-Ray'
    },
    {
      id: 'rec_bio',
      name: 'Biochemical Profile',
      date: 'Sept 15, 2024',
      size: '950 KB',
      type: 'pdf',
      category: 'Biochemical'
    }
  ]);

  // Initial subjective self-metric reports
  const [metrics, setMetrics] = useState<HealthMetric[]>([
    { id: 'flex', name: 'Flexibility Score', value: 85 },
    { id: 'pain', name: 'Pain Reduction Rate', value: 60 },
    { id: 'strength', name: 'Muscle Strength Ratio', value: 90 }
  ]);

  // Diagnostic Log Activities
  const [activities, setActivities] = useState<ActivityType[]>([
    {
      id: 'act1',
      type: 'prescription',
      title: 'Latest Prescription Issued',
      description: 'Regimen: Lumbar support exercises & topical analgesics by Dr. Thompson.',
      date: 'Oct 24, 2024',
      linkText: 'Download Prescription PDF'
    },
    {
      id: 'act2',
      type: 'attendance',
      title: 'Session Attendance',
      description: 'Successfully completed 60-minute therapeutic sets.',
      date: 'Oct 22, 2024',
      meta: 'Notes: Improved mobility in L4-L5 segments'
    }
  ]);

  // Interactive Clinical Bed Grids
  const [beds, setBeds] = useState<Bed[]>([
    // Therapy zone
    { id: 'T1', category: 'Therapy Zone', occupied: false },
    { id: 'T2', category: 'Therapy Zone', occupied: true },
    { id: 'T3', category: 'Therapy Zone', occupied: false },
    { id: 'T4', category: 'Therapy Zone', occupied: false },
    { id: 'T5', category: 'Therapy Zone', occupied: false },
    // Recovery bay
    { id: 'R1', category: 'Recovery Bay', occupied: true },
    { id: 'R2', category: 'Recovery Bay', occupied: true },
    { id: 'R3', category: 'Recovery Bay', occupied: false },
    { id: 'R4', category: 'Recovery Bay', occupied: true },
    { id: 'R5', category: 'Recovery Bay', occupied: false },
    // Observation Units
    { id: 'O1', category: 'Observation', occupied: true },
    { id: 'O2', category: 'Observation', occupied: false },
    { id: 'O3', category: 'Observation', occupied: true },
    { id: 'O4', category: 'Observation', occupied: true },
    { id: 'O5', category: 'Observation', occupied: true }
  ]);

  // staff clinician lists
  const [staff, setStaff] = useState<Staff[]>([
    { id: 'dr_morgan', name: 'Dr. Arthur Morgan', specialty: 'Spine Specialist • In Clinic', status: 'active', initials: 'AM' },
    { id: 'dr_miller', name: 'Dr. Linda Miller', specialty: 'Sports Medicine • Surgery', status: 'away', initials: 'LM' },
    { id: 'sr_sarah', name: 'Sr. Sarah Kim', specialty: 'Senior Physiotherapist • In Clinic', status: 'active', initials: 'SK' }
  ]);

  // ACTIONS WIRING

  const handleUpdateMetric = (id: string, val: number) => {
    setMetrics(prev => prev.map(m => m.id === id ? { ...m, value: val } : m));
    const metric = metrics.find(m => m.id === id);
    if (metric) {
      triggerToast(`Logged clinical metric: ${metric.name} now at ${val}%`);
    }
  };

  const handleAddActivity = (act: ActivityType) => {
    setActivities(prev => [act, ...prev]);
  };

  const handleConfirmUpcomingPresence = () => {
    triggerToast('Secure check-in received! Presence validated on Re-Live hospital servers.');
  };

  const handleBookAppt = (newApt: Appointment) => {
    // Add to pending approvals array for admin to review!
    setAppointments(prev => [...prev, newApt]);
    triggerToast(`Booking submitted! Dr. Thompson’s reception has received your slot.`);
  };

  const handleUploadRecord = (newRec: MedicalRecord) => {
    setRecords(prev => [newRec, ...prev]);
    triggerToast(`Document "${newRec.name}" uploaded securely!`);
  };

  const handlePayDues = () => {
    setDuesPaid(true);
    triggerToast("Ledger balance cleared! Thank you for your payment.");
  };

  // Admin approves / reschedule / declines are handled here
  const handleActionAppointment = (id: string, action: 'accepted' | 'declined' | 'rescheduled') => {
    const matched = appointments.find(a => a.id === id);
    if (!matched) return;

    if (action === 'accepted') {
      setAppointments(prev => prev.filter(a => a.id !== id));
      triggerToast(`Accepted booking request for ${matched.patientName}!`);
    } else if (action === 'declined') {
      setAppointments(prev => prev.filter(a => a.id !== id));
      triggerToast(`Decline notification sent to ${matched.patientName}.`);
    } else if (action === 'rescheduled') {
      triggerToast(`Rescheduled check-in processed for ${matched.patientName}.`);
    }
  };

  const handleToggleBed = (id: string) => {
    setBeds(prev => prev.map(b => b.id === id ? { ...b, occupied: !b.occupied } : b));
    const bed = beds.find(b => b.id === id);
    if (bed) {
      triggerToast(`Marked Bed ${id} as ${bed.occupied ? 'Available' : 'Occupied'}`);
    }
  };

  const handleToggleStaff = (id: string) => {
    setStaff(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'active' ? 'away' : 'active' } : s));
    const matched = staff.find(s => s.id === id);
    if (matched) {
      triggerToast(`${matched.name} is now ${matched.status === 'active' ? 'Away' : 'Active'}`);
    }
  };

  const [showEmergencyHotline, setShowEmergencyHotline] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-secondary/20 selection:text-secondary">
      
      {/* Dynamic Toast Portal */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-[120] bg-primary text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in border border-white/10 max-w-sm">
          <div className="w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0">
            ✓
          </div>
          <div className="text-xs">
            <p className="font-bold">System Notification</p>
            <p className="opacity-80 mt-0.5">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Role Switcher Sandbox Header Panel (Developer control bar) */}
      <div className="bg-primary-container text-primary text-xs py-3 px-6 md:px-16 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-white/5 relative z-50">
        <div className="flex items-center gap-2">
          <Sparkles className="text-secondary h-4 w-4 animate-pulse" />
          <span className="font-semibold text-slate-200">
            <strong>Interactive Portal Switcher:</strong> Explore the platform through different stakeholder perspectives:
          </span>
        </div>
        
        <div className="flex bg-primary/45 p-1 rounded-xl gap-1">
          <button 
            onClick={() => setCurrentRole('landing')}
            className={`px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-all cursor-pointer text-[10px] ${
              currentRole === 'landing' 
                ? 'bg-secondary text-white' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Practice Website
          </button>
          
          <button 
            onClick={() => {
              setCurrentRole('patient');
              setPatientSubView('dashboard');
            }}
            className={`px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-all cursor-pointer text-[10px] ${
              currentRole === 'patient' && patientSubView === 'dashboard'
                ? 'bg-secondary text-white' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Patient Dashboard (Alex)
          </button>

          <button 
            onClick={() => {
              setCurrentRole('patient');
              setPatientSubView('records');
            }}
            className={`px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-all cursor-pointer text-[10px] ${
              currentRole === 'patient' && patientSubView === 'records'
                ? 'bg-secondary text-white' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Digital Prescriptions
          </button>

          <button 
            onClick={() => setCurrentRole('admin')}
            className={`px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-all cursor-pointer text-[10px] ${
              currentRole === 'admin' 
                ? 'bg-secondary text-white' 
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Clinician Admin Console
          </button>
        </div>
      </div>

      {/* Main Top Navigation Header */}
      <header className="sticky top-0 w-full z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between px-6 md:px-16 h-20 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-md">
            <Stethoscope className="h-5 w-5 text-secondary" strokeWidth={2.5} />
          </div>
          <span className="font-display font-extrabold text-lg text-primary tracking-tight">Re-Live Physiotherapy</span>
        </div>

        {/* Global Nav Menu links depending on role */}
        <nav className="hidden md:flex gap-6 items-center">
          {currentRole === 'landing' ? (
            <>
              <a href="#" className="text-primary font-bold text-xs uppercase tracking-wider hover:text-secondary">Home</a>
              <a href="#services" className="text-on-surface-variant font-bold text-xs uppercase tracking-wider hover:text-primary">Services</a>
              <a href="#about" className="text-on-surface-variant font-bold text-xs uppercase tracking-wider hover:text-primary">Clinical Excellence</a>
              <a href="#contact" className="text-on-surface-variant font-bold text-xs uppercase tracking-wider hover:text-primary">Contact Clinic</a>
            </>
          ) : currentRole === 'patient' ? (
            <>
              <button 
                onClick={() => setPatientSubView('dashboard')}
                className={`text-xs font-bold uppercase tracking-wider cursor-pointer ${
                  patientSubView === 'dashboard' ? 'text-secondary border-b-2 border-secondary pb-1' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                My Care Feed
              </button>
              <button 
                onClick={() => setPatientSubView('records')}
                className={`text-xs font-bold uppercase tracking-wider cursor-pointer ${
                  patientSubView === 'records' ? 'text-secondary border-b-2 border-secondary pb-1' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Digital Prescriptions & Reports
              </button>
            </>
          ) : (
            <>
              <span className="text-xs font-bold bg-secondary/15 text-secondary px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-secondary/25">
                <span className="h-2 w-2 rounded-full bg-secondary animate-pulse"></span>
                Rehab Bay Operational Central
              </span>
            </>
          )}
        </nav>

        {/* Action Button inside top header */}
        <div className="flex items-center gap-4">
          {currentRole === 'landing' ? (
            <button 
              onClick={() => {
                setCurrentRole('patient');
                setPatientSubView('dashboard');
                triggerToast('Redirected to patient dashboard to simulate booking.');
              }}
              className="h-10 px-5 bg-primary text-white rounded-full font-bold text-xs uppercase tracking-wider hover:opacity-90 shadow-sm transition-all cursor-pointer"
            >
              Book Consultation Slot
            </button>
          ) : currentRole === 'patient' ? (
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-primary block text-right">
                Alex Johnson
                <span className="block text-[10px] text-on-surface-variant font-medium">ID: #RL-9021</span>
              </span>
              <div 
                onClick={() => {
                  setCurrentRole('landing');
                  triggerToast('Logged out of Patient Care Portal');
                }}
                className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center text-secondary font-bold text-sm cursor-pointer hover:bg-secondary hover:text-white transition-all shadow-sm"
                title="Log Out of Portal"
              >
                AJ
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-primary block text-right">
                Dr. E. Rodriguez
                <span className="block text-[10px] text-on-surface-variant font-medium">Chief Dir</span>
              </span>
              <div 
                onClick={() => {
                  setCurrentRole('landing');
                  triggerToast('Logged out of Admin Console');
                }}
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm cursor-pointer hover:bg-primary hover:text-white transition-all"
                title="Log Out of Administration Console"
              >
                DR
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Container workspace wrapping the active view in a fluid grid */}
      <div className="flex-1 flex flex-col">
        {currentRole === 'landing' && (
          <LandingPage 
            onNavigateToPortal={(role, subView) => {
              setCurrentRole(role);
              if (role === 'patient' && subView) {
                setPatientSubView(subView as 'dashboard' | 'records');
              }
            }}
            onBookImmediate={() => {
              setCurrentRole('patient');
              setPatientSubView('dashboard');
              triggerToast('Selected. Open the Booking model in your dashboard feed!');
            }}
          />
        )}

        {currentRole === 'patient' && (
          <div className="max-w-7xl mx-auto px-6 md:px-16 py-8 w-full">
            {patientSubView === 'dashboard' ? (
              <PatientPortal 
                upcomingAppointment={patientUpcoming}
                onConfirmPresence={handleConfirmUpcomingPresence}
                activities={activities}
                onAddActivity={handleAddActivity}
                metrics={metrics}
                onUpdateMetric={handleUpdateMetric}
                onBookAppointment={handleBookAppt}
                onNavigateToRecords={() => setPatientSubView('records')}
                duesPaid={duesPaid}
                onPayDues={handlePayDues}
              />
            ) : (
              <PatientRecords 
                records={records}
                onUploadRecord={handleUploadRecord}
                onAddActivity={handleAddActivity}
              />
            )}
          </div>
        )}

        {currentRole === 'admin' && (
          <div className="max-w-7xl mx-auto px-6 md:px-16 py-8 w-full">
            <AdminPortal 
              appointments={appointments}
              onActionAppointment={handleActionAppointment}
              beds={beds}
              onToggleBed={handleToggleBed}
              staff={staff}
              onToggleStaff={handleToggleStaff}
              onAddActivity={handleAddActivity}
            />
          </div>
        )}
      </div>

      {/* Footer system */}
      <footer className="w-full bg-primary py-12 px-6 md:px-16 text-white flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
          <div className="flex items-center gap-2">
            <Stethoscope className="text-secondary h-5 w-5" />
            <span className="font-display font-extrabold text-base">Re-Live Physiotherapy</span>
          </div>
          <p className="text-xs text-white/60">
            © 2026 Re-Live Physiotherapy Swiss Alliance. Excellence in Restorative Care.
          </p>
        </div>

        <div className="flex gap-x-6 gap-y-2 flex-wrap justify-center text-xs text-white/80">
          <a href="#" className="hover:text-secondary transition-colors">Clinical Standards</a>
          <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-secondary transition-colors">Contact Practice</a>
        </div>
      </footer>

      {/* Sticky Emergency Widget Button */}
      <div className="fixed bottom-6 right-6 z-[90]">
        <button 
          onClick={() => setShowEmergencyHotline(true)}
          className="w-16 h-16 bg-error hover:scale-105 active:scale-95 transition-all text-white rounded-full shadow-2xl flex items-center justify-center cursor-pointer group relative"
          title="Physiotherapy Emergency Dispatch Hotline"
        >
          <ShieldAlert className="h-7 w-7 animate-pulse" />
          <span className="absolute bottom-full right-0 mb-3 bg-error text-white text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Emergency Dispatch Line
          </span>
        </button>
      </div>

      {/* Emergency Hotline Dialog */}
      {showEmergencyHotline && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/45 backdrop-blur-sm" onClick={() => setShowEmergencyHotline(false)}></div>
          <div className="relative bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl border border-rose-100 text-center space-y-4">
            <div className="w-14 h-14 bg-error-container/20 text-error rounded-full flex items-center justify-center mx-auto shadow-inner">
              <ShieldAlert className="h-7 w-7" />
            </div>

            <div className="space-y-1">
              <h3 className="font-display text-base font-bold text-primary">Emergency Trauma Hotline</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Need immediate physical orthopedics advice or post-surgical brace adjustments? Call our HIPAA dispatch desk.
              </p>
            </div>

            <div className="py-2.5 bg-rose-50/50 rounded-xl">
              <span className="block text-2xl font-bold font-mono text-error">1-800-RE-LIVE-PT</span>
              <span className="block text-[9px] uppercase font-bold tracking-widest text-[#ba1a1a] mt-0.5">Available 24 Hours / 7 Days</span>
            </div>

            <button 
              onClick={() => setShowEmergencyHotline(false)}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-primary rounded-xl font-bold text-xs uppercase cursor-pointer"
            >
              Close dispatch desk
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
