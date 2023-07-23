import { IsNotEmpty, IsString } from "class-validator";

export class CreateOrganizationDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}