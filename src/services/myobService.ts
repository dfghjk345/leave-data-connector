import { toast } from "@/components/ui/use-toast";

interface MYOBAuthConfig {
  clientId: string;
  clientSecret: string;
  apiKey: string;
}

interface LeaveBalance {
  employeeId: string;
  leaveType: string;
  balance: number;
  unit: string;
}

export const getLeaveBalances = async (employeeId: string): Promise<LeaveBalance[]> => {
  try {
    // This would be your actual API endpoint
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

// Types for the SharePoint form data structure
export interface LeaveRequest {
  employeeId: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
}

// Example SharePoint form data
export const sharePointFormExample: LeaveRequest = {
  employeeId: "EMP123",
  employeeName: "John Doe",
  leaveType: "Annual Leave",
  startDate: "2024-04-01",
  endDate: "2024-04-05",
  totalDays: 5,
  reason: "Family vacation"
};

// Example of the Power Automate email template
export const emailTemplateExample = `
Subject: Leave Request Approval - [employeeName]

Dear [Manager Name],

A new leave request has been submitted:

Employee Details:
- Name: [employeeName]
- Employee ID: [employeeId]

Leave Request Details:
- Type: [leaveType]
- Start Date: [startDate]
- End Date: [endDate]
- Total Days: [totalDays]
- Reason: [reason]

Current Leave Balances:
[MYOB_LEAVE_TABLE]

Please review and approve/reject this request.

Thanks,
HR Team
`;