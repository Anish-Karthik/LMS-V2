import { sendmail } from "./mailer"

export const sendWelcomeEmail = async (email: string, name: string) => {
  try {
    const currentYear = new Date().getFullYear()
    const dashboard = process.env.NEXT_PUBLIC_APP_URL + "/student/dashboard"
    const contactPage = process.env.NEXT_PUBLIC_APP_URL + "/contact"
    const welcomeMailTemplate = `
      <html lang="en">

        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome Email</title>
              <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }

            .email-container {
              background-color: #ffffff;
              margin: 20px auto;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              max-width: 600px;
            }

            .header {
              text-align: center;
              padding-bottom: 20px;
              border-bottom: 1px solid #eeeeee;
            }

            .header h1 {
              margin: 0;
              color: #333333;
            }

            .content {
              padding: 20px 0;
            }

            .content p {
              line-height: 1.6;
              color: #666666;
            }

            .footer {
              text-align: center;
              padding-top: 20px;
              border-top: 1px solid #eeeeee;
              color: #aaaaaa;
              font-size: 12px;
            }

            .btn {
              display: inline-block;
              background-color: #007BFF;
              color: #ffffff;
              padding: 10px 20px;
              border-radius: 5px;
              text-decoration: none;
              font-weight: bold;
            }
          </style>
        </head>

        <body>
          <style>
            section {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }

            .email-container {
              background-color: #ffffff;
              margin: 20px auto;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              max-width: 600px;
            }

            .header {
              text-align: center;
              padding-bottom: 20px;
              border-bottom: 1px solid #eeeeee;
            }

            .header h1 {
              margin: 0;
              color: #333333;
            }

            .content {
              padding: 20px 0;
            }

            .content p {
              line-height: 1.6;
              color: #666666;
            }

            .footer {
              text-align: center;
              padding-top: 20px;
              border-top: 1px solid #eeeeee;
              color: #aaaaaa;
              font-size: 12px;
            }

            .btn {
              display: inline-block;
              background-color: #007BFF;
              color: #ffffff;
              padding: 10px 20px;
              border-radius: 5px;
              text-decoration: none;
              font-weight: bold;
            }
          </style>
          <div class="email-container">
            <div class="header">
              <h1>Welcome to Praglis!</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>Thank you for joining us! We're excited to have you on board. Here at Praglis, we strive to provide
                the best experience for our users.</p>
              <p>To get started, click the button to view course</p>
              <p style="text-align: center;">
                <a href="${dashboard}" class="btn">View Course</a>
              </p>
              <p>If you have any questions, feel free to reply to this email or visit our <a href="${contactPage}">support
                  page</a>.</p>
              <p>Best regards,<br>The Praglis Team</p>
            </div>
            <div class="footer">
              <p>© ${currentYear} Praglis. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
      `
    console.log(process.env.NEXT_PUBLIC_APP_URL)
    sendmail({
      to: [email],
      subject: "Welcome to Praglis!",
      html: welcomeMailTemplate,
    })
  } catch (err) {
    console.log("Error in sendWelcomeEmail", err)
    console.error(err)
  }
}
