"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/LoginForm';
import { DashboardLayout } from '@/components/DashboardLayout';
import { DashboardView } from '@/components/dashboard/DashboardView';
import { StudentsView } from '@/components/students/StudentsView';
import { TeachersView } from '@/components/teachers/TeachersView';
import { ClassesView } from '@/components/classes/ClassesView';
import { AttendanceView } from '@/components/attendance/AttendanceView';
import { FeesView } from '@/components/fees/FeesView';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'students':
        return <StudentsView />;
      case 'teachers':
        return <TeachersView />;
      case 'classes':
        return <ClassesView />;
      case 'attendance':
        return <AttendanceView />;
      case 'fees':
        return <FeesView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <DashboardLayout activeView={activeView} onViewChange={setActiveView}>
      {renderView()}
    </DashboardLayout>
  );
}