import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Trash2, 
  Eye, 
  Download, 
  Printer, 
  CloudUpload, 
  Check, 
  Play, 
  Pause, 
  RotateCcw, 
  FileCheck, 
  ShieldCheck, 
  Tag, 
  Smartphone, 
  CheckCircle2, 
  BookOpen, 
  TrendingUp, 
  ChevronRight,
  FileCode,
  Image as ImageIcon
} from 'lucide-react';
import { MedicalRecord, Activity } from '../types';

interface PatientRecordsProps {
  records: MedicalRecord[];
  onUploadRecord: (record: MedicalRecord) => void;
  onAddActivity: (activity: Activity) => void;
}

export default function PatientRecords({
  records,
  onUploadRecord,
  onAddActivity
}: PatientRecordsProps) {
  // Drag and drop state
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dynamic exercise tracker state
  const [activeExercise, setActiveExercise] = useState<'quads' | 'slr' | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(10);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerRound, setTimerRound] = useState(1);
  const [totalRounds, setTotalRounds] = useState(15);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Preview file trigger
  const [previewDoc, setPreviewDoc] = useState<MedicalRecord | null>(null);

  // Handling exercise timer
  const startTimer = (exercise: 'quads' | 'slr') => {
    setActiveExercise(exercise);
    if (exercise === 'quads') {
      setTimerSeconds(10);
      setTotalRounds(15);
    } else {
      setTimerSeconds(5); // SLR hold is shorter
      setTotalRounds(10);
    }
    setTimerRound(1);
    setIsTimerRunning(true);

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    timerIntervalRef.current = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          // Play a simple soft synthesized tick or log round
          setTimerRound((r) => {
            if (r >= (exercise === 'quads' ? 15 : 10)) {
              if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
              setIsTimerRunning(false);
              
              // Add activity log
              onAddActivity({
                id: Math.random().toString(),
                type: 'attendance',
                title: `Completed Prescription Exercise`,
                description: `Successfully finished routine reps of ${exercise === 'quads' ? 'Isometric Quad Sets' : 'Straight Leg Raises (SLR)'}.`,
                date: 'Today'
              });

              return r;
            }
            return r + 1;
          });
          return exercise === 'quads' ? 10 : 5; // Reset timer for next round
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  };

  const resumeTimer = () => {
    setIsTimerRunning(true);
    timerIntervalRef.current = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          setTimerRound((r) => {
            if (r >= (activeExercise === 'quads' ? 15 : 10)) {
              if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
              setIsTimerRunning(false);
              return r;
            }
            return r + 1;
          });
          return activeExercise === 'quads' ? 10 : 5;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setTimerSeconds(activeExercise === 'quads' ? 10 : 5);
    setTimerRound(1);
  };

  // Drag and drop events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      
      const recordType: 'pdf' | 'jpg' | 'png' | 'dicom' = 
        ext === 'pdf' ? 'pdf' : 
        (ext === 'jpg' || ext === 'jpeg') ? 'jpg' :
        ext === 'png' ? 'png' : 'dicom';

      const newRecord: MedicalRecord = {
        id: Math.random().toString(),
        name: file.name.replace(/\.[^/.]+$/, ""), // remove extension in UI
        date: 'June 19, 2026',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: recordType,
        category: file.name.toLowerCase().includes('mri') ? 'MRI' : 
                  file.name.toLowerCase().includes('xray') ? 'X-Ray' : 'Other'
      };

      onUploadRecord(newRecord);
      
      onAddActivity({
        id: Math.random().toString(),
        type: 'prescription',
        title: 'Uploaded Medical Document',
        description: `Successfully uploaded: ${file.name} (${newRecord.size}) for orthopedic review.`,
        date: 'Today'
      });
    }
  };

  const printPrescription = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 border-b border-outline">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-container/15 text-on-secondary-container rounded-full text-xs font-bold mb-3 uppercase tracking-wider">
            Patient Care Portal
          </span>
          <h2 className="font-display text-3xl font-bold text-primary">Medical Documents</h2>
          <p className="text-on-surface-variant text-sm mt-1 max-w-xl">
            Access secure digital prescriptions, medical imaging reports, and diagnostic documents validated by Dr. Sarah Miller.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={printPrescription}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-full text-primary font-medium text-xs uppercase tracking-wider hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
          >
            <Printer className="h-4 w-4" /> Print Prescription
          </button>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-white rounded-full font-medium text-xs uppercase tracking-wider hover:bg-opacity-95 shadow-md transition-all cursor-pointer"
          >
            <CloudUpload className="h-4 w-4" /> Upload New
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COMPONENT: Digital Prescription sheet */}
        <section className="lg:col-span-7">
          <div className="glass-card rounded-[2rem] p-6 md:p-8 relative overflow-hidden border border-outline shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[5rem] pointer-events-none"></div>

            {/* Title / Header */}
            <div className="flex justify-between items-start mb-6 border-b border-slate-100 pb-5">
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-primary-container rounded-xl flex items-center justify-center text-on-primary-container">
                  <FileText className="h-7 w-7 text-secondary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-primary">Digital Prescription</h3>
                  <p className="text-on-surface-variant text-xs">REF: #RX-2024-8831 | Issued: Oct 24, 2024</p>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Lead Prescriber</p>
                <p className="font-bold text-primary text-sm">Dr. Sarah Miller, DPT</p>
              </div>
            </div>

            {/* Diagnosis details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-secondary border-slate-200">
                  <p className="text-[10px] text-secondary uppercase font-bold tracking-wider mb-1">Primary Diagnosis</p>
                  <p className="text-lg font-bold font-display text-primary leading-tight">ACL Grade 2 Tear</p>
                  <p className="text-xs text-on-surface-variant mt-1 leading-normal">
                    Left Knee knee complex, partial structural disruption identified in MRI scans.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Patient Details</p>
                  <div className="grid grid-cols-2 text-xs border-t border-slate-50 pt-1.5 gap-y-1">
                    <span className="text-on-surface-variant">Name:</span> 
                    <span className="font-medium text-primary">Alex Johnson</span>
                    <span className="text-on-surface-variant">Age/Sex:</span> 
                    <span className="font-medium text-primary">32 / Male</span>
                    <span className="text-on-surface-variant">Weight:</span> 
                    <span className="font-medium text-primary">78 kg</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider mb-2">Rehabilitation Goal</p>
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/5">
                  <p className="text-xs italic leading-relaxed text-primary">
                    &ldquo;Restoring complete joint stability and knee flexion mobility to return to competitive weekend soccer within 12 weeks. Particular focus on patellar glides, isometric quad activation, and kinematic gait alignment.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Core Exercise Plan list with timer integration */}
            <div className="mb-6 space-y-3">
              <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Treatment Plan & Exercises</p>
              
              {/* Exercise 1 */}
              <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-secondary transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary">Isometric Quad Sets</p>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">Hold for 10s • 3 Sets of 15 Repetitions</p>
                  </div>
                </div>
                <button 
                  onClick={() => startTimer('quads')}
                  className="flex items-center gap-1 bg-secondary-container/30 text-on-secondary-container px-3 py-1.5 rounded-full text-[10px] font-bold group-hover:bg-secondary group-hover:text-white transition-all cursor-pointer border border-secondary/10"
                >
                  <Play className="h-3 w-3 fill-current" /> Start Timer
                </button>
              </div>

              {/* Exercise 2 */}
              <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-secondary transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary">Straight Leg Raises (SLR)</p>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">Controlled eccentric rate • 2 Sets of 10 Reps</p>
                  </div>
                </div>
                <button 
                  onClick={() => startTimer('slr')}
                  className="flex items-center gap-1 bg-secondary-container/30 text-on-secondary-container px-3 py-1.5 rounded-full text-[10px] font-bold group-hover:bg-secondary group-hover:text-white transition-all cursor-pointer border border-secondary/10"
                >
                  <Play className="h-3 w-3 fill-current" /> Start Timer
                </button>
              </div>

              {/* Dynamic Exercise Companion Panel */}
              {activeExercise && (
                <div className="bg-slate-50 border border-secondary/20 rounded-2xl p-4 space-y-3 relative overflow-hidden transition-all duration-300">
                  <div className="flex justify-between items-center pb-2 border-b border-secondary/5">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 bg-secondary rounded-full animate-ping"></span>
                      <h4 className="text-xs font-bold text-primary uppercase tracking-wide">
                        Live Exercise Companion: {activeExercise === 'quads' ? 'Isometric Quad Sets' : 'Straight Leg Raises'}
                      </h4>
                    </div>
                    <button 
                      onClick={() => setActiveExercise(null)}
                      className="text-slate-400 hover:text-slate-600 font-bold text-xs"
                    >
                      ✕ Close
                    </button>
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-center md:text-left">
                      <p className="text-2xl font-bold font-display text-primary tracking-tight">
                        Hold For: <span className="text-secondary text-3xl font-mono">{timerSeconds}s</span>
                      </p>
                      <p className="text-[11px] text-on-surface-variant mt-1 font-medium">
                        Complete Reps: <strong className="text-primary">{timerRound}</strong> of {totalRounds}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {isTimerRunning ? (
                        <button 
                          onClick={pauseTimer}
                          className="h-9 px-4 bg-slate-200 hover:bg-slate-300 rounded-xl text-primary font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <Pause className="h-3.5 w-3.5 fill-current" /> Pause
                        </button>
                      ) : (
                        <button 
                          onClick={resumeTimer}
                          className="h-9 px-4 bg-secondary text-white rounded-xl font-bold text-xs flex items-center gap-1 hover:brightness-[1.05] transition-all cursor-pointer"
                        >
                          <Play className="h-3.5 w-3.5 fill-current" /> Resume
                        </button>
                      )}
                      
                      <button 
                        onClick={resetTimer}
                        className="h-9 w-9 bg-slate-100 hover:bg-slate-200 rounded-xl text-primary flex items-center justify-center transition-all cursor-pointer"
                        title="Restart Rep"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-secondary transition-all duration-1000 ease-linear" 
                      style={{ width: `${(timerSeconds / (activeExercise === 'quads' ? 10 : 5)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Digital signature footer */}
            <div className="flex flex-col sm:flex-row justify-between items-end gap-6 pt-5 border-t border-slate-100 mt-8">
              <div className="space-y-3">
                <p className="text-[10px] text-on-surface-variant leading-relaxed font-semibold">
                  Secure cryptographic SHA-2 signature verified via Swiss Re-Live Ortho-Cloud server architecture.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-primary text-white text-[9px] font-bold rounded uppercase tracking-wider">
                    Encrypted
                  </span>
                  <span className="px-3 py-1 bg-secondary text-white text-[9px] font-bold rounded uppercase tracking-wider">
                    Legally Valid
                  </span>
                </div>
              </div>

              <div className="text-right w-full sm:w-auto flex-shrink-0">
                <div className="h-10 w-44 mx-auto sm:mx-0 border-b border-slate-200 mb-1 flex items-center justify-end italic font-serif text-xl text-primary font-bold opacity-80 select-none">
                  Dr. S. Miller
                </div>
                <p className="text-xs font-bold text-primary">Authorized Clinician Signatory</p>
                <p className="text-[9px] text-on-surface-variant uppercase font-medium">Dr. Sarah Miller, DPT (PT-8831)</p>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: Document History & Drag/Drop Upload Area */}
        <aside className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-[2rem] p-6 border border-outline shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-50">
              <h3 className="font-display text-base font-bold text-primary">Report History</h3>
              <span className="text-[10px] font-bold bg-slate-100 text-on-surface-variant px-3 py-1 rounded-full uppercase">
                {records.length} FILES
              </span>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {records.map((rec) => (
                <div 
                  key={rec.id}
                  className="p-3 bg-slate-50 hover:bg-slate-100/70 border border-slate-100 rounded-xl flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary border border-slate-100 shadow-sm">
                      {rec.type === 'pdf' ? (
                        <FileText className="h-5 w-5 text-secondary" />
                      ) : (
                        <ImageIcon className="h-5 w-5 text-secondary" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-primary truncate max-w-[150px]" title={rec.name}>
                        {rec.name}
                      </p>
                      <p className="text-[10px] text-on-surface-variant mt-0.5">
                        {rec.date} • {rec.size}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5">
                    <button 
                      onClick={() => setPreviewDoc(rec)}
                      className="p-1 px-2 text-[10px] font-bold text-slate-500 hover:text-secondary rounded-md" 
                      title="Quick Preview"
                    >
                      <Eye className="h-3.5 w-3.5 inline-block" /> Preview
                    </button>
                    <a 
                      href="/src/types.ts" 
                      download
                      className="p-1.5 text-slate-400 hover:text-primary transition-colors" 
                      title="Download PDF"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full py-2.5 border-2 border-dashed border-slate-200 text-on-surface-variant font-semibold text-xs tracking-wide rounded-xl hover:border-secondary hover:text-secondary transition-all cursor-pointer">
              View Archived Records
            </button>
          </div>

          {/* Interactive Drag & Drop Box */}
          <div 
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`glass-card rounded-[2rem] p-8 border-2 border-dashed transition-all text-center flex flex-col items-center justify-center ${
              dragActive 
                ? 'border-secondary bg-secondary-container/10' 
                : 'border-slate-200 hover:border-secondary/40'
            }`}
          >
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mb-4 shadow-sm border border-secondary/5">
              <CloudUpload className="h-8 w-8" />
            </div>
            
            <h4 className="font-display font-bold text-primary text-base">Upload New Documents</h4>
            <p className="text-xs text-on-surface-variant mt-2 mb-6 max-w-xs mx-auto leading-relaxed">
              Drag and drop MRI joint scans, X-ray plates, or laboratory blood reports here for secure clinical review.
            </p>

            <input 
              type="file"
              ref={fileInputRef}
              onChange={handleFileInput}
              className="hidden"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.dicom"
            />

            <button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-primary text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Browse Files Log
            </button>

            <p className="text-[9px] text-on-surface-variant mt-4 uppercase tracking-wider font-semibold">
              Max 25MB • PDF, JPG, PNG, DICOM (HIPAA Encrypted)
            </p>
          </div>
        </aside>
      </div>

      {/* MODAL: QUICK PREVIEW SYSTEM */}
      {previewDoc && (
        <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/45 backdrop-blur-sm" onClick={() => setPreviewDoc(null)}></div>
          <div className="relative bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-50">
              <div className="flex items-center gap-2">
                <FileCheck className="text-secondary h-5 w-5" />
                <h4 className="text-sm font-bold text-primary font-display">Document Viewer: {previewDoc.name}</h4>
              </div>
              <button onClick={() => setPreviewDoc(null)} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[220px]">
              {previewDoc.type === 'pdf' ? (
                <FileText className="h-16 w-16 text-slate-300" strokeWidth={1} />
              ) : (
                <ImageIcon className="h-16 w-16 text-slate-300" strokeWidth={1} />
              )}
              
              <div className="space-y-1">
                <p className="font-bold text-primary text-sm">{previewDoc.name}.{previewDoc.type}</p>
                <p className="text-xs text-on-surface-variant font-medium">Record Classification: {previewDoc.category}</p>
                <p className="text-[11px] text-slate-400">File Integrity Hash: SHA-256 Valid TLS Secure</p>
              </div>

              <div className="p-3 bg-secondary-container/10 border border-secondary/10 rounded-xl text-left max-w-sm">
                <p className="text-[11px] leading-relaxed text-on-secondary-container">
                  <strong>Clinical Note:</strong> Scans illustrate moderate ACL healing with intact structural fibers. Quadriceps exercises verify positive tension responses.
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs pt-2">
              <span className="text-on-surface-variant">Validated date: {previewDoc.date}</span>
              <button 
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 bg-primary text-white rounded-lg font-bold text-xs cursor-pointer hover:bg-opacity-95"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
