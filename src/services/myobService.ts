// This is just a reference for the data structure you'll need in Power Automate
interface LeaveEntitlement {
  leaveType: string;
  balance: number;
  unit: string;
}

// Example of the data structure you'll need to fetch from MYOB
// Use this as a reference when configuring your Power Automate flow
export const leaveEntitlementExample = [
  { leaveType: "Annual Leave", balance: 20, unit: "days" },
  { leaveType: "Sick Leave", balance: 10, unit: "days" },
  { leaveType: "Personal Leave", balance: 5, unit: "days" }
];