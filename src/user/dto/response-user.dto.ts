import { Exclude, Expose, Transform } from 'class-transformer';
import {
    GENERAL_FILES_PATH,
    USER_FILES_PATH,
} from 'src/common/constants/path.constants';

export class ResponseUserDto {
    @Exclude()
    password: string;

    @Expose()
    @Transform(({ obj }) => {
        // Obtiene la URL base del servidor desde las variables de entorno, con un fallback
        const serverUrl = process.env.APP_URL;
        const normalizedPathPhoto = USER_FILES_PATH.startsWith('./')
            ? USER_FILES_PATH.slice(1)
            : USER_FILES_PATH;
        const normalizedPath = GENERAL_FILES_PATH.startsWith('./')
            ? GENERAL_FILES_PATH.slice(1)
            : GENERAL_FILES_PATH;
        let photo_url = normalizedPath + '/user.png';
        if (obj?.photo) photo_url = `${normalizedPathPhoto}/${obj.photo}`;
        return `${serverUrl}${photo_url}`;
    })
    photo_url: string;
}
