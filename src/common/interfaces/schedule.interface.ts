export interface IScheduleResponse {
    scheduleKey: number;
    responseData: object;
}

export interface ISchedule {
    scheduleKey: number;
    scheduleId: string;
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
    scheduleStatus: string;
    reRunRequire: boolean;
    timezone: string;
    accountId: string;
    clusterId: string;
}
