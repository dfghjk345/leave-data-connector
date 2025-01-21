import { getLeaveBalances } from './myobService';
import { uploadToSharePoint } from './sharepointService';
import * as fs from 'fs';
import * as path from 'path';

// List of employee IDs to process
const EMPLOYEE_IDS = ['EMP123', 'EMP124', 'EMP125']; // Add your employee IDs here

// SharePoint configuration
const SHAREPOINT_CONFIG = {
  siteId: process.env.SHAREPOINT_SITE_ID || '',
  libraryName: 'LeaveBalances',
  accessToken: process.env.SHAREPOINT_ACCESS_TOKEN || '',
};

interface LeaveBalanceRecord {
  date: string;
  employeeId: string;
  leaveType: string;
  balance: number;
  unit: string;
}

async function syncLeaveBalances() {
  const today = new Date().toISOString().split('T')[0];
  const records: LeaveBalanceRecord[] = [];

  console.log('Starting daily leave balance sync...');

  for (const employeeId of EMPLOYEE_IDS) {
    try {
      const balances = await getLeaveBalances(employeeId);
      
      balances.forEach(balance => {
        records.push({
          date: today,
          employeeId: balance.employeeId,
          leaveType: balance.leaveType,
          balance: balance.balance,
          unit: balance.unit
        });
      });
      
      console.log(`Processed leave balances for employee ${employeeId}`);
    } catch (error) {
      console.error(`Error processing employee ${employeeId}:`, error);
    }
  }

  // Generate CSV content
  const csvContent = generateCSV(records);
  const fileName = `leave-balances-${today}.csv`;

  // Save locally
  const outputDir = path.join(__dirname, '../../leave-balances');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const filePath = path.join(outputDir, fileName);
  fs.writeFileSync(filePath, csvContent);
  console.log(`Leave balances exported to ${filePath}`);

  // Upload to SharePoint
  try {
    await uploadToSharePoint(
      csvContent,
      fileName,
      SHAREPOINT_CONFIG.siteId,
      SHAREPOINT_CONFIG.libraryName,
      SHAREPOINT_CONFIG.accessToken
    );
    console.log('Successfully uploaded to SharePoint');
  } catch (error) {
    console.error('Failed to upload to SharePoint:', error);
  }
}

function generateCSV(records: LeaveBalanceRecord[]): string {
  const headers = ['Date', 'Employee ID', 'Leave Type', 'Balance', 'Unit'];
  const rows = records.map(record => [
    record.date,
    record.employeeId,
    record.leaveType,
    record.balance.toString(),
    record.unit
  ]);

  return [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
}

export { syncLeaveBalances };