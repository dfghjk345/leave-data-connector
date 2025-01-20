import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchLeaveEntitlements } from "@/services/myobService";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

export const LeaveRequest = () => {
  const [employeeId, setEmployeeId] = useState("");

  const { data: leaveEntitlements, isLoading, error, refetch } = useQuery({
    queryKey: ['leaveEntitlements', employeeId],
    queryFn: () => fetchLeaveEntitlements(employeeId),
    enabled: !!employeeId,
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to fetch leave entitlements. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (employeeId) {
      refetch();
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
              <Button type="submit" disabled={!employeeId || isLoading}>
                {isLoading ? "Loading..." : "Check Balance"}
              </Button>
            </div>
          </div>
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