import { toast } from "@/components/ui/use-toast";

interface EmailData {
  to: string;
  subject: string;
  body: string;
}

export const sendEmail = async (emailData: EmailData) => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    toast({
      title: "Error",
      description: "Failed to send email notification",
      variant: "destructive",
    });
    throw error;
  }
};

export const sendLeaveRequestEmail = async (
  managerEmail: string,
  employeeId: string,
  leaveDetails: {
    startDate: string;
    endDate: string;
    leaveType: string;
    entitlements: Array<{
      leaveType: string;
      balance: number;
      unit: string;
    }>;
  }
) => {
  const emailBody = `
    New Leave Request:
    
    Employee ID: ${employeeId}
    Leave Type: ${leaveDetails.leaveType}
    Start Date: ${leaveDetails.startDate}
    End Date: ${leaveDetails.endDate}
    
    Current Leave Entitlements:
    ${leaveDetails.entitlements
      .map(e => `${e.leaveType}: ${e.balance} ${e.unit}`)
      .join('\n')}
    
    Please review and approve/reject this request by replying to this email.
    
    Approve: Reply with "APPROVED"
    Reject: Reply with "REJECTED" and include a reason.
  `;

  return sendEmail({
    to: managerEmail,
    subject: `Leave Request from Employee ${employeeId}`,
    body: emailBody,
  });
};