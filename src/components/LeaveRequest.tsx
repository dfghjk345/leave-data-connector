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
        <h2 className="text-2xl font-bold mb-4">SharePoint-Based Leave Management</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          <li className="mb-4">
            <span className="font-semibold">Create SharePoint Lists:</span>
            <ul className="list-disc list-inside ml-6 mt-2">
              <li>Create "Employee Leave Balances" list with columns:
                <ul className="list-disc list-inside ml-6">
                  <li>Employee Name (Single line of text)</li>
                  <li>Employee ID (Single line of text)</li>
                  <li>Annual Leave Balance (Number)</li>
                  <li>Sick Leave Balance (Number)</li>
                  <li>Personal Leave Balance (Number)</li>
                </ul>
              </li>
              <li>Create "Leave Requests" list with columns:
                <ul className="list-disc list-inside ml-6">
                  <li>Employee Name (Single line of text)</li>
                  <li>Leave Type (Choice: Annual/Sick/Personal)</li>
                  <li>Start Date (Date)</li>
                  <li>End Date (Date)</li>
                  <li>Status (Choice: Pending/Approved/Rejected)</li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="mb-4">
            <span className="font-semibold">Power Automate Flow Setup:</span>
            <ul className="list-disc list-inside ml-6 mt-2">
              <li>Create new automated flow</li>
              <li>Add "When an item is created in Leave Requests" trigger</li>
              <li>Add "Get item from Employee Leave Balances" action</li>
              <li>Add "Send approval email" action</li>
              <li>Add conditions for leave balance check</li>
            </ul>
          </li>
          <li className="mb-4">
            <span className="font-semibold">Email Notifications:</span>
            <ul className="list-disc list-inside ml-6 mt-2">
              <li>Configure approval email template</li>
              <li>Set up notification for request status</li>
              <li>Add manager's email in approval flow</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold">Balance Updates:</span>
            <ul className="list-disc list-inside ml-6 mt-2">
              <li>Add "Update item in Employee Leave Balances" action</li>
              <li>Calculate new balance after approval</li>
              <li>Update SharePoint list automatically</li>
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
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Benefits</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>No custom connectors required</li>
          <li>Uses standard SharePoint lists</li>
          <li>Built-in approval workflows</li>
          <li>Easy to maintain and modify</li>
          <li>Automatic email notifications</li>
        </ul>
      </div>
    </div>
  );
};