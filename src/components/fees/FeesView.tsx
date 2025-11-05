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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, DollarSign, TrendingUp, AlertCircle, Receipt } from 'lucide-react';
import { mockStudents, mockFeePayments, mockFeeStructures } from '@/data/mockData';
import { FeePayment } from '@/types/school';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';

export function FeesView() {
  const { user } = useAuth();
  const [payments, setPayments] = useState(mockFeePayments);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  const totalCollected = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalPending = mockStudents.reduce((sum, s) => sum + s.feeBalance, 0);
  const studentsWithBalance = mockStudents.filter(s => s.feeBalance > 0).length;

  const handleRecordPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const studentId = formData.get('studentId') as string;
    const student = mockStudents.find(s => s.id === studentId);
    
    const newPayment: FeePayment = {
      id: `fp${payments.length + 1}`,
      studentId: studentId,
      studentName: student?.name || '',
      amount: Number(formData.get('amount')),
      date: new Date().toISOString().split('T')[0],
      method: formData.get('method') as 'Cash' | 'Bank Transfer' | 'Mobile Money',
      reference: formData.get('reference') as string,
      term: formData.get('term') as string,
      year: new Date().getFullYear().toString(),
      receivedBy: user?.name || 'Unknown'
    };

    setPayments([newPayment, ...payments]);
    setIsPaymentDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Fee Management</h2>
          <p className="text-muted-foreground">Track payments, balances, and fee structures</p>
        </div>
        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Record Payment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Record Fee Payment</DialogTitle>
              <DialogDescription>Enter payment details</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">Student *</Label>
                <Select name="studentId" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockStudents.map(student => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name} - {student.admissionNumber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (KSh) *</Label>
                  <Input id="amount" name="amount" type="number" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="method">Payment Method *</Label>
                  <Select name="method" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                      <SelectItem value="Mobile Money">Mobile Money (M-PESA)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="reference">Reference Number *</Label>
                  <Input id="reference" name="reference" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="term">Term *</Label>
                  <Select name="term" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Term 1">Term 1</SelectItem>
                      <SelectItem value="Term 2">Term 2</SelectItem>
                      <SelectItem value="Term 3">Term 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Record Payment</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Collected
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              KSh {totalCollected.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">This term</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Pending
            </CardTitle>
            <AlertCircle className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">
              KSh {totalPending.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Outstanding balance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Students with Balance
            </CardTitle>
            <DollarSign className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{studentsWithBalance}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Out of {mockStudents.length} students
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="payments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="payments">Recent Payments</TabsTrigger>
          <TabsTrigger value="balances">Student Balances</TabsTrigger>
          <TabsTrigger value="structure">Fee Structure</TabsTrigger>
        </TabsList>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
              <CardDescription>Latest fee payments received</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Received By</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                        <TableCell className="font-medium">{payment.studentName}</TableCell>
                        <TableCell className="text-green-600 font-semibold">
                          KSh {payment.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{payment.method}</Badge>
                        </TableCell>
                        <TableCell className="font-mono text-xs">{payment.reference}</TableCell>
                        <TableCell>{payment.receivedBy}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="balances" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Fee Balances</CardTitle>
              <CardDescription>Outstanding fee balances by student</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Admission No.</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Balance</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.admissionNumber}</TableCell>
                        <TableCell>{student.className}</TableCell>
                        <TableCell className={student.feeBalance > 0 ? 'text-destructive font-semibold' : 'text-green-600 font-semibold'}>
                          KSh {student.feeBalance.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {student.feeBalance === 0 ? (
                            <Badge className="bg-green-500">Paid</Badge>
                          ) : (
                            <Badge variant="destructive">Pending</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="structure" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockFeeStructures.map((structure) => (
              <Card key={structure.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="h-5 w-5 text-primary" />
                    {structure.className}
                  </CardTitle>
                  <CardDescription>
                    {structure.term} {structure.year}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tuition Fee:</span>
                    <span className="font-medium">KSh {structure.tuitionFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Activity Fee:</span>
                    <span className="font-medium">KSh {structure.activityFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Exam Fee:</span>
                    <span className="font-medium">KSh {structure.examFee.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total:</span>
                    <span className="text-primary">KSh {structure.totalFee.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
