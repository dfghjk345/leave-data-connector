import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useState } from "react";

// SharePoint document client configuration
const SHAREPOINT_CONFIG = {
  siteUrl: import.meta.env.VITE_SHAREPOINT_SITE_URL || '',
  libraryName: 'LeaveRequests',
  csvFileName: 'leave_balances.csv'
};

interface LeaveBalance {
  leaveType: string;
  balance: number;
  unit: string;
}

export const LeaveRequest = () => {
  const [processingStatus, setProcessingStatus] = useState<string>('');

  const { data: leaveBalances, isLoading, refetch } = useQuery({
    queryKey: ['leaveBalances'],
    queryFn: async () => {
      try {
        // Log the attempt to fetch from SharePoint
        console.log('Attempting to fetch CSV from SharePoint:', SHAREPOINT_CONFIG.siteUrl);
        
        // This is where you would implement the actual SharePoint document fetch
        // For now, we're logging the process steps
        console.log('SharePoint integration steps:');
        console.log('1. Connect to SharePoint site');
        console.log('2. Access document library:', SHAREPOINT_CONFIG.libraryName);
        console.log('3. Read CSV file:', SHAREPOINT_CONFIG.csvFileName);
        
        // Return example data for now
        return [
          { leaveType: "Annual Leave", balance: 20, unit: "days" },
          { leaveType: "Sick Leave", balance: 10, unit: "days" },
          { leaveType: "Personal Leave", balance: 5, unit: "days" }
        ] as LeaveBalance[];
      } catch (error) {
        console.error('Error fetching leave balances:', error);
        throw error;
      }
    },
    // Disable automatic fetching - we'll fetch manually when needed
    enabled: false
  });

  const handleProcessCSV = async () => {
    setProcessingStatus('Processing CSV file from SharePoint...');
    try {
      await refetch();
      setProcessingStatus('Successfully processed CSV file');
    } catch (error) {
      setProcessingStatus('Error processing CSV file');
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">SharePoint CSV Integration Steps</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          <li className="mb-4">
            <span className="font-semibold">Export from MYOB:</span>
            <ul className="list-disc list-inside ml-6 mt-2">
              <li>Export leave balances as CSV from MYOB</li>
              <li>Save as 'leave_balances.csv'</li>
            </ul>
          </li>
          <li className="mb-4">
            <span className="font-semibold">SharePoint Setup:</span>
            <ul className="list-disc list-inside ml-6 mt-2">
              <li>Upload CSV to SharePoint document library</li>
              <li>Ensure proper permissions are set</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold">Processing:</span>
            <ul className="list-disc list-inside ml-6 mt-2">
              <li>Application reads CSV from SharePoint</li>
              <li>Processes leave balance data</li>
              <li>Updates display with current balances</li>
            </ul>
          </li>
        </ol>
      </div>

      <div className="flex flex-col gap-4">
        <Button onClick={handleProcessCSV}>
          Process SharePoint CSV
        </Button>
        {processingStatus && (
          <p className="text-sm text-gray-600">{processingStatus}</p>
        )}
      </div>

      {isLoading ? (
        <p>Loading leave balances...</p>
      ) : leaveBalances ? (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Current Leave Balances</h3>
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="py-2">Leave Type</th>
                <th className="py-2">Balance</th>
                <th className="py-2">Unit</th>
              </tr>
            </thead>
            <tbody>
              {leaveBalances.map((balance, index) => (
                <tr key={index}>
                  <td className="py-2">{balance.leaveType}</td>
                  <td className="py-2">{balance.balance}</td>
                  <td className="py-2">{balance.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};