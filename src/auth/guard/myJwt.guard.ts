/**
 * Created by Truong on 10/08/23.
 * truongdx@runsystem.net - Xuan Truong
 * Function Name
 * */

import { AuthGuard } from '@nestjs/passport';

export class MyJwtGuard extends AuthGuard('jwt') {}
