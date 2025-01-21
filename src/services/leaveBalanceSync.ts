import { getLeaveBalances, leaveEntitlementExample } from './myobService';
import * as fs from 'fs';
import * as path from 'path';

// List of employee IDs to process
const EMPLOYEE_IDS = ['EMP123', 'EMP124', 'EMP125']; // Add your employee IDs here

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

  // Export to CSV
  const csvContent = generateCSV(records);
  const outputDir = path.join(__dirname, '../../leave-balances');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const fileName = `leave-balances-${today}.csv`;
  const filePath = path.join(outputDir, fileName);
  
  fs.writeFileSync(filePath, csvContent);
  console.log(`Leave balances exported to ${filePath}`);
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

// Export for use in cron job
export { syncLeaveBalances };