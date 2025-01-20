import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchLeaveEntitlements } from "@/services/myobService";
import { useQuery } from "@tanstack/react-query";

export const LeaveRequest = () => {
  const [employeeId, setEmployeeId] = useState("");

  const { data: leaveEntitlements, isLoading, error } = useQuery({
    queryKey: ['leaveEntitlements', employeeId],
    queryFn: () => fetchLeaveEntitlements(employeeId),
    enabled: !!employeeId,
  });

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card className="p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-primary">Leave Balance Checker</h2>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="employeeId">Employee ID</Label>
            <Input
              id="employeeId"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="Enter employee ID"
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
        </div>
      </Card>
    </div>
  );
};