import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchLeaveEntitlements } from "@/services/myobService";
import { sendLeaveRequestEmail } from "@/services/emailService";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { DatePicker } from "@/components/ui/calendar";

export const LeaveRequest = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [managerEmail, setManagerEmail] = useState("");
  const [leaveType, setLeaveType] = useState("Annual Leave");

  const { data: leaveEntitlements, isLoading, error, refetch } = useQuery({
    queryKey: ['leaveEntitlements', employeeId],
    queryFn: () => fetchLeaveEntitlements(employeeId),
    enabled: !!employeeId,
    meta: {
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to fetch leave entitlements. Please try again.",
          variant: "destructive",
        });
      }
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (employeeId && startDate && endDate && managerEmail) {
      try {
        await sendLeaveRequestEmail(managerEmail, employeeId, {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          leaveType,
          entitlements: leaveEntitlements || []
        });
        
        toast({
          title: "Success",
          description: "Leave request sent to manager for approval",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to send leave request email",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card className="p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-center">MYOB Leave Balance Checker</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="employeeId">Employee ID</Label>
            <div className="flex gap-2">
              <Input
                id="employeeId"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="Enter employee ID"
                className="flex-1"
              />
              <Button type="button" onClick={() => refetch()} disabled={!employeeId || isLoading}>
                {isLoading ? "Loading..." : "Check Balance"}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="managerEmail">Manager's Email</Label>
            <Input
              id="managerEmail"
              type="email"
              value={managerEmail}
              onChange={(e) => setManagerEmail(e.target.value)}
              placeholder="manager@company.com"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <DatePicker
                selected={startDate}
                onSelect={setStartDate}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <DatePicker
                selected={endDate}
                onSelect={setEndDate}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="leaveType">Leave Type</Label>
            <select
              id="leaveType"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="w-full border rounded-md p-2"
              required
            >
              <option value="Annual Leave">Annual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Personal Leave">Personal Leave</option>
            </select>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={!employeeId || !startDate || !endDate || !managerEmail}
          >
            Submit Leave Request
          </Button>
        </form>

        {isLoading && (
          <div className="text-center text-muted-foreground">
            Loading leave entitlements...
          </div>
        )}

        {error && (
          <div className="text-destructive text-center">
            Failed to load leave entitlements
          </div>
        )}

        {leaveEntitlements && leaveEntitlements.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Leave Entitlements</h3>
            <div className="grid gap-4">
              {leaveEntitlements.map((entitlement, index) => (
                <div key={index} className="p-4 bg-muted rounded-md">
                  <div className="font-medium">{entitlement.leaveType}</div>
                  <div className="text-sm text-muted-foreground">
                    Balance: {entitlement.balance} {entitlement.unit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};