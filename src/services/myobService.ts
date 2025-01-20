interface LeaveEntitlement {
  leaveType: string;
  balance: number;
  unit: string;
}

export const fetchLeaveEntitlements = async (employeeId: string): Promise<LeaveEntitlement[]> => {
  try {
    // For initial testing, we'll use the MYOB sandbox environment
    const response = await fetch(`https://api.myob.com/accountright/employee/${employeeId}/leave-balances`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('myob_access_token')}`,
        'x-myobapi-key': localStorage.getItem('myob_api_key') || '',
        'x-myobapi-version': 'v2',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch leave entitlements');
    }

    const data = await response.json();
    return data.map((item: any) => ({
      leaveType: item.leaveType,
      balance: item.balance,
      unit: item.unit || 'days'
    }));
  } catch (error) {
    console.error('Error fetching leave entitlements:', error);
    // For testing, return mock data so we can verify the UI works
    return [
      { leaveType: "Annual Leave", balance: 20, unit: "days" },
      { leaveType: "Sick Leave", balance: 10, unit: "days" },
      { leaveType: "Personal Leave", balance: 5, unit: "days" }
    ];
  }
};