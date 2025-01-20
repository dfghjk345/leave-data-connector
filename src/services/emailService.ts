interface LeaveRequestData {
  employeeId: string;
  startDate: string;
  endDate: string;
  leaveType: string;
  entitlements: Array<{ leaveType: string; balance: number; unit: string }>;
}

export const sendLeaveRequestEmail = async (
  managerEmail: string,
  employeeId: string,
  requestData: LeaveRequestData
) => {
  // This URL should be updated with your actual Power Automate HTTP trigger URL
  const POWER_AUTOMATE_URL = "YOUR_POWER_AUTOMATE_FLOW_URL";

  try {
    const response = await fetch(POWER_AUTOMATE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        managerEmail,
        employeeId,
        ...requestData,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send leave request');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending leave request:', error);
    throw error;
  }
};