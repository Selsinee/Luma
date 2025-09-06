/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StatusEnum } from './StatusEnum';
export type UserWordProgress = {
    user_id: string;
    word_id: string;
    status: StatusEnum;
    last_reviewed_at: string;
    correct_streak: number;
};

