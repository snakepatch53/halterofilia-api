import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        // 1. Leer los roles requeridos de la metadata (definidos con @Roles)
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );
        if (!requiredRoles) {
            // Si la ruta no especifica roles, permitir el acceso
            return true;
        }

        // 2. Obtener el usuario de la request
        const { user } = context.switchToHttp().getRequest();
        // Ejemplo: user.roles = ['admin', 'user']

        // 3. Verificar si el usuario posee al menos uno de los roles requeridos
        return requiredRoles.some((role) => user.role?.includes(role));
    }
}
