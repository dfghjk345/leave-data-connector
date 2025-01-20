import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchLeaveEntitlements } from "@/services/myobService";
import { submitLeaveRequest } from "@/services/sharePointService";
import { sendLeaveRequestEmail } from "@/services/emailService";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

export const LeaveRequest = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const [comments, setComments] = useState("");

  const { data: leaveEntitlements, isLoading, error } = useQuery({
    queryKey: ['leaveEntitlements', employeeId],
    queryFn: () => fetchLeaveEntitlements(employeeId),
    enabled: !!employeeId,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Submit to SharePoint
      await submitLeaveRequest({
        employeeId,
        startDate,
        endDate,
        leaveType: "Annual Leave",
        comments,
      });

      // Send email to manager
      if (leaveEntitlements) {
        await sendLeaveRequestEmail(managerEmail, employeeId, {
          startDate,
          endDate,
          leaveType: "Annual Leave",
          entitlements: leaveEntitlements,
        });
      }

      toast({
        title: "Success",
        description: "Leave request submitted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit leave request",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card className="p-6 space-y-6 animate-fade-in">
        <h2 className="text-2xl font-semibold text-primary">Leave Request System</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="employeeId">Employee ID</Label>
            <Input
              id="employeeId"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="Enter employee ID"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="managerEmail">Manager's Email</Label>
            <Input
              id="managerEmail"
              type="email"
              value={managerEmail}
              onChange={(e) => setManagerEmail(e.target.value)}
              placeholder="Enter manager's email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comments">Comments</Label>
            <Input
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Add any comments"
            />
          </div>

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

          <Button 
            type="submit"
            className="w-full"
            disabled={!employeeId || !startDate || !endDate || !managerEmail || isLoading}
          >
            Submit Leave Request
          </Button>
        </form>
      </Card>
    </div>
  );
};