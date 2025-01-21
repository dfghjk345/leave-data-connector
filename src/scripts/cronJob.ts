import { syncLeaveBalances } from '../services/leaveBalanceSync';
import cron from 'node-cron';

// Run every day at 6 AM
cron.schedule('0 6 * * *', async () => {
  console.log('Starting scheduled leave balance sync...');
  try {
    await syncLeaveBalances();
    console.log('Leave balance sync completed successfully');
  } catch (error) {
    console.error('Error during leave balance sync:', error);
  }
});

// Also export for manual running
export const runSync = syncLeaveBalances;