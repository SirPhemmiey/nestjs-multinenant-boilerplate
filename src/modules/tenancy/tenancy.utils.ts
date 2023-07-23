import { ormConfig } from 'database/typeorm.config';
import { DataSource } from 'typeorm';
import * as tenantsOrmconfig from '../../tenants-orm.config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export async function getDataSource() {
    const appDataSource = new DataSource(ormConfig);
    return appDataSource;
}

export async function getTenantConnection(tenantId: string): Promise<DataSource> {
    const connectionName = `tenant_${tenantId}`;

    const appDataSource = new DataSource({
        ...ormConfig,
        ...(tenantsOrmconfig as PostgresConnectionOptions),
        name: connectionName,
        schema: connectionName,
    });

    if (appDataSource.isInitialized) {
        return appDataSource;
    }

    await appDataSource.initialize();
    return appDataSource;
}