import { toast } from "@/components/ui/use-toast";

interface LeaveEntitlement {
  employeeId: string;
  leaveType: string;
  balance: number;
  unit: string;
}

export const fetchLeaveEntitlements = async (employeeId: string): Promise<LeaveEntitlement[]> => {
  try {
    // This is a placeholder for the actual MYOB API call
    // You'll need to implement the actual API call using the MYOB credentials
    const response = await fetch(`YOUR_MYOB_API_ENDPOINT/employees/${employeeId}/leave-entitlements`, {
      headers: {
        'Authorization': `Bearer ${process.env.MYOB_ACCESS_TOKEN}`,
        'x-myobapi-key': process.env.MYOB_API_KEY,
        'x-myobapi-version': 'v2',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch leave entitlements');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching leave entitlements:', error);
    toast({
      title: "Error",
      description: "Failed to fetch leave entitlements. Please try again later.",
      variant: "destructive",
    });
    return [];
  }
};