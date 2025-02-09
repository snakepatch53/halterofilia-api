import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface ResponseDto<T> {
    success: boolean;
    statusCode: number;
    data?: T;
    error?: string;
    message?: string[];
}

@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, ResponseDto<T>>
{
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<ResponseDto<T>> {
        // Obtenemos el objeto de respuesta HTTP para extraer el statusCode (si ya fue seteado)
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const statusCode = response.statusCode || 200;

        return next.handle().pipe(
            map((data) => {
                const status = data?.response?.statusCode || statusCode;
                const success = status >= 200 && status < 300;
                const message = data?.response?.message;
                const error = data?.response?.error;

                if (success) {
                    return {
                        success,
                        statusCode: status,
                        data,
                    };
                }

                return {
                    success,
                    statusCode: status,
                    message: Array.isArray(message) ? message : [message],
                    error: error,
                };
            }),
            catchError((err) => {
                // throw new Error(err);

                const status = err?.response?.statusCode || 500;
                const success = status >= 200 && status < 300;
                const message = err?.response?.message;
                const error = err?.response?.error;

                if (status === 500) throw new Error(err);

                // Retornamos un observable con la estructura de error deseada
                return of({
                    success,
                    statusCode: status,
                    message: Array.isArray(message) ? message : [message],
                    error,
                });
            }),
        );
    }
}
// @Injectable()
// export class TransformInterceptor<T>
//     implements NestInterceptor<T, ResponseDto<T>>
// {
//     intercept(
//         context: ExecutionContext,
//         next: CallHandler,
//     ): Observable<ResponseDto<T>> {
//         // Obtenemos el objeto de respuesta HTTP para extraer el statusCode (si ya fue seteado)
//         const ctx = context.switchToHttp();
//         const response = ctx.getResponse();
//         const statusCode = response.statusCode || 200;

//         return next.handle().pipe(
//             // Si la respuesta es exitosa, la envolvemos en el formato deseado
//             map((data) => ({
//                 success: true,
//                 statusCode,
//                 data,
//             })),
//             // Si ocurre un error, lo atrapamos y transformamos la respuesta de error
//             catchError((err) => {
//                 let status = 500;
//                 if (err instanceof HttpException) {
//                     status = err.getStatus();
//                 }

//                 let message = '';
//                 let errorName = '';
//                 // Obtener la respuesta interna de la excepción
//                 const exceptionResponse = err.getResponse
//                     ? err.getResponse()
//                     : err;

//                 if (typeof exceptionResponse === 'string') {
//                     message = exceptionResponse;
//                     errorName = err.name;
//                 } else if (
//                     typeof exceptionResponse === 'object' &&
//                     exceptionResponse !== null
//                 ) {
//                     // Si la información del error viene anidada (algunos errores tienen una propiedad 'response')
//                     if (
//                         'response' in exceptionResponse &&
//                         typeof exceptionResponse.response === 'object'
//                     ) {
//                         message =
//                             exceptionResponse.response.message || err.message;
//                         errorName =
//                             exceptionResponse.response.error || err.name;
//                     } else {
//                         message = exceptionResponse.message || err.message;
//                         errorName = exceptionResponse.error || err.name;
//                     }
//                 } else {
//                     message = err.message;
//                     errorName = err.name;
//                 }

//                 // Retornamos un observable con la estructura de error deseada
//                 return of({
//                     success: false,
//                     statusCode: status,
//                     error: {
//                         message,
//                         error: errorName,
//                     },
//                 });
//             }),
//         );
//     }
// }
