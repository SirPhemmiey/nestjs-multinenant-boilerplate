import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getDataSource, getTenantConnection } from 'modules/tenancy/tenancy.utils';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-organization-dto';
import { Organization } from './entities/organization.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrganizationsService {

  constructor(
    @InjectRepository(Organization)
    private readonly organizationssRepository: Repository<Organization>,
  ) { }

  async create(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    let tenant = new Organization();

    tenant.name = createOrganizationDto.name;
    const tenantRandId = uuidv4().split('-')[0];
    const schemaName = `tenant_${tenantRandId}`;
    tenant.schemaName = schemaName;
    await this.organizationssRepository.save(tenant);

    const initDataSource = await (await getDataSource()).initialize();
    await initDataSource.query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);

    const connection = await getTenantConnection(`${tenantRandId}`);
    await connection.runMigrations();
    await connection.destroy();

    return tenant;
  }

  async findAll(): Promise<Organization[]> {
    return this.organizationssRepository.find();
  }
}
