import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrganizationsService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization-dto';
import { Organization } from './entities/organization.entity';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly OrganizationsService: OrganizationsService) { }

  @Post('/create')
  create(@Body() createTenantDto: CreateOrganizationDto): Promise<Organization> {
    return this.OrganizationsService.create(createTenantDto);
  }

  @Get()
  findAll(): Promise<Organization[]> {
    return this.OrganizationsService.findAll();
  }
}