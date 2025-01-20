interface LeaveEntitlement {
  leaveType: string;
  balance: number;
  unit: string;
}

export const fetchLeaveEntitlements = async (employeeId: string): Promise<LeaveEntitlement[]> => {
  console.log('Fetching leave entitlements for employee:', employeeId);
  
  // Return mock data since actual MYOB integration will be handled by Power Automate
  return [
    { leaveType: "Annual Leave", balance: 20, unit: "days" },
    { leaveType: "Sick Leave", balance: 10, unit: "days" },
    { leaveType: "Personal Leave", balance: 5, unit: "days" }
  ];
};