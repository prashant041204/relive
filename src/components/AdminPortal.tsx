import React, { useState } from 'react';
import { 
  Users, 
  Bed, 
  DollarSign, 
  Check, 
  X, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Building, 
  TrendingUp, 
  Activity, 
  CircleDot, 
  Search, 
  Plus, 
  Stethoscope, 
  CheckCircle,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';
import { Appointment, Bed as BedType, Staff, Activity as ActivityType } from '../types';

interface AdminPortalProps {
  appointments: Appointment[];
  onActionAppointment: (id: string, action: 'accepted' | 'declined' | 'rescheduled') => void;
  beds: BedType[];
  onToggleBed: (id: string) => void;
  staff: Staff[];
  onToggleStaff: (id: string) => void;
  onAddActivity: (activity: ActivityType) => void;
}

export default function AdminPortal({
  appointments,
  onActionAppointment,
  beds,
  onToggleBed,
  staff,
  onToggleStaff,
  onAddActivity
}: AdminPortalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [rescheduleId, setRescheduleId] = useState<string | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState('2026-06-25');
  const [rescheduleTime, setRescheduleTime] = useState('11:30 AM');

  const pendingAppointments = appointments.filter(a => a.status === 'pending');

  // Compute live statistics based on real-time bed statuses
  const totalBedsCount = beds.length;
  const occupiedBedsCount = beds.filter(b => b.occupied).length;
  const occupiedPercentage = Math.round((occupiedBedsCount / totalBedsCount) * 100);

  // Daily revenue trend graph heights
  const chartData = [
    { day: 'Mon', value: 1200, height: 40 },
    { day: 'Tue', value: 1800, height: 60 },
    { day: 'Wed', value: 1350, height: 45 },
    { day: 'Thu', value: 2400, height: 80 },
    { day: 'Fri', value: 1650, height: 55 },
    { day: 'Sat', value: 2850, height: 95 },
    { day: 'Sun', value: 900, height: 30 }
  ];

  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  const handleRescheduleSubmit = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    onActionAppointment(id, 'rescheduled');
    setRescheduleId(null);
    const appointment = appointments.find(a => a.id === id);
    if (appointment) {
      onAddActivity({
        id: Math.random().toString(),
        type: 'billing',
        title: 'Appointment Postponed',
        description: `Rescheduled ${appointment.patientName} for ${rescheduleDate} at ${rescheduleTime}.`,
        date: 'Today'
      });
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Admin Hero Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-outline">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-secondary/20 shrink-0">
            <img 
              className="w-full h-full object-cover" 
              alt="Elena Rodriguez clinical headshot" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6UcGbtD0cBbj5KPZGwd4eTYofmY0dKmmjn4zWmf4iwYoIybKQ3foJnaVS3JbKTDBDh27fdYkDkzBlyMUrETV1Ta0XFKQGbhY72bkuc_j5M8H6lAo_pkfeSGaUJqMnxm_onHlEsVyhY_rcj_xkN2sNknswhzcUHewwmJV8tePtuBSLd1gVIFY5entOtiNzVdxt6P3NWncDIbWyKU0Hxg1WNWaP31BEeaJlvHXgFQJyLU1u__T1kpTDD0ku392ReeNyLSTr3QRG8Yaz"
            />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-primary">Chief Doctor Elena Rodriguez</h1>
            <p className="text-on-surface-variant text-xs">Lead Medical Director & Consultant • Re-Live Physiotherapy</p>
          </div>
        </div>

        <div className="mt-4 md:mt-0 flex max-w-sm w-full relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant" />
          <input 
            type="text"
            className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-xl outline-none focus:bg-white text-xs text-primary font-medium"
            placeholder="Search active patients, diagnosis hash..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* KPI Stats Block */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between h-40 relative overflow-hidden shadow-sm border border-outline">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xs font-bold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">
              +12.4% vs last week
            </span>
          </div>
          <div>
            <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider">Total Active Patients</p>
            <h3 className="font-display text-3xl font-bold text-primary mt-1">1,482</h3>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between h-40 relative overflow-hidden shadow-sm border border-outline">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
              <Bed className="h-5 w-5 text-secondary" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-16 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-secondary-container bg-secondary" style={{ width: `${occupiedPercentage}%` }}></div>
              </div>
              <span className="text-xs font-bold text-primary font-mono">{occupiedBedsCount} / {totalBedsCount}</span>
            </div>
          </div>
          <div>
            <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider">Bed Occupancy Rate</p>
            <h3 className="font-display text-3xl font-bold text-primary mt-1">{occupiedPercentage}%</h3>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between h-40 relative overflow-hidden shadow-sm border border-outline">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant bg-slate-100 px-3 py-1 rounded-full">
              Live updates
            </span>
          </div>
          <div>
            <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider">Today's Net Revenue</p>
            <h3 className="font-display text-3xl font-bold text-primary mt-1">$4,290.00</h3>
          </div>
        </div>
      </div>

      {/* Main Core Bento Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Pending approvals list */}
        <section className="lg:col-span-8 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-display text-lg font-bold text-primary">
              Appointment Queue Approvals ({pendingAppointments.length})
            </h2>
            <button className="text-xs font-bold text-secondary hover:underline cursor-pointer">
              View Outpatient Ledger
            </button>
          </div>

          <div className="space-y-3">
            {pendingAppointments.length === 0 ? (
              <div id="empty-queue-card" className="bg-slate-50 border border-slate-100 text-center py-12 rounded-2xl space-y-2">
                <CheckCircle className="h-10 w-10 text-secondary mx-auto" />
                <h4 className="font-display font-bold text-primary">All Approvals Clear!</h4>
                <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                  Physiotherapists have audited and approved all scheduling requests for the week.
                </p>
              </div>
            ) : (
              pendingAppointments.map((appt) => (
                <div 
                  key={appt.id}
                  className="p-4 bg-white border border-slate-100 rounded-2xl flex flex-col md:flex-row items-center gap-4 hover:border-secondary transition-colors"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                    <img 
                      className="w-full h-full object-cover" 
                      alt={appt.patientName}
                      src={appt.id.includes('Miller') || appt.patientName.includes('Thomas')
                        ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGgBQabtIfs8_IU3KEZ6pNSAtznfIYehBMdr2PyhZPLMjkQ4PD9CSP71HOL7wifxUU0TxXWv2sxdrj-unhpC-oAccKGpEE0zrIDVRgFHRJIcJGNJpw17wNukQ-ehJHPWHLwcziFswylfNarEQy8Aqa0BGpcQujR1fNPTF9TnBXpyahkepqvZ2OFPeJCEHSnlZ5l65bGAWxjni0lIAjC21Gd1_X2_kMDBCJ_aWu8RXcVLqZRBHMcSpB66R-MPUP5bTlA1LtMn4FWkUZ'
                        : appt.patientName.includes('Sarah')
                        ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZrtVqg0q4Ul4mK5w_O3Ghjz_j4ldBw7loeAqyHdSXqExY3zKcxPmp0KEkljECnfPnoxY4_FZtzDthelbNy1IrKPWKmXqumXvr5A48PrxkfBinonzW1ooE1N-nYo8ojmZUrHYcXceq79nwop3Z5VeUHQayATk02EEFjA0tffH_reXjl64ee-k6XW9-bzMldvJ_M3MFWff6qWsP3fxvSb5dL-WsDW36S8UtEJcob1xkqWgwWSNdmIloXlHfn6MrPGnA7qww-2jAqTlt'
                        : 'https://lh3.googleusercontent.com/aida-public/AB6AXuB597-MLEWdqQY93-xNmECaLa2WQW60wBJpqYvk309fXvPZ73ERp8WRcABsE8i8rRDYcZ9aaFj8soiCYw96QUBck9CFbtf_ySz40ff7we6D0Cyjd-UH_OFzaqtdC8MVSAjnfrSv4Eme_ioPC5e0QkdLFb51NbHUiADdEBVYLdZEEG8K3phEQro0pSPd_0tmYX8o0JMFWB0EodTbZlUhGaj4Bv0Cl7IFLr7YrehQ2Lyu3SjcAjBd_Dqb46RqLt-Mj2o9hB9KOCN2XNO1'
                      }
                    />
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <p className="font-bold text-primary font-display text-sm">{appt.patientName}</p>
                    <p className="text-xs text-on-surface-variant flex items-center justify-center md:justify-start gap-1 mt-0.5">
                      <Clock className="h-3 w-3" /> {appt.reason} • {appt.time}
                    </p>
                  </div>

                  {rescheduleId === appt.id ? (
                    <form onSubmit={(e) => handleRescheduleSubmit(e, appt.id)} className="flex flex-wrap gap-2 items-center">
                      <input 
                        type="date" 
                        value={rescheduleDate} 
                        onChange={(e) => setRescheduleDate(e.target.value)}
                        className="text-xs p-1.5 border border-slate-300 rounded-lg outline-none bg-white"
                      />
                      <button 
                        type="submit"
                        className="text-[10px] bg-secondary text-white font-bold h-8 px-3 rounded-lg cursor-pointer"
                      >
                        Confirm
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setRescheduleId(null)}
                        className="text-xs text-slate-400 hover:text-slate-600 font-bold px-1"
                      >
                        ✕
                      </button>
                    </form>
                  ) : (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          onActionAppointment(appt.id, 'accepted');
                          onAddActivity({
                            id: Math.random().toString(),
                            type: 'attendance',
                            title: 'Appointment Approved',
                            description: `Confirmed orthopedic recovery rehab with ${appt.patientName} for tomorrow.`,
                            date: 'Today'
                          });
                        }}
                        className="h-8 px-3 bg-secondary hover:brightness-[1.05] text-white text-[10px] font-bold uppercase rounded-lg cursor-pointer transition-all"
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => setRescheduleId(appt.id)}
                        className="h-8 px-3 border border-slate-300 hover:bg-slate-50 text-primary text-[10px] font-bold uppercase rounded-lg cursor-pointer transition-all"
                      >
                        Reschedule
                      </button>
                      <button 
                        onClick={() => {
                          onActionAppointment(appt.id, 'declined');
                          onAddActivity({
                            id: Math.random().toString(),
                            type: 'billing',
                            title: 'Rejected Clinician Request',
                            description: `Physio declined appointment request from ${appt.patientName}.`,
                            date: 'Today'
                          });
                        }}
                        className="h-8 w-8 text-error bg-error-container/10 border border-error-container/20 hover:bg-error-container hover:text-white rounded-lg flex items-center justify-center cursor-pointer transition-all"
                        title="Reject Appointment"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </section>

        {/* RIGHT COLUMN: Beds Status Console */}
        <section className="lg:col-span-4 space-y-4">
          <div className="flex justify-between items-center bg-slate-50/50 p-1.5 rounded-lg">
            <h2 className="font-display text-sm font-bold text-primary">Bed Status Layout</h2>
            <div className="flex gap-2 text-[10px] font-semibold">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-secondary"></span> Available
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-error"></span> Occupied
              </span>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-outline shadow-sm space-y-4">
            
            {/* Interactive Therapy Zone */}
            <div>
              <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Therapy Zone</p>
              <div className="grid grid-cols-5 gap-2">
                {beds.filter(b => b.category === 'Therapy Zone').map((bed) => (
                  <button 
                    key={bed.id}
                    onClick={() => onToggleBed(bed.id)}
                    className={`h-11 rounded-xl text-white font-mono text-[10px] font-bold flex items-center justify-center transition-all cursor-pointer select-none active:scale-95 ${
                      bed.occupied 
                        ? 'bg-error text-white hover:brightness-[1.1] shadow-sm shadow-error/15' 
                        : 'bg-secondary text-white hover:brightness-[1.05] shadow-sm shadow-secondary/15'
                    }`}
                    title={`Click to mark ${bed.id} ${bed.occupied ? 'Available' : 'Occupied'}`}
                  >
                    {bed.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Recovery Bay */}
            <div>
              <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Recovery Bay</p>
              <div className="grid grid-cols-5 gap-2">
                {beds.filter(b => b.category === 'Recovery Bay').map((bed) => (
                  <button 
                    key={bed.id}
                    onClick={() => onToggleBed(bed.id)}
                    className={`h-11 rounded-xl text-white font-mono text-[10px] font-bold flex items-center justify-center transition-all cursor-pointer select-none active:scale-95 ${
                      bed.occupied 
                        ? 'bg-error text-white hover:brightness-[1.1] shadow-sm shadow-error/15' 
                        : 'bg-secondary text-white hover:brightness-[1.05] shadow-sm shadow-secondary/15'
                    }`}
                    title={`Click to mark ${bed.id} ${bed.occupied ? 'Available' : 'Occupied'}`}
                  >
                    {bed.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Observation Unit */}
            <div>
              <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Observation</p>
              <div className="grid grid-cols-5 gap-2">
                {beds.filter(b => b.category === 'Observation').map((bed) => (
                  <button 
                    key={bed.id}
                    onClick={() => onToggleBed(bed.id)}
                    className={`h-11 rounded-xl text-white font-mono text-[10px] font-bold flex items-center justify-center transition-all cursor-pointer select-none active:scale-95 ${
                      bed.occupied 
                        ? 'bg-error text-white hover:brightness-[1.1] shadow-sm shadow-error/15' 
                        : 'bg-secondary text-white hover:brightness-[1.05] shadow-sm shadow-secondary/15'
                    }`}
                    title={`Click to mark ${bed.id} ${bed.occupied ? 'Available' : 'Occupied'}`}
                  >
                    {bed.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Warning block if capacity goes high */}
            {occupiedPercentage >= 75 && (
              <div className="p-3 bg-error-container/20 border border-error-container/30 rounded-xl flex items-start gap-2 pt-3">
                <AlertTriangle className="text-error h-4 w-4 mt-0.5 shrink-0" />
                <div className="space-y-0.5">
                  <p className="font-bold text-[11px] text-error">Critical Capacity Met ({occupiedPercentage}%)</p>
                  <p className="text-[10px] text-on-surface-variant leading-tight">
                    Recovery bays are reaching bounds. Expedite rehabilitation discharge or shift outpatient routines.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Bottom Grid: SVG Revenue trend + Staff active status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* SVG Revenue Charts */}
        <div className="glass-card p-6 rounded-2xl border border-outline shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-50">
            <h3 className="font-display text-base font-bold text-primary">Daily Revenue Trend</h3>
            <span className="text-xs font-semibold text-secondary-container bg-secondary/15 px-3 py-1 rounded-full border border-secondary/25">
              Weekly sum: $12,700
            </span>
          </div>

          <div className="h-44 w-full flex items-end gap-3 px-2 pb-1 border-b border-l border-slate-200 pt-6">
            {chartData.map((bar, idx) => (
              <div 
                key={bar.day} 
                className="flex-1 flex flex-col items-center group relative cursor-pointer"
                onMouseEnter={() => setHoveredBarIndex(idx)}
                onMouseLeave={() => setHoveredBarIndex(null)}
              >
                {/* SVG Column column representation */}
                <div 
                  className={`w-full rounded-t-md transition-all duration-300 ${
                    hoveredBarIndex === idx 
                      ? 'bg-primary' 
                      : bar.day === 'Mon' || bar.day === 'Sat' ? 'bg-primary/95' : 'bg-primary/25 hover:bg-primary/75'
                  }`}
                  style={{ height: `${bar.height}%`, minHeight: '6%' }}
                ></div>

                {/* Popover hover stats */}
                <div className={`absolute bottom-full mb-1 bg-primary text-white text-[10px] px-2 py-1 rounded-md font-mono whitespace-nowrap shadow-lg pointer-events-none transition-all duration-200 ${
                  hoveredBarIndex === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}>
                  {bar.day}: ${bar.value}
                </div>

                {/* Day label */}
                <span className="text-[10px] text-on-surface-variant font-semibold mt-2">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Staff Availability Roster list */}
        <div className="glass-card p-6 rounded-2xl border border-outline shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-50">
            <h3 className="font-display text-base font-bold text-primary">Physician & Care Staff Availability</h3>
            <Stethoscope className="text-secondary h-4 w-4" />
          </div>

          <p className="text-xs text-on-surface-variant">
            Mark staff status as Active or Away to coordinate booking slots and patient delegations.
          </p>

          <div className="space-y-3">
            {staff.map((st) => (
              <div 
                key={st.id}
                onClick={() => {
                  onToggleStaff(st.id);
                  onAddActivity({
                    id: Math.random().toString(),
                    type: 'attendance',
                    title: 'Clinician Status Update',
                    description: `${st.name} set to: ${st.status === 'active' ? 'Away' : 'Active'}`,
                    date: 'Today'
                  });
                }}
                className="p-3 rounded-xl border border-slate-50 hover:border-slate-200 hover:bg-slate-50 flex items-center justify-between cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-mono text-[10px] font-bold">
                    {st.initials}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-primary">{st.name}</h4>
                    <p className="text-[10px] text-on-surface-variant mt-0.5">{st.specialty}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold select-none ${
                    st.status === 'active' 
                      ? 'bg-secondary/10 text-secondary' 
                      : 'bg-slate-100 text-on-surface-variant'
                  }`}>
                    {st.status === 'active' ? 'Active In-Clinic' : 'Away / Off-Call'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
