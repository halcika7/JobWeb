import { BaseService } from './Base';
import sgMail from '@sendgrid/mail';
import { Configuration } from '@env';
import pug from 'pug';
import { join } from 'path';

sgMail.setApiKey(Configuration.appConfig.sendgrid);

interface EmailData {
  to: string;
  token?: string;
  resetPassword?: boolean;
  subject: string;
}

export class EmailService extends BaseService {
  constructor() {
    super(EmailService);
  }

  async sendEmail({ to, subject, ...rest }: EmailData, file: string) {
    const filePath = join(__dirname, `../emails/${file}.pug`);

    const forwardObject = {
      ...rest,
      URL: Configuration.appConfig.url,
    };

    const msg = {
      to,
      from: 'test@example.com',
      subject,
      html: pug.renderFile(filePath, { ...forwardObject }),
    };

    return sgMail.send(msg);
  }
}
