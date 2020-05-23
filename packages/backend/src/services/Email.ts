import { BaseService } from './Base';
import sgMail from '@sendgrid/mail';
import { Configuration } from '@env';
import pug from 'pug';
import { join } from 'path';

sgMail.setApiKey(Configuration.appConfig.sendgrid);

interface EmailData {
  to: string;
  token?: string;
  subject: string;
}

export class EmailService extends BaseService {
  constructor() {
    super(EmailService);
  }

  async sendEmail({ to, token, subject }: EmailData, file: string) {
    const filePath = join(__dirname, `../emails/${file}.pug`);

    const forwardObject = {
      token,
      URL: Configuration.appConfig.url,
    };

    const msg = {
      to,
      from: 'test@example.com',
      subject,
      html: pug.renderFile(filePath, { ...forwardObject }),
    };

    try {
      const em = await sgMail.send(msg);
      return em;
    } catch (error) {
      this.logger.error(error, 'email');
      return null;
    }
  }
}
