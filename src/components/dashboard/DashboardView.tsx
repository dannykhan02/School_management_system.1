"use client";

import { useAuth } from '@/contexts/AuthContext';
import { StatCard } from './StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, GraduationCap, ClipboardCheck, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { mockStudents, mockTeachers, mockAttendance, mockFeePayments } from '@/data/mockData';

export function DashboardView() {
  const { user } = useAuth();

  const totalStudents = mockStudents.length;
  const totalTeachers = mockTeachers.length;
  const todayAttendance = mockAttendance.filter(a => a.date === new Date().toISOString().split('T')[0]);
  const presentToday = todayAttendance.filter(a => a.status === 'present').length;
  const attendanceRate = todayAttendance.length > 0 ? Math.round((presentToday / todayAttendance.length) * 100) : 0;
  
  const totalFeesCollected = mockFeePayments.reduce((sum, payment) => sum + payment.amount, 0);
  const totalFeesPending = mockStudents.reduce((sum, student) => sum + student.feeBalance, 0);

  const recentPayments = mockFeePayments.slice(-5).reverse();
  const studentsWithBalance = mockStudents.filter(s => s.feeBalance > 0);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="rounded-lg bg-gradient-to-r from-primary to-accent p-6 text-white">
        <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="mt-1 text-primary-foreground/90">
          Here's what's happening in your school today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value={totalStudents}
          description="Active students"
          icon={GraduationCap}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Total Teachers"
          value={totalTeachers}
          description="Teaching staff"
          icon={Users}
        />
        <StatCard
          title="Attendance Today"
          value={`${attendanceRate}%`}
          description={`${presentToday} of ${todayAttendance.length} present`}
          icon={ClipboardCheck}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Fees Collected"
          value={`KSh ${(totalFeesCollected / 1000).toFixed(0)}K`}
          description={`KSh ${(totalFeesPending / 1000).toFixed(0)}K pending`}
          icon={DollarSign}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Fee Payments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Recent Fee Payments
            </CardTitle>
            <CardDescription>Latest transactions received</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayments.length > 0 ? (
                recentPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div>
                      <p className="font-medium text-sm">{payment.studentName}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(payment.date).toLocaleDateString()} • {payment.method}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">+KSh {payment.amount.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{payment.reference}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-sm text-muted-foreground py-4">No recent payments</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Fee Balance Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Fee Balance Alerts
            </CardTitle>
            <CardDescription>Students with pending fees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentsWithBalance.length > 0 ? (
                studentsWithBalance.slice(0, 5).map((student) => (
                  <div key={student.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div>
                      <p className="font-medium text-sm">{student.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {student.className} • {student.admissionNumber}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-destructive">KSh {student.feeBalance.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Outstanding</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-sm text-muted-foreground py-4">All fees paid!</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats for Teachers/Parents */}
      {(user?.role === 'teacher' || user?.role === 'parent') && (
        <Card>
          <CardHeader>
            <CardTitle>Quick Overview</CardTitle>
            <CardDescription>
              {user.role === 'teacher' ? 'Your classes and students' : 'Your child\'s information'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {user.role === 'teacher' && (
                <>
                  <div className="rounded-lg border p-4">
                    <p className="text-sm text-muted-foreground">Classes Assigned</p>
                    <p className="text-2xl font-bold">2</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-sm text-muted-foreground">Total Students</p>
                    <p className="text-2xl font-bold">67</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-sm text-muted-foreground">Subjects Teaching</p>
                    <p className="text-2xl font-bold">2</p>
                  </div>
                </>
              )}
              {user.role === 'parent' && (
                <>
                  <div className="rounded-lg border p-4">
                    <p className="text-sm text-muted-foreground">Attendance Rate</p>
                    <p className="text-2xl font-bold">95%</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-sm text-muted-foreground">Fee Balance</p>
                    <p className="text-2xl font-bold">KSh 15K</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-sm text-muted-foreground">Class Position</p>
                    <p className="text-2xl font-bold">5th</p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
