import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { json } from 'sequelize';

export class CreateCronScheduleDto {
  @IsNotEmpty()
  public cronTab: string;

  @IsNotEmpty()
  public apiUrl: string;

  @IsNotEmpty()
  public name: string;

  public summary: string;

  public apiBody: object;

  //public scheduleKey: number;
}

export interface ICancelScheduledCronTaskDto {
  apiKey: number;
}
