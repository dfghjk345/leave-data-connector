interface LeaveEntitlement {
  leaveType: string;
  balance: number;
  unit: string;
}

export const fetchLeaveEntitlements = async (employeeId: string): Promise<LeaveEntitlement[]> => {
  // For initial testing, return mock data
  // In production, this would make an actual API call to MYOB
  console.log('Fetching leave entitlements for employee:', employeeId);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock data for testing
  return [
    { leaveType: "Annual Leave", balance: 20, unit: "days" },
    { leaveType: "Sick Leave", balance: 10, unit: "days" },
    { leaveType: "Personal Leave", balance: 5, unit: "days" }
  ];
};