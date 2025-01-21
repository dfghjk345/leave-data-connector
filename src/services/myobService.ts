import { toast } from "@/hooks/use-toast";

interface LeaveBalance {
  employeeId: string;
  leaveType: string;
  balance: number;
  unit: string;
}

export const getLeaveBalances = async (employeeId: string): Promise<LeaveBalance[]> => {
  try {
    // This would be your actual MYOB API endpoint
    const response = await fetch(`https://api.myob.com/accountright/v2/Employee/${employeeId}/LeaveBalances`, {
      headers: {
        'x-myobapi-version': 'v2',
        'x-myobapi-key': 'YOUR_API_KEY',
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch leave balances');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to fetch leave balances from MYOB",
      variant: "destructive",
    });
    console.error('Error fetching leave balances:', error);
    return [];
  }
};

// Example data structure for testing
export const leaveEntitlementExample = [
  { employeeId: "EMP123", leaveType: "Annual Leave", balance: 20, unit: "days" },
  { employeeId: "EMP123", leaveType: "Sick Leave", balance: 10, unit: "days" },
  { employeeId: "EMP123", leaveType: "Personal Leave", balance: 5, unit: "days" }
];