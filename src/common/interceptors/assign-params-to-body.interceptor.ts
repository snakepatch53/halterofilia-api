// src/interceptors/assign-params.interceptor.ts

import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AssignParamsToBodyInterceptor implements NestInterceptor {
    // constructor(private readonly reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request: Request = context.switchToHttp().getRequest();
        // const paramsToAssign = this.reflector.get<string[]>(
        //     'assignParams',
        //     context.getHandler(),
        // );

        if (request.params) {
            request.body = request.body || {};
            request.body.params = request.params || {};
        }

        return next.handle();
    }
}
