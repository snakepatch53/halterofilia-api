// src/decorators/assign-params.decorator.ts

import { applyDecorators, UseInterceptors } from '@nestjs/common'; // ✅
import { AssignParamsToBodyInterceptor } from '../interceptors/assign-params-to-body.interceptor';

export function AssignParamsToBody() {
    return applyDecorators(UseInterceptors(AssignParamsToBodyInterceptor));
}
// export function AssignParams(...params: string[]) {
//     return applyDecorators(
//         SetMetadata('assignParams', params),
//         UseInterceptors(AssignParamsInterceptor),
//     );
// }
