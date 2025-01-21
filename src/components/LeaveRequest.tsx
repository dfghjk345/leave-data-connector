import { useQuery } from "@tanstack/react-query";
import { getLeaveBalances, leaveEntitlementExample, sharePointFormExample, emailTemplateExample } from "@/services/myobService";

export const LeaveRequest = () => {
  const { data: leaveBalances, isLoading } = useQuery({
    queryKey: ['leaveBalances', 'EMP123'],
    queryFn: () => getLeaveBalances('EMP123'),
    // Using example data for now since we don't have real API credentials
    initialData: leaveEntitlementExample
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">MYOB API Integration Steps</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          <li className="mb-4">
            <span className="font-semibold">Register Application:</span>
            <ul className="list-disc list-inside ml-6 mt-2">
              <li>Visit developer.myob.com</li>
              <li>Register your application</li>
              <li>Obtain Client ID and Secret</li>
            </ul>
          </li>
          <li className="mb-4">
            <span className="font-semibold">Configure OAuth 2.0:</span>
            <ul className="list-disc list-inside ml-6 mt-2">
              <li>Authorization URL: https://secure.myob.com/oauth2/account/authorize</li>
              <li>Token URL: https://secure.myob.com/oauth2/v1/authorize</li>
              <li>Set required scopes for leave management</li>
            </ul>
          </li>
          <li className="mb-4">
            <span className="font-semibold">API Integration:</span>
            <ul className="list-disc list-inside ml-6 mt-2">
              <li>Set required headers (x-myobapi-version, x-myobapi-key)</li>
              <li>Handle OAuth token management</li>
              <li>Implement API endpoints for leave data</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold">Power Automate Flow:</span>
            <ul className="list-disc list-inside ml-6 mt-2">
              <li>Configure HTTP action with OAuth</li>
              <li>Set up API calls for leave data</li>
              <li>Process response and send email</li>
            </ul>
          </li>
        </ol>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Current Leave Balances</h3>
        {isLoading ? (
          <p>Loading leave balances...</p>
        ) : (
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
        )}
      </div>

      <div>
        <h3 className="text-xl font-bold mb-3">SharePoint Form Data Structure</h3>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(sharePointFormExample, null, 2)}
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