import { ormConfig } from 'database/typeorm.config';
import { join } from 'path';

module.exports = {
    ...ormConfig,
    autoLoadEntities: true,
    cache: {
        alwaysEnabled: true,
    },
    entities: [join(__dirname, '/modules/tenanted/**/entities/*{.ts,.js}')],
    migrations: [join(__dirname, '/database/migrations/tenanted/*{.ts,.js}')],
};