import type { QueueItem, Department, Insight, ActivityFeedItem, StatsData } from '../types';

export const DEPARTMENTS = [
  'Emergency', 'Medicine', 'Orthopaedics', 'Gynaecology',
  'Paediatrics', 'ENT', 'Eye OPD', 'Dermatology', 'General OPD'
];

export const mockStats: StatsData = {
  totalToday: 1247,
  avgWaitTime: 23,
  criticalCount: 14,
  activeDepartments: 8,
};

export const mockQueue: QueueItem[] = [
  { id: '1', token: 'AYM-4821', name: 'Mohanakrishnan R', age: 55, triageLevel: 'critical', chiefComplaint: 'Severe chest pain, difficulty breathing', department: 'Emergency', waitTime: 0, status: 'called', timestamp: '09:12 AM' },
  { id: '2', token: 'AYM-4822', name: 'Savitha Bhaskar', age: 62, triageLevel: 'critical', chiefComplaint: 'Fever, chest pain, breathlessness', department: 'Emergency', waitTime: 0, status: 'in-consultation', timestamp: '09:15 AM' },
  { id: '3', token: 'AYM-4823', name: 'Ganesh Prabhu', age: 45, triageLevel: 'critical', chiefComplaint: 'Severe breathing difficulty, high fever', department: 'Emergency', waitTime: 0, status: 'waiting', timestamp: '09:22 AM' },
  { id: '4', token: 'AYM-4824', name: 'Deepika Nambiar', age: 28, triageLevel: 'moderate', chiefComplaint: 'Fever for 5 days, weakness', department: 'Medicine', waitTime: 18, status: 'waiting', timestamp: '09:30 AM' },
  { id: '5', token: 'AYM-4825', name: 'Abdul Kareem', age: 35, triageLevel: 'moderate', chiefComplaint: 'Back pain for 2 months', department: 'Orthopaedics', waitTime: 22, status: 'called', timestamp: '09:33 AM' },
  { id: '6', token: 'AYM-4826', name: 'Parvathy Ammal', age: 32, triageLevel: 'moderate', chiefComplaint: 'Pregnancy check-up, 6 months', department: 'Gynaecology', waitTime: 15, status: 'in-consultation', timestamp: '09:35 AM' },
  { id: '7', token: 'AYM-4827', name: 'Thyagarajan K', age: 50, triageLevel: 'moderate', chiefComplaint: 'Diabetes medication follow-up', department: 'Medicine', waitTime: 25, status: 'waiting', timestamp: '09:40 AM' },
  { id: '8', token: 'AYM-4828', name: 'Shyamala Devi', age: 41, triageLevel: 'moderate', chiefComplaint: 'Knee pain for 1 month', department: 'Orthopaedics', waitTime: 28, status: 'waiting', timestamp: '09:42 AM' },
  { id: '9', token: 'AYM-4829', name: 'Mahesh Babu', age: 22, triageLevel: 'mild', chiefComplaint: 'Cold and cough for 3 days', department: 'General OPD', waitTime: 35, status: 'waiting', timestamp: '09:45 AM' },
  { id: '10', token: 'AYM-4830', name: 'Kalyani Srinivas', age: 19, triageLevel: 'mild', chiefComplaint: 'Skin rash, itching', department: 'Dermatology', waitTime: 40, status: 'called', timestamp: '09:48 AM' },
  { id: '11', token: 'AYM-4831', name: 'Siddharth Pillai', age: 60, triageLevel: 'moderate', chiefComplaint: 'BP medication, dizziness', department: 'Medicine', waitTime: 20, status: 'waiting', timestamp: '09:50 AM' },
  { id: '12', token: 'AYM-4832', name: 'Ayesha Fathima', age: 38, triageLevel: 'mild', chiefComplaint: 'Headache for 2 days', department: 'General OPD', waitTime: 45, status: 'waiting', timestamp: '09:52 AM' },
  { id: '13', token: 'AYM-4833', name: 'Venkata Subbiah', age: 8, triageLevel: 'moderate', chiefComplaint: 'High fever, vomiting', department: 'Paediatrics', waitTime: 12, status: 'called', timestamp: '09:55 AM' },
  { id: '14', token: 'AYM-4834', name: 'Janaki Raman', age: 70, triageLevel: 'mild', chiefComplaint: 'Blurred vision', department: 'Eye OPD', waitTime: 38, status: 'waiting', timestamp: '09:58 AM' },
  { id: '15', token: 'AYM-4835', name: 'Harihara Subramaniam', age: 29, triageLevel: 'mild', chiefComplaint: 'Ear pain for 4 days', department: 'ENT', waitTime: 42, status: 'waiting', timestamp: '10:00 AM' },
];

export const mockDepartments: Department[] = [
  { name: 'Emergency', patientCount: 8, avgWaitMinutes: 2, capacity: 15, status: 'critical' },
  { name: 'Medicine', patientCount: 34, avgWaitMinutes: 28, capacity: 50, status: 'busy' },
  { name: 'Orthopaedics', patientCount: 19, avgWaitMinutes: 25, capacity: 30, status: 'normal' },
  { name: 'Gynaecology', patientCount: 12, avgWaitMinutes: 18, capacity: 20, status: 'normal' },
  { name: 'Paediatrics', patientCount: 22, avgWaitMinutes: 15, capacity: 30, status: 'normal' },
  { name: 'ENT', patientCount: 9, avgWaitMinutes: 30, capacity: 15, status: 'normal' },
  { name: 'Eye OPD', patientCount: 14, avgWaitMinutes: 35, capacity: 20, status: 'normal' },
  { name: 'Dermatology', patientCount: 7, avgWaitMinutes: 22, capacity: 15, status: 'normal' },
];

export const mockInsights: Insight[] = [
  { icon: '🚨', message: '3 patients flagged with potential cardiac symptoms — auto-routed to Emergency', severity: 'high' },
  { icon: '⏱️', message: 'Medicine OPD wait time predicted to exceed 45 min in next 30 minutes. Recommend opening Counter 2.', severity: 'medium' },
  { icon: '📊', message: 'Peak hour predicted: 11:00 AM – 1:00 PM. Recommend 2 extra floor staff.', severity: 'low' },
];

export const mockFeed: ActivityFeedItem[] = [
  { time: '10:02 AM', token: 'AYM-4835', name: 'Harihara Subramaniam', triageLevel: 'mild', department: 'ENT' },
  { time: '09:58 AM', token: 'AYM-4834', name: 'Janaki Raman', triageLevel: 'mild', department: 'Eye OPD' },
  { time: '09:55 AM', token: 'AYM-4833', name: 'Venkata Subbiah', triageLevel: 'moderate', department: 'Paediatrics' },
  { time: '09:52 AM', token: 'AYM-4832', name: 'Ayesha Fathima', triageLevel: 'mild', department: 'General OPD' },
  { time: '09:50 AM', token: 'AYM-4831', name: 'Siddharth Pillai', triageLevel: 'moderate', department: 'Medicine' },
  { time: '09:48 AM', token: 'AYM-4830', name: 'Kalyani Srinivas', triageLevel: 'mild', department: 'Dermatology' },
  { time: '09:45 AM', token: 'AYM-4829', name: 'Mahesh Babu', triageLevel: 'mild', department: 'General OPD' },
  { time: '09:42 AM', token: 'AYM-4828', name: 'Shyamala Devi', triageLevel: 'moderate', department: 'Orthopaedics' },
  { time: '09:40 AM', token: 'AYM-4827', name: 'Thyagarajan K', triageLevel: 'moderate', department: 'Medicine' },
  { time: '09:35 AM', token: 'AYM-4826', name: 'Parvathy Ammal', triageLevel: 'moderate', department: 'Gynaecology' },
];

const randomNames = [
  'Ramachandran Nair', 'Bhavana Shenoy', 'Muthuvel Pandian', 'Sujatha Devi',
  'Prabhakaran Thampi', 'Lalitha Amma', 'Vishwanath Joshi', 'Anupama Shenoy',
  'Gopalakrishnan', 'Shyamala Warrier', 'Dinesh Prabhu', 'Mala Chandran'
];
const randomComplaints = [
  'High fever for 2 days', 'Stomach pain', 'Headache',
  'Itching and rash', 'Knee swelling', 'Ear discharge',
  'Redness in eye, burning', 'Cough for 1 week', 'Weakness and dizziness',
  'Lower back pain', 'Vomiting and loose motion', 'Unable to sleep'
];

export function generateRandomPatient(): QueueItem {
  const triageLevels: Array<'critical' | 'moderate' | 'mild'> = ['mild', 'mild', 'moderate', 'moderate', 'moderate', 'critical'];
  const triageLevel = triageLevels[Math.floor(Math.random() * triageLevels.length)];
  const departments: Record<string, string[]> = {
    critical: ['Emergency'],
    moderate: ['Medicine', 'Orthopaedics', 'Gynaecology', 'Paediatrics'],
    mild: ['General OPD', 'ENT', 'Eye OPD', 'Dermatology']
  };
  const deptList = departments[triageLevel];
  const department = deptList[Math.floor(Math.random() * deptList.length)];
  const waitTimes: Record<string, number> = { critical: 0, moderate: Math.floor(Math.random() * 20) + 10, mild: Math.floor(Math.random() * 30) + 30 };
  const name = randomNames[Math.floor(Math.random() * randomNames.length)];
  const complaint = randomComplaints[Math.floor(Math.random() * randomComplaints.length)];
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  return {
    id: crypto.randomUUID(),
    token: `AYM-${Math.floor(1000 + Math.random() * 9000)}`,
    name,
    age: Math.floor(Math.random() * 60) + 5,
    triageLevel,
    chiefComplaint: complaint,
    department,
    waitTime: waitTimes[triageLevel],
    status: 'waiting',
    timestamp: timeStr,
  };
}
