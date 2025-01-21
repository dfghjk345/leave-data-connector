// Types for the SharePoint form data structure
interface LeaveRequest {
  employeeId: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
}

// Types for the MYOB data structure
interface LeaveEntitlement {
  leaveType: string;
  balance: number;
  unit: string;
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

// Example MYOB leave balance data
export const leaveEntitlementExample: LeaveEntitlement[] = [
  { leaveType: "Annual Leave", balance: 20, unit: "days" },
  { leaveType: "Sick Leave", balance: 10, unit: "days" },
  { leaveType: "Personal Leave", balance: 5, unit: "days" }
];

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