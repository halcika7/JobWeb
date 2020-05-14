import { BaseController } from './Base';

// types
import { Response } from 'express';
import { PostContactMessage } from '@ctypes';

// services
import { ContactService } from '@service/Contact';

// middlewares
import { errorHandle } from '@middleware/errorHandling';

// decorator
import { Controller } from '@decorator/class';
import { Post } from '@decorator/method';
import { Body, Res } from '@decorator/param';
import { ErrorMiddleware } from '@decorator/middleware';

@Controller('api/contact')
export class ContactController extends BaseController {
  private readonly contact: ContactService;

  constructor() {
    super(ContactController);
    this.contact = new ContactService();
  }

  @Post('')
  @ErrorMiddleware(errorHandle)
  async post(@Body() body: PostContactMessage, @Res() res: Response) {
    const { status, ...rest } = await this.contact.makeNewMessage(body);
    return this.sendResponse(res, status, { ...rest });
  }
}
