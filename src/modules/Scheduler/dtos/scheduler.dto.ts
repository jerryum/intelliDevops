import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { json } from 'sequelize';

export class CreateCronScheduleDto{
    @IsNotEmpty()
    public cronTab: string;

    @IsNotEmpty()
    public apiUrl: string;

    @IsNotEmpty()
    public name: string;

    @IsNotEmpty()
    public summary: string;

    @IsNotEmpty()
    public apiBody: object;

    public scheduleFrom: Date;

    public scheduleTo: Date;

    @IsNotEmpty()
    public reRunRequire: boolean;

    public timezone: string;
}

export interface ICancelScheduledCronTaskDto {
  apiId: string;
}
