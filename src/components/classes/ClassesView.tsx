"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, BookOpen, User } from 'lucide-react';
import { mockClasses, mockTeachers } from '@/data/mockData';
import { Class } from '@/types/school';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function ClassesView() {
  const [classes, setClasses] = useState(mockClasses);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddClass = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const teacherId = formData.get('teacherId') as string;
    const teacher = mockTeachers.find(t => t.id === teacherId);
    
    const newClass: Class = {
      id: `c${classes.length + 1}`,
      name: `${formData.get('level')} ${formData.get('stream')}`,
      level: formData.get('level') as string,
      stream: formData.get('stream') as string,
      teacherId: teacherId,
      teacherName: teacher?.name || '',
      studentCount: 0,
      subjects: (formData.get('subjects') as string).split(',').map(s => s.trim())
    };

    setClasses([...classes, newClass]);
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Class Management</h2>
          <p className="text-muted-foreground">Manage classes, streams, and subject assignments</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Class
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Class</DialogTitle>
              <DialogDescription>Create a new class and assign a teacher</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddClass} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="level">Level *</Label>
                  <Select name="level" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Form 1">Form 1</SelectItem>
                      <SelectItem value="Form 2">Form 2</SelectItem>
                      <SelectItem value="Form 3">Form 3</SelectItem>
                      <SelectItem value="Form 4">Form 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stream">Stream *</Label>
                  <Input id="stream" name="stream" placeholder="Science, Arts, East..." required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="teacherId">Class Teacher *</Label>
                <Select name="teacherId" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockTeachers.map(teacher => (
                      <SelectItem key={teacher.id} value={teacher.id}>{teacher.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subjects">Subjects (comma-separated) *</Label>
                <Input 
                  id="subjects" 
                  name="subjects" 
                  placeholder="Mathematics, English, Science..." 
                  required 
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Class</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Classes Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((classItem) => (
          <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{classItem.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {classItem.level} • {classItem.stream}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="gap-1">
                  <Users className="h-3 w-3" />
                  {classItem.studentCount}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Class Teacher:</span>
                <span className="font-medium">{classItem.teacherName}</span>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm mb-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Subjects:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {classItem.subjects.map((subject, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
