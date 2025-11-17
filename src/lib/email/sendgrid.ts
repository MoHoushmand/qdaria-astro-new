import sgMail from '@sendgrid/mail';

// Initialize SendGrid
const apiKey = import.meta.env.SENDGRID_API_KEY || '';
if (apiKey) {
  sgMail.setApiKey(apiKey);
}

export interface WaitlistEmailData {
  fullName: string;
  companyName: string;
  email: string;
  industry: string;
  useCase?: string;
  expectedVolume: string;
  couponCode?: string;
  submissionId?: string;
}

// Check if SendGrid is configured
export const isSendGridConfigured = () => {
  return !!import.meta.env.SENDGRID_API_KEY && !!import.meta.env.SENDGRID_FROM_EMAIL;
};

// Alias for consistency with API code
export const isEmailServiceReady = isSendGridConfigured;

// Get email service status
export const getEmailServiceStatus = () => {
  return {
    configured: isSendGridConfigured(),
    hasApiKey: !!import.meta.env.SENDGRID_API_KEY,
    hasFromEmail: !!import.meta.env.SENDGRID_FROM_EMAIL,
    hasSalesEmail: !!import.meta.env.SALES_EMAIL,
  };
};

// Send user confirmation email
export async function sendUserConfirmation(data: WaitlistEmailData): Promise<boolean> {
  if (!isSendGridConfigured()) {
    console.warn('SendGrid not configured - skipping user confirmation email');
    return false;
  }

  const fromEmail = import.meta.env.SENDGRID_FROM_EMAIL || 'noreply@qdaria.com';
  const fromName = import.meta.env.SENDGRID_FROM_NAME || 'Qdaria Technologies';

  const msg = {
    to: data.email,
    from: { email: fromEmail, name: fromName },
    subject: 'Your Zipminator Enterprise Access Application — Next Steps',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">

                  <!-- Header -->
                  <tr>
                    <td style="padding: 40px 40px 32px; border-bottom: 1px solid #e5e5e5;">
                      <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #1a1a1a; line-height: 1.3;">
                        Your Application Has Been Received
                      </h1>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding: 32px 40px;">
                      <p style="margin: 0 0 24px; font-size: 16px; color: #4a4a4a; line-height: 1.6;">
                        Dear ${data.fullName},
                      </p>

                      <p style="margin: 0 0 24px; font-size: 16px; color: #4a4a4a; line-height: 1.6;">
                        Thank you for your interest in Zipminator Enterprise. We've received your application for early access to our quantum-safe encryption platform and have begun the qualification process.
                      </p>

                      <!-- Application Summary -->
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 0 0 32px; background-color: #f9f9f9; border-radius: 6px; padding: 24px;">
                        <tr>
                          <td>
                            <p style="margin: 0 0 16px; font-size: 14px; font-weight: 600; color: #1a1a1a; text-transform: uppercase; letter-spacing: 0.5px;">Application Summary</p>
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                              <tr>
                                <td style="padding: 8px 0; font-size: 15px; color: #6a6a6a;">Organization</td>
                                <td style="padding: 8px 0; font-size: 15px; color: #1a1a1a; font-weight: 500;" align="right">${data.companyName}</td>
                              </tr>
                              <tr>
                                <td style="padding: 8px 0; font-size: 15px; color: #6a6a6a;">Sector</td>
                                <td style="padding: 8px 0; font-size: 15px; color: #1a1a1a; font-weight: 500;" align="right">${data.industry.charAt(0).toUpperCase() + data.industry.slice(1)}</td>
                              </tr>
                              <tr>
                                <td style="padding: 8px 0; font-size: 15px; color: #6a6a6a;">Projected Volume</td>
                                <td style="padding: 8px 0; font-size: 15px; color: #1a1a1a; font-weight: 500;" align="right">${data.expectedVolume} operations/month</td>
                              </tr>
                              ${data.couponCode ? `
                              <tr>
                                <td style="padding: 8px 0; font-size: 15px; color: #6a6a6a;">Coupon Code</td>
                                <td style="padding: 8px 0; font-size: 15px; color: #04a3ff; font-weight: 600; font-family: monospace;" align="right">${data.couponCode}</td>
                              </tr>
                              ` : ''}
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- What Happens Next -->
                      <p style="margin: 0 0 16px; font-size: 14px; font-weight: 600; color: #1a1a1a; text-transform: uppercase; letter-spacing: 0.5px;">What Happens Next</p>

                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 0 0 32px;">
                        <tr>
                          <td style="padding: 16px 0; border-bottom: 1px solid #e5e5e5;">
                            <p style="margin: 0 0 4px; font-size: 15px; font-weight: 500; color: #1a1a1a;">Technical Review (24-48 hours)</p>
                            <p style="margin: 0; font-size: 14px; color: #6a6a6a; line-height: 1.5;">Our engineering team will assess your requirements and prepare a tailored integration proposal.</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 16px 0; border-bottom: 1px solid #e5e5e5;">
                            <p style="margin: 0 0 4px; font-size: 15px; font-weight: 500; color: #1a1a1a;">NDA & Architecture Discussion</p>
                            <p style="margin: 0; font-size: 14px; color: #6a6a6a; line-height: 1.5;">We'll schedule a confidential consultation to review technical specifications, compliance requirements, and deployment architecture.</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 16px 0;">
                            <p style="margin: 0 0 4px; font-size: 15px; font-weight: 500; color: #1a1a1a;">Enterprise Access Provisioning</p>
                            <p style="margin: 0; font-size: 14px; color: #6a6a6a; line-height: 1.5;">Upon approval, your dedicated environment will be configured with quantum-safe infrastructure and priority support channels.</p>
                          </td>
                        </tr>
                      </table>

                      <!-- Platform Overview -->
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 0 0 24px; background-color: #f0f9ff; border-left: 3px solid #04a3ff; padding: 20px;">
                        <tr>
                          <td>
                            <p style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #1a1a1a;">Platform Specifications</p>
                            <p style="margin: 0; font-size: 14px; color: #4a4a4a; line-height: 1.6;">
                              • NIST FIPS 203 ML-KEM-768 (Post-Quantum Cryptography)<br>
                              • IBM ibm_brisbane 127-qubit hardware access<br>
                              • 50-100μs key exchange latency<br>
                              • Multi-provider quantum RNG failover (IBM, IonQ, Rigetti, AWS Braket, OQC)<br>
                              • 29,400 TPS peak throughput<br>
                              • SOC 2 Type II, ISO 27001, HIPAA, PCI DSS certified
                            </p>
                          </td>
                        </tr>
                      </table>

                      <p style="margin: 0 0 24px; font-size: 16px; color: #4a4a4a; line-height: 1.6;">
                        For immediate technical inquiries, please contact our enterprise team at <a href="mailto:sales@qdaria.com" style="color: #04a3ff; text-decoration: none;">sales@qdaria.com</a>.
                      </p>

                      <p style="margin: 0; font-size: 16px; color: #4a4a4a; line-height: 1.6;">
                        We look forward to supporting your quantum-safe transition.
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding: 32px 40px; border-top: 1px solid #e5e5e5; background-color: #fafafa;">
                      <p style="margin: 0 0 8px; font-size: 15px; font-weight: 600; color: #1a1a1a;">Qdaria Technologies</p>
                      <p style="margin: 0; font-size: 13px; color: #6a6a6a; line-height: 1.5;">
                        Quantum-Safe Infrastructure for Mission-Critical Systems<br>
                        <a href="https://qdaria.com" style="color: #04a3ff; text-decoration: none;">qdaria.com</a> |
                        <a href="mailto:sales@qdaria.com" style="color: #04a3ff; text-decoration: none;">sales@qdaria.com</a>
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
    text: `Your Zipminator Enterprise Access Application — Next Steps

Dear ${data.fullName},

Thank you for your interest in Zipminator Enterprise. We've received your application for early access to our quantum-safe encryption platform and have begun the qualification process.

APPLICATION SUMMARY
Organization: ${data.companyName}
Sector: ${data.industry.charAt(0).toUpperCase() + data.industry.slice(1)}
Projected Volume: ${data.expectedVolume} operations/month

WHAT HAPPENS NEXT

1. Technical Review (24-48 hours)
   Our engineering team will assess your requirements and prepare a tailored integration proposal.

2. NDA & Architecture Discussion
   We'll schedule a confidential consultation to review technical specifications, compliance requirements, and deployment architecture.

3. Enterprise Access Provisioning
   Upon approval, your dedicated environment will be configured with quantum-safe infrastructure and priority support channels.

PLATFORM SPECIFICATIONS
• NIST FIPS 203 ML-KEM-768 (Post-Quantum Cryptography)
• IBM ibm_brisbane 127-qubit hardware access
• 50-100μs key exchange latency
• Multi-provider quantum RNG failover (IBM, IonQ, Rigetti, AWS Braket, OQC)
• 29,400 TPS peak throughput
• SOC 2 Type II, ISO 27001, HIPAA, PCI DSS certified

For immediate technical inquiries, please contact our enterprise team at sales@qdaria.com.

We look forward to supporting your quantum-safe transition.

Qdaria Technologies
Quantum-Safe Infrastructure for Mission-Critical Systems
qdaria.com | sales@qdaria.com`
  };

  try {
    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error('Failed to send user confirmation email:', error);
    return false;
  }
}

// Send sales alert email
export async function sendSalesAlert(data: WaitlistEmailData): Promise<boolean> {
  if (!isSendGridConfigured()) {
    console.warn('SendGrid not configured - skipping sales alert email');
    return false;
  }

  const fromEmail = import.meta.env.SENDGRID_FROM_EMAIL || 'noreply@qdaria.com';
  const fromName = import.meta.env.SENDGRID_FROM_NAME || 'Qdaria Technologies';
  const salesEmail = import.meta.env.SALES_EMAIL || 'sales@qdaria.com';

  const msg = {
    to: salesEmail,
    cc: 'mo@qdaria.com',
    from: { email: fromEmail, name: fromName },
    subject: `🔒 Enterprise Lead: ${data.companyName} — ${data.industry.charAt(0).toUpperCase() + data.industry.slice(1)} | ${data.expectedVolume}${data.couponCode ? ` | Coupon: ${data.couponCode}` : ''}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 20px;">
            <tr>
              <td align="center">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 700px; background-color: #ffffff; border-radius: 8px;">

                  <tr>
                    <td style="padding: 32px; background: linear-gradient(135deg, #04a3ff 0%, #0284c7 100%); border-radius: 8px 8px 0 0;">
                      <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">
                        🔒 New Enterprise Lead — Zipminator
                      </h1>
                      <p style="margin: 8px 0 0; font-size: 14px; color: rgba(255,255,255,0.9);">
                        Submission ID: ${data.submissionId || 'N/A'}
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 32px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                          <td style="padding-bottom: 24px;">
                            <p style="margin: 0; font-size: 13px; font-weight: 600; color: #6a6a6a; text-transform: uppercase; letter-spacing: 0.5px;">Contact Details</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse;">
                              <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px; color: #6a6a6a; width: 35%;">Name</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 15px; font-weight: 600; color: #1a1a1a;">${data.fullName}</td>
                              </tr>
                              <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px; color: #6a6a6a;">Email</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                                  <a href="mailto:${data.email}" style="font-size: 15px; font-weight: 600; color: #04a3ff; text-decoration: none;">${data.email}</a>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px; color: #6a6a6a;">Company</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 15px; font-weight: 600; color: #1a1a1a;">${data.companyName}</td>
                              </tr>
                              <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px; color: #6a6a6a;">Industry</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                                  <span style="display: inline-block; padding: 4px 12px; background-color: #f0f9ff; color: #04a3ff; font-size: 13px; font-weight: 600; border-radius: 4px;">${data.industry.toUpperCase()}</span>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px; color: #6a6a6a;">Projected Volume</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 15px; font-weight: 600; color: #1a1a1a;">${data.expectedVolume} ops/month</td>
                              </tr>
                              ${data.couponCode ? `
                              <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px; color: #6a6a6a;">Coupon Code</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                                  <span style="display: inline-block; padding: 6px 12px; background-color: #dcfce7; color: #15803d; font-size: 14px; font-weight: 700; font-family: monospace; border-radius: 4px; border: 1px solid #86efac;">${data.couponCode}</span>
                                </td>
                              </tr>` : ''}
                              ${data.useCase ? `
                              <tr>
                                <td style="padding: 12px 0; font-size: 14px; color: #6a6a6a; vertical-align: top;">Use Case</td>
                                <td style="padding: 12px 0; font-size: 14px; color: #1a1a1a; line-height: 1.6;">${data.useCase}</td>
                              </tr>` : ''}
                            </table>
                          </td>
                        </tr>
                      </table>

                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 32px; background-color: #fffbeb; border-left: 3px solid #f59e0b; padding: 16px; border-radius: 4px;">
                        <tr>
                          <td>
                            <p style="margin: 0 0 8px; font-size: 13px; font-weight: 600; color: #92400e;">⚡ PRIORITY ACTION REQUIRED</p>
                            <p style="margin: 0; font-size: 14px; color: #78350f; line-height: 1.5;">
                              Enterprise prospect identified. Initiate technical review within 24 hours and schedule NDA discussion for architecture consultation.
                            </p>
                          </td>
                        </tr>
                      </table>

                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 24px;">
                        <tr>
                          <td align="center">
                            <a href="mailto:${data.email}?subject=Zipminator Enterprise Access — Next Steps&body=Dear ${data.fullName},"
                               style="display: inline-block; padding: 14px 32px; background-color: #04a3ff; color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; border-radius: 6px;">
                              Reply to Lead
                            </a>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 24px 32px; background-color: #f9f9f9; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e5e5;">
                      <p style="margin: 0; font-size: 12px; color: #6a6a6a; line-height: 1.5;">
                        <strong>Response Protocol:</strong> Technical review → NDA execution → Architecture consultation → Enterprise provisioning<br>
                        <strong>SLA:</strong> Initial contact within 24 hours | Architecture call within 48 hours
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
    text: `NEW ENTERPRISE LEAD — ZIPMINATOR

Submission ID: ${data.submissionId || 'N/A'}

CONTACT DETAILS
Name: ${data.fullName}
Email: ${data.email}
Company: ${data.companyName}
Industry: ${data.industry.toUpperCase()}
Projected Volume: ${data.expectedVolume} ops/month
${data.useCase ? `\nUse Case:\n${data.useCase}` : ''}

⚡ PRIORITY ACTION REQUIRED
Enterprise prospect identified. Initiate technical review within 24 hours and schedule NDA discussion for architecture consultation.

RESPONSE PROTOCOL
1. Technical review → NDA execution → Architecture consultation → Enterprise provisioning
2. SLA: Initial contact within 24 hours | Architecture call within 48 hours

Reply to: ${data.email}`
  };

  try {
    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error('Failed to send sales alert email:', error);
    return false;
  }
}
