import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useState } from "react";

export const LeaveRequest = () => {
  const [processingStatus, setProcessingStatus] = useState<string>('');

  const { data: leaveBalances, isLoading, refetch } = useQuery({
    queryKey: ['leaveBalances'],
    queryFn: async () => {
      // Return example data for demonstration
      return [
        { leaveType: "Annual Leave", balance: 20, unit: "days" },
        { leaveType: "Sick Leave", balance: 10, unit: "days" },
        { leaveType: "Personal Leave", balance: 5, unit: "days" }
      ];
    },
    enabled: false
  });

  const handleViewFlow = () => {
    setProcessingStatus('Opening Power Automate flow documentation...');
    window.open('https://make.powerautomate.com', '_blank');
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Power Automate Integration Steps</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          <li className="mb-4">
            <span className="font-semibold">MYOB Developer Account Setup:</span>
            <ul className="list-disc list-inside ml-6 mt-2">
              <li>Register at MYOB Developer Portal (developer.myob.com)</li>
              <li>Create a new app to get API credentials</li>
              <li>Note down Client ID and Client Secret</li>
            </ul>
          </li>
          <li className="mb-4">
            <span className="font-semibold">Power Automate Custom Connector:</span>
            <ul className="list-disc list-inside ml-6 mt-2">
              <li>Create new custom connector in Power Automate</li>
              <li>Use MYOB API specifications (available in developer portal)</li>
              <li>Configure OAuth2 authentication</li>
              <li>Add required endpoints for employee and leave data</li>
            </ul>
          </li>
          <li className="mb-4">
            <span className="font-semibold">SharePoint Connection:</span>
            <ul className="list-disc list-inside ml-6 mt-2">
              <li>Add "SharePoint" connector</li>
              <li>Select your site and document library</li>
              <li>Choose "Create file" action</li>
              <li>Set filename as "leave_balances.csv"</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold">Flow Configuration:</span>
            <ul className="list-disc list-inside ml-6 mt-2">
              <li>Set up daily schedule trigger</li>
              <li>Add authentication steps for MYOB API</li>
              <li>Configure data mapping to CSV format</li>
              <li>Add error handling and notifications</li>
            </ul>
          </li>
        </ol>
      </div>

      <div className="flex flex-col gap-4">
        <Button onClick={handleViewFlow} className="w-fit">
          Open Power Automate
        </Button>
        {processingStatus && (
          <p className="text-sm text-gray-600">{processingStatus}</p>
        )}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Important Notes</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Requires MYOB Developer account (free)</li>
          <li>Uses MYOB's REST API for secure access</li>
          <li>Custom connector setup needed once</li>
          <li>Automatic daily synchronization</li>
          <li>Secure Microsoft 365 integration</li>
        </ul>
      </div>
    </div>
  );
};