import {
    applyDecorators,
    UseInterceptors,
    ExecutionContext,
    BadRequestException,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

interface UploadOptions {
    fieldName: string;
    allowedTypes?: string[]; // Ej: ['image/jpeg', 'image/png']
    maxSizeMB?: number; // Tamaño máximo en MB
    fileNamePattern?: RegExp; // Patrón para validar el nombre del archivo
}
// para controlador
export function ValidateFiles(uploadOptions: UploadOptions | UploadOptions[]) {
    // Si es un arreglo de opciones, se utiliza FileFieldsInterceptor para manejar múltiples campos
    const uploadOptionsArray = Array.isArray(uploadOptions)
        ? uploadOptions
        : [uploadOptions];

    // Validamos que cada opción tenga el campo obligatorio 'fieldName'
    uploadOptionsArray.forEach((option) => {
        if (!option.fieldName)
            throw new Error(
                `❌ UploadFile: 'fieldName' es obligatorio en todas las opciones.`,
            );
    });

    // Construimos el arreglo de definiciones para cada campo
    const fields = uploadOptionsArray.map((option) => ({
        name: option.fieldName,
        maxCount: 1,
    }));

    return applyDecorators(
        // Interceptor que extrae múltiples archivos y los coloca en request.files
        UseInterceptors(FileFieldsInterceptor(fields)),
        UseInterceptors({
            async intercept(context: ExecutionContext, next) {
                const request = context.switchToHttp().getRequest();
                // request.files tendrá la forma { [campo]: File[] }
                const files = request?.files as {
                    [key: string]: Express.Multer.File[];
                };

                // console.log('📂 Archivos recibidos:', files);
                if (!files)
                    throw new BadRequestException('No se recibieron archivos');

                // Iteramos sobre cada opción para validar su archivo correspondiente
                for (const option of uploadOptionsArray) {
                    if (!option?.fieldName) continue;
                    const fileArray = files[option?.fieldName];
                    if (fileArray && fileArray.length > 0) {
                        const file = fileArray[0]; // Se espera un solo archivo por campo

                        // Validación de tipo
                        if (
                            option.allowedTypes &&
                            !option.allowedTypes.includes(file.mimetype)
                        ) {
                            throw new BadRequestException(
                                `Solo se permiten archivos de tipo: ${option.allowedTypes.join(
                                    ', ',
                                )} en el campo ${option.fieldName}`,
                            );
                        }

                        // Validación de tamaño
                        if (
                            option.maxSizeMB &&
                            file.size > option.maxSizeMB * 1024 * 1024
                        ) {
                            throw new BadRequestException(
                                `El archivo en el campo ${option.fieldName} no puede superar los ${option.maxSizeMB}MB`,
                            );
                        }

                        // Validación de nombre
                        if (
                            option.fileNamePattern &&
                            !option.fileNamePattern.test(file.originalname)
                        ) {
                            throw new BadRequestException(
                                `El nombre del archivo en el campo ${option.fieldName} no cumple con el formato esperado`,
                            );
                        }
                    }
                }

                return next.handle();
            },
        }),
    );
}
