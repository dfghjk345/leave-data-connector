import { Client } from "@microsoft/microsoft-graph-client";
import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: process.env.SHAREPOINT_CLIENT_ID || '',
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    redirectUri: window.location.origin,
  }
};

const msalInstance = new PublicClientApplication(msalConfig);

export const submitLeaveRequest = async (leaveData: {
  employeeId: string;
  startDate: string;
  endDate: string;
  leaveType: string;
  comments?: string;
}) => {
  try {
    // Initialize Graph client
    const account = (await msalInstance.getAllAccounts())[0];
    const accessToken = await msalInstance.acquireTokenSilent({
      scopes: ["Sites.ReadWrite.All"],
      account,
    });

    const client = Client.init({
      authProvider: (done) => {
        done(null, accessToken.accessToken);
      },
    });

    // Submit to SharePoint list
    await client
      .api(`/sites/${process.env.SHAREPOINT_SITE_ID}/lists/${process.env.SHAREPOINT_LIST_ID}/items`)
      .post({
        fields: {
          Title: `Leave Request - ${leaveData.employeeId}`,
          EmployeeId: leaveData.employeeId,
          StartDate: leaveData.startDate,
          EndDate: leaveData.endDate,
          LeaveType: leaveData.leaveType,
          Comments: leaveData.comments || '',
          Status: 'Pending'
        }
      });

    return true;
  } catch (error) {
    console.error('Error submitting leave request to SharePoint:', error);
    throw new Error('Failed to submit leave request');
  }
};