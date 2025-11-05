import { Student, Teacher, Class, AttendanceRecord, FeeStructure, FeePayment } from '@/types/school';

export const mockStudents: Student[] = [
  {
    id: 's1',
    name: 'James Omondi',
    email: 'james.omondi@student.com',
    admissionNumber: 'ADM2024001',
    classId: 'c1',
    className: 'Form 4 Science',
    dateOfBirth: '2008-03-15',
    gender: 'Male',
    guardianName: 'Peter Omondi',
    guardianPhone: '+254712345678',
    guardianEmail: 'peter.omondi@email.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    enrollmentDate: '2020-01-15',
    feeBalance: 15000
  },
  {
    id: 's2',
    name: 'Grace Wanjiru',
    email: 'grace.wanjiru@student.com',
    admissionNumber: 'ADM2024002',
    classId: 'c1',
    className: 'Form 4 Science',
    dateOfBirth: '2008-07-22',
    gender: 'Female',
    guardianName: 'Mary Wanjiru',
    guardianPhone: '+254723456789',
    guardianEmail: 'mary.wanjiru@email.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Grace',
    enrollmentDate: '2020-01-15',
    feeBalance: 0
  },
  {
    id: 's3',
    name: 'Daniel Kipchoge',
    email: 'daniel.kipchoge@student.com',
    admissionNumber: 'ADM2024003',
    classId: 'c2',
    className: 'Form 3 Arts',
    dateOfBirth: '2009-05-10',
    gender: 'Male',
    guardianName: 'Joseph Kipchoge',
    guardianPhone: '+254734567890',
    guardianEmail: 'joseph.kipchoge@email.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel',
    enrollmentDate: '2021-01-15',
    feeBalance: 25000
  },
  {
    id: 's4',
    name: 'Sarah Achieng',
    email: 'sarah.achieng@student.com',
    admissionNumber: 'ADM2024004',
    classId: 'c2',
    className: 'Form 3 Arts',
    dateOfBirth: '2009-11-18',
    gender: 'Female',
    guardianName: 'Alice Achieng',
    guardianPhone: '+254745678901',
    guardianEmail: 'alice.achieng@email.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    enrollmentDate: '2021-01-15',
    feeBalance: 8000
  },
  {
    id: 's5',
    name: 'Michael Mwangi',
    email: 'michael.mwangi@student.com',
    admissionNumber: 'ADM2024005',
    classId: 'c3',
    className: 'Form 2 East',
    dateOfBirth: '2010-02-28',
    gender: 'Male',
    guardianName: 'John Mwangi',
    guardianPhone: '+254756789012',
    guardianEmail: 'john.mwangi@email.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    enrollmentDate: '2022-01-15',
    feeBalance: 12000
  }
];

export const mockTeachers: Teacher[] = [
  {
    id: 't1',
    name: 'John Kamau',
    email: 'john.kamau@school.com',
    staffId: 'STAFF001',
    subjects: ['Mathematics', 'Physics'],
    classes: ['Form 4 Science', 'Form 3 Science'],
    phone: '+254767890123',
    dateOfJoining: '2018-01-10',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnK'
  },
  {
    id: 't2',
    name: 'Catherine Mutua',
    email: 'catherine.mutua@school.com',
    staffId: 'STAFF002',
    subjects: ['English', 'Literature'],
    classes: ['Form 3 Arts', 'Form 2 East'],
    phone: '+254778901234',
    dateOfJoining: '2019-03-15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Catherine'
  },
  {
    id: 't3',
    name: 'David Otieno',
    email: 'david.otieno@school.com',
    staffId: 'STAFF003',
    subjects: ['Chemistry', 'Biology'],
    classes: ['Form 4 Science'],
    phone: '+254789012345',
    dateOfJoining: '2017-08-20',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David'
  }
];

export const mockClasses: Class[] = [
  {
    id: 'c1',
    name: 'Form 4 Science',
    level: 'Form 4',
    stream: 'Science',
    teacherId: 't1',
    teacherName: 'John Kamau',
    studentCount: 35,
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English']
  },
  {
    id: 'c2',
    name: 'Form 3 Arts',
    level: 'Form 3',
    stream: 'Arts',
    teacherId: 't2',
    teacherName: 'Catherine Mutua',
    studentCount: 32,
    subjects: ['English', 'Literature', 'History', 'Geography', 'CRE']
  },
  {
    id: 'c3',
    name: 'Form 2 East',
    level: 'Form 2',
    stream: 'East',
    teacherId: 't2',
    teacherName: 'Catherine Mutua',
    studentCount: 30,
    subjects: ['Mathematics', 'English', 'Science', 'Social Studies']
  }
];

export const mockAttendance: AttendanceRecord[] = [
  {
    id: 'a1',
    studentId: 's1',
    studentName: 'James Omondi',
    classId: 'c1',
    date: new Date().toISOString().split('T')[0],
    status: 'present',
    markedBy: 'John Kamau'
  },
  {
    id: 'a2',
    studentId: 's2',
    studentName: 'Grace Wanjiru',
    classId: 'c1',
    date: new Date().toISOString().split('T')[0],
    status: 'present',
    markedBy: 'John Kamau'
  },
  {
    id: 'a3',
    studentId: 's3',
    studentName: 'Daniel Kipchoge',
    classId: 'c2',
    date: new Date().toISOString().split('T')[0],
    status: 'absent',
    markedBy: 'Catherine Mutua',
    notes: 'Sick'
  }
];

export const mockFeeStructures: FeeStructure[] = [
  {
    id: 'fs1',
    className: 'Form 4 Science',
    term: 'Term 1',
    year: '2024',
    tuitionFee: 30000,
    activityFee: 5000,
    examFee: 3000,
    totalFee: 38000
  },
  {
    id: 'fs2',
    className: 'Form 3 Arts',
    term: 'Term 1',
    year: '2024',
    tuitionFee: 28000,
    activityFee: 5000,
    examFee: 2500,
    totalFee: 35500
  },
  {
    id: 'fs3',
    className: 'Form 2 East',
    term: 'Term 1',
    year: '2024',
    tuitionFee: 25000,
    activityFee: 4000,
    examFee: 2000,
    totalFee: 31000
  }
];

export const mockFeePayments: FeePayment[] = [
  {
    id: 'fp1',
    studentId: 's2',
    studentName: 'Grace Wanjiru',
    amount: 38000,
    date: '2024-01-15',
    method: 'Bank Transfer',
    reference: 'BT2024001',
    term: 'Term 1',
    year: '2024',
    receivedBy: 'Admin User'
  },
  {
    id: 'fp2',
    studentId: 's1',
    studentName: 'James Omondi',
    amount: 23000,
    date: '2024-01-20',
    method: 'Mobile Money',
    reference: 'MPESA2024001',
    term: 'Term 1',
    year: '2024',
    receivedBy: 'Admin User'
  }
];
