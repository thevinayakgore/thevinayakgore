// app/api/send/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper function to prevent XSS (server-safe version)
function escapeHtml(text: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, projectType, message } = body;

    // Validate required fields
    if (!email || !projectType || !message) {
      return NextResponse.json(
        { error: "Email, project type, and message are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Escape all user inputs for safety
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeProjectType = escapeHtml(projectType);
    const safeMessage = escapeHtml(message);

    // Send email
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <creator@venumity.com>",
      to: ["thevinayakgore@gmail.com"],
      subject: `New Project Inquiry from ${safeName || "Anonymous"}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Project Inquiry</title>
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
                line-height: 1.6; 
                color: #1a1a1a; 
                max-width: 600px; 
                margin: 0 auto; 
                padding: 20px; 
                background: #f5f5f5;
              }
              .container { 
                background: #ffffff; 
                border-radius: 12px; 
                padding: 40px; 
                box-shadow: 0 2px 10px rgba(0,0,0,0.05); 
                border: 1px solid #eaeaea; 
              }
              h1 { 
                font-size: 24px; 
                margin-bottom: 20px; 
                color: #1a1a1a; 
                border-bottom: 2px solid #f0f0f0; 
                padding-bottom: 15px; 
              }
              .field { margin-bottom: 20px; }
              .label { 
                font-weight: 600; 
                color: #4a4a4a; 
                font-size: 14px; 
                text-transform: uppercase; 
                letter-spacing: 0.5px; 
                margin-bottom: 4px; 
              }
              .value { 
                font-size: 16px; 
                color: #1a1a1a; 
                background: #f7f7f7; 
                padding: 10px 14px; 
                border-radius: 6px; 
                margin-top: 4px; 
                word-break: break-word;
              }
              .message-box { 
                background: #f7f7f7; 
                padding: 16px; 
                border-radius: 6px; 
                margin-top: 4px; 
                white-space: pre-wrap; 
                word-break: break-word;
              }
              .footer { 
                margin-top: 30px; 
                padding-top: 20px; 
                border-top: 2px solid #f0f0f0; 
                font-size: 14px; 
                color: #666; 
              }
              .badge { 
                display: inline-block; 
                background: #e8f5e9; 
                color: #2e7d32; 
                padding: 4px 12px; 
                border-radius: 20px; 
                font-size: 12px; 
                font-weight: 600; 
              }
              a { color: #0066cc; text-decoration: none; }
              a:hover { text-decoration: underline; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>📬 New Project Inquiry</h1>
              
              <div class="field">
                <div class="label">👤 Name</div>
                <div class="value">${safeName || "Not provided"}</div>
              </div>
              
              <div class="field">
                <div class="label">📧 Email</div>
                <div class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></div>
              </div>
              
              <div class="field">
                <div class="label">🚀 Project Type</div>
                <div class="value">${safeProjectType}</div>
              </div>
              
              <div class="field">
                <div class="label">💬 Message</div>
                <div class="message-box">${safeMessage}</div>
              </div>
              
              <div class="footer">
                <span class="badge">🔗 New Lead</span>
                <p style="margin-top: 10px; font-size: 13px; color: #888;">
                  This message was sent from your portfolio contact form.
                </p>
                <p style="margin-top: 5px; font-size: 12px; color: #aaa;">
                  Received: ${new Date().toLocaleString('en-US', { 
                    timeZone: 'Asia/Kolkata',
                    dateStyle: 'full',
                    timeStyle: 'medium'
                  })}
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
        New Project Inquiry
        
        Name: ${safeName || "Not provided"}
        Email: ${safeEmail}
        Project Type: ${safeProjectType}
        Message: ${safeMessage}
        
        ---
        Received: ${new Date().toLocaleString('en-US', { 
          timeZone: 'Asia/Kolkata',
          dateStyle: 'full',
          timeStyle: 'medium'
        })}
        
        This message was sent from your portfolio contact form.
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}