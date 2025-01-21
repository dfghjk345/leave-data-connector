import { leaveEntitlementExample, sharePointFormExample, emailTemplateExample } from "@/services/myobService";

export const LeaveRequest = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Power Automate Flow Steps</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          <li className="mb-4">
            <span className="font-semibold">Trigger:</span> When a new SharePoint form is submitted
          </li>
          <li className="mb-4">
            <span className="font-semibold">Get MYOB Data (CSV Method):</span>
            <ul className="list-disc list-inside ml-6 mt-2">
              <li>Configure MYOB scheduled CSV export of leave balances</li>
              <li>Save CSV to designated SharePoint library</li>
              <li>Use "Get file content" action to read CSV</li>
              <li>Parse CSV content using "Parse CSV" action</li>
            </ul>
          </li>
          <li className="mb-4">
            <span className="font-semibold">Format Data:</span>
            <ul className="list-disc list-inside ml-6 mt-2">
              <li>Filter CSV data for specific employee ID</li>
              <li>Create HTML table for leave balances</li>
              <li>Replace placeholders in email template</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold">Send Email:</span>
            <ul className="list-disc list-inside ml-6 mt-2">
              <li>Use "Send an email (V2)" action</li>
              <li>Set recipient as employee's manager</li>
              <li>Use formatted HTML body</li>
            </ul>
          </li>
        </ol>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">CSV Export Setup Instructions</h3>
        <ol className="list-decimal list-inside space-y-2 text-blue-700">
          <li>In MYOB, go to Reports → Leave Reports</li>
          <li>Select "Leave Balances Report"</li>
          <li>Configure export settings:
            <ul className="list-disc list-inside ml-6 mt-1 text-blue-600">
              <li>Format: CSV</li>
              <li>Schedule: Daily (recommended)</li>
              <li>Export Path: Your SharePoint library path</li>
            </ul>
          </li>
          <li>Enable automatic export schedule</li>
        </ol>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-3">SharePoint Form Data Structure</h3>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(sharePointFormExample, null, 2)}
        </pre>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-3">MYOB CSV Data Structure</h3>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(leaveEntitlementExample, null, 2)}
        </pre>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-3">Email Template Example</h3>
        <pre className="bg-gray-100 p-4 rounded overflow-auto whitespace-pre-wrap">
          {emailTemplateExample}
        </pre>
      </div>
    </div>
  );
};