import { DataSource } from 'typeorm';

// 🔥 Variable pública para almacenar `DataSource`
export let AppDataSource: DataSource;

// 🔥 Función para inicializar `DataSource`
export function setAppDataSource(dataSource: DataSource) {
    AppDataSource = dataSource;
}
