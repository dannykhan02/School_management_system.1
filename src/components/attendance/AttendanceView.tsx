"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle2, XCircle, Clock, FileWarning } from 'lucide-react';
import { mockStudents, mockClasses, mockAttendance } from '@/data/mockData';
import { AttendanceRecord } from '@/types/school';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

export function AttendanceView() {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState(mockClasses[0].id);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(mockAttendance);

  const classStudents = mockStudents.filter(s => s.classId === selectedClass);
  
  const todayAttendance = attendance.filter(
    a => a.classId === selectedClass && a.date === selectedDate
  );

  const getAttendanceStatus = (studentId: string) => {
    const record = todayAttendance.find(a => a.studentId === studentId);
    return record?.status || null;
  };

  const markAttendance = (studentId: string, status: 'present' | 'absent' | 'late' | 'excused') => {
    const existingIndex = attendance.findIndex(
      a => a.studentId === studentId && a.date === selectedDate && a.classId === selectedClass
    );

    const student = classStudents.find(s => s.id === studentId);
    
    const newRecord: AttendanceRecord = {
      id: existingIndex >= 0 ? attendance[existingIndex].id : `a${attendance.length + 1}`,
      studentId,
      studentName: student?.name || '',
      classId: selectedClass,
      date: selectedDate,
      status,
      markedBy: user?.name || 'Unknown'
    };

    if (existingIndex >= 0) {
      const newAttendance = [...attendance];
      newAttendance[existingIndex] = newRecord;
      setAttendance(newAttendance);
    } else {
      setAttendance([...attendance, newRecord]);
    }
  };

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-500"><CheckCircle2 className="h-3 w-3 mr-1" />Present</Badge>;
      case 'absent':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Absent</Badge>;
      case 'late':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Late</Badge>;
      case 'excused':
        return <Badge variant="outline"><FileWarning className="h-3 w-3 mr-1" />Excused</Badge>;
      default:
        return <Badge variant="outline">Not Marked</Badge>;
    }
  };

  const presentCount = todayAttendance.filter(a => a.status === 'present').length;
  const absentCount = todayAttendance.filter(a => a.status === 'absent').length;
  const lateCount = todayAttendance.filter(a => a.status === 'late').length;
  const attendanceRate = todayAttendance.length > 0 ? Math.round((presentCount / todayAttendance.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Attendance Management</h2>
        <p className="text-muted-foreground">Mark and track student attendance</p>
      </div>

      {/* Filters */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Select Class</Label>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mockClasses.map(cls => (
                <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Select Date</Label>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classStudents.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Present</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{presentCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Absent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{absentCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{attendanceRate}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Mark Attendance</CardTitle>
          <CardDescription>
            {mockClasses.find(c => c.id === selectedClass)?.name} - {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Admission No.</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classStudents.length > 0 ? (
                  classStudents.map((student) => {
                    const status = getAttendanceStatus(student.id);
                    return (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.admissionNumber}</TableCell>
                        <TableCell>{getStatusBadge(status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant={status === 'present' ? 'default' : 'outline'}
                              onClick={() => markAttendance(student.id, 'present')}
                              className="h-8"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant={status === 'absent' ? 'destructive' : 'outline'}
                              onClick={() => markAttendance(student.id, 'absent')}
                              className="h-8"
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant={status === 'late' ? 'secondary' : 'outline'}
                              onClick={() => markAttendance(student.id, 'late')}
                              className="h-8"
                            >
                              <Clock className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant={status === 'excused' ? 'secondary' : 'outline'}
                              onClick={() => markAttendance(student.id, 'excused')}
                              className="h-8"
                            >
                              <FileWarning className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      No students in this class
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
