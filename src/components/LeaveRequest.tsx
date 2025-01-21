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
            <span className="font-semibold">Get MYOB Data:</span>
            <ul className="list-disc list-inside ml-6 mt-2">
              <li>Use HTTP action to call MYOB API</li>
              <li>Endpoint: Your MYOB API endpoint</li>
              <li>Method: GET</li>
              <li>Include employee ID in the request</li>
            </ul>
          </li>
          <li className="mb-4">
            <span className="font-semibold">Format Data:</span>
            <ul className="list-disc list-inside ml-6 mt-2">
              <li>Parse MYOB response JSON</li>
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

      <div>
        <h3 className="text-xl font-bold mb-3">SharePoint Form Data Structure</h3>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(sharePointFormExample, null, 2)}
        </pre>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-3">MYOB Data Structure</h3>
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