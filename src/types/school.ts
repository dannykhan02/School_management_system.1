export interface Student {
  id: string;
  name: string;
  email: string;
  admissionNumber: string;
  classId: string;
  className: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female';
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  avatar?: string;
  enrollmentDate: string;
  feeBalance: number;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  staffId: string;
  subjects: string[];
  classes: string[];
  phone: string;
  dateOfJoining: string;
  avatar?: string;
}

export interface Class {
  id: string;
  name: string;
  level: string;
  stream: string;
  teacherId: string;
  teacherName: string;
  studentCount: number;
  subjects: string[];
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  markedBy: string;
  notes?: string;
}

export interface FeeStructure {
  id: string;
  className: string;
  term: string;
  year: string;
  tuitionFee: number;
  activityFee: number;
  examFee: number;
  totalFee: number;
}

export interface FeePayment {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  date: string;
  method: 'Cash' | 'Bank Transfer' | 'Mobile Money';
  reference: string;
  term: string;
  year: string;
  receivedBy: string;
}
