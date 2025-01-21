import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useState } from "react";
import { getLeaveBalances } from "@/services/myobService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

export const LeaveRequest = () => {
  const [employeeId, setEmployeeId] = useState("EMP123"); // In a real app, this would come from authentication

  const { data: leaveBalances, isLoading } = useQuery({
    queryKey: ['leaveBalances', employeeId],
    queryFn: () => getLeaveBalances(employeeId),
    refetchInterval: 300000, // Refetch every 5 minutes to keep data fresh
  });

  const handleSubmitRequest = async () => {
    toast({
      title: "Connecting to MYOB",
      description: "Please complete MYOB authentication to proceed",
    });
    window.open('https://secure.myob.com/oauth2/account/authorize', '_blank');
  };

  if (isLoading) {
    return <div>Loading leave balances...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">MYOB Leave Management</h2>
        <p className="text-gray-600 mb-6">
          This system directly connects to MYOB to ensure real-time leave balance accuracy.
        </p>
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Current Leave Balances</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Leave Type</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Unit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveBalances?.map((balance) => (
                <TableRow key={balance.leaveType}>
                  <TableCell>{balance.leaveType}</TableCell>
                  <TableCell>{balance.balance}</TableCell>
                  <TableCell>{balance.unit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Button onClick={handleSubmitRequest} className="w-fit">
          Submit New Leave Request
        </Button>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Benefits</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Real-time MYOB data synchronization</li>
          <li>Accurate leave balance checks</li>
          <li>Direct integration with MYOB's authentication</li>
          <li>Automatic balance updates</li>
          <li>No manual data entry required</li>
        </ul>
      </div>
    </div>
  );
};