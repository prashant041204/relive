export interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  avatarUrl?: string;
  reason: string;
  time: string;
  date: string;
  status: 'pending' | 'accepted' | 'rescheduled' | 'declined';
  doctorName: string;
  room?: string;
}

export interface Activity {
  id: string;
  type: 'prescription' | 'attendance' | 'upload' | 'billing';
  title: string;
  description: string;
  date: string;
  linkText?: string;
  meta?: string;
}

export interface HealthMetric {
  id: string;
  name: string;
  value: number; // 0 to 100
}

export interface MedicalRecord {
  id: string;
  name: string;
  date: string;
  size: string;
  type: 'pdf' | 'jpg' | 'png' | 'dicom';
  category: 'MRI' | 'X-Ray' | 'Biochemical' | 'Prescription' | 'Other';
}

export interface Staff {
  id: string;
  name: string;
  specialty: string;
  status: 'active' | 'away';
  initials: string;
}

export interface Bed {
  id: string; // T1..T5, R1..R5, O1..O5
  category: 'Therapy Zone' | 'Recovery Bay' | 'Observation';
  occupied: boolean;
}

export interface Message {
  name: string;
  phone: string;
  service: string;
  message: string;
}
