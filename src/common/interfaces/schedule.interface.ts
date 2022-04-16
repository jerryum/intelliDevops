export interface IScheduleResponse {
    scheduleKey: number;
}

export interface ISchedule {
    scheduleKey: number;
    scheduleName: string;
    scheduleSummary: string;
    createdAt: Date;
    updatedAt: Date;
    cancelledAt: Date;
    scheduleApiUrl: string;
    scheduleCronTab: string;
    scheduleApiBody: Object;
    scheduleFrom: Date;
    scheduleTo: Date;
}