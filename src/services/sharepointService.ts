import { Client } from "@microsoft/microsoft-graph-client";
import { AuthenticationProvider } from "@microsoft/microsoft-graph-client";

class SharePointAuthProvider implements AuthenticationProvider {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async getAccessToken(): Promise<string> {
    return this.accessToken;
  }
}

export const uploadToSharePoint = async (
  fileContent: string,
  fileName: string,
  siteId: string,
  libraryName: string,
  accessToken: string
) => {
  try {
    const authProvider = new SharePointAuthProvider(accessToken);
    const client = Client.init({
      authProvider,
    });

    // Convert string content to ArrayBuffer
    const encoder = new TextEncoder();
    const contentArray = encoder.encode(fileContent);

    // Upload file to SharePoint
    await client.api(`/sites/${siteId}/drives/root:/Documents/${libraryName}/${fileName}:/content`)
      .put(contentArray);

    console.log(`Successfully uploaded ${fileName} to SharePoint`);
  } catch (error) {
    console.error('Error uploading to SharePoint:', error);
    throw error;
  }
};