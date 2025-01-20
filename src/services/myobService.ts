interface LeaveEntitlement {
  leaveType: string;
  balance: number;
  unit: string;
}

interface MYOBConfig {
  apiKey: string;
  clientId: string;
  clientSecret: string;
  baseUrl: string;
}

// Configuration will be provided by user in the UI
let myobConfig: MYOBConfig | null = null;

// Initialize MYOB configuration
export const initializeMYOBConfig = (config: MYOBConfig) => {
  myobConfig = config;
  localStorage.setItem('myobConfig', JSON.stringify(config));
};

// Get stored configuration
export const getMYOBConfig = (): MYOBConfig | null => {
  const storedConfig = localStorage.getItem('myobConfig');
  return storedConfig ? JSON.parse(storedConfig) : null;
};

// Helper function to make authenticated requests to MYOB API
const makeAuthenticatedRequest = async (endpoint: string) => {
  if (!myobConfig) {
    throw new Error('MYOB configuration not initialized');
  }

  const headers = {
    'Authorization': `Bearer ${myobConfig.apiKey}`,
    'x-myobapi-key': myobConfig.clientId,
    'x-myobapi-version': 'v2',
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(`${myobConfig.baseUrl}${endpoint}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`MYOB API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching from MYOB:', error);
    throw error;
  }
};

export const fetchLeaveEntitlements = async (employeeId: string): Promise<LeaveEntitlement[]> => {
  try {
    if (!myobConfig) {
      // Return mock data if no configuration is set
      console.log('No MYOB configuration found - returning mock data');
      return [
        { leaveType: "Annual Leave", balance: 20, unit: "days" },
        { leaveType: "Sick Leave", balance: 10, unit: "days" },
        { leaveType: "Personal Leave", balance: 5, unit: "days" }
      ];
    }

    const endpoint = `/payroll/${employeeId}/leave-balances`;
    const response = await makeAuthenticatedRequest(endpoint);
    
    // Transform MYOB API response to match our interface
    return response.map((item: any) => ({
      leaveType: item.leaveCategory,
      balance: item.balance,
      unit: item.unit || 'days'
    }));
  } catch (error) {
    console.error('Error fetching leave entitlements:', error);
    throw error;
  }
};