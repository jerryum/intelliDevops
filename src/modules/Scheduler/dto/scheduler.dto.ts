import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { json } from 'sequelize';

export class CreateCronScheduleDto{

@IsNotEmpty()
public cronTab: string;

@IsNotEmpty()
public apiUrl: string;

@IsNotEmpty()
public clusterUuid: string;

@IsNotEmpty()
public templateUuid: string;

public receiveChannel: string;

@IsNotEmpty()
public name: string;

public summary: string;

public apijson: object;
}