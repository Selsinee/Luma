/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SessionTypeEnum } from './SessionTypeEnum';
export type StudySession = {
    id: string;
    user_id: string;
    deck_id: string;
    session_type: SessionTypeEnum;
    score_percentage?: (number | null);
    words_reviewed: number;
    completed_at: string;
    duration_seconds: number;
};

