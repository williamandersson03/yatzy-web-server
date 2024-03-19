import { Controller, Post, Body } from '@nestjs/common';
import { DeleteMeService } from './deleteme.service';

@Controller('api')
export class DeleteMeController {
  constructor(private authService: DeleteMeService) {}

  @Post('deleteme')
  deleteme(@Body() body: any) {
    const { username, password } = body;
    return this.authService.deleteme(username, password);
  }
}
