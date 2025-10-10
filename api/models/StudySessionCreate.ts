/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SessionTypeEnum } from './SessionTypeEnum';
import type { WordProgressUpdate } from './WordProgressUpdate';
export type StudySessionCreate = {
    deck_id: string;
    session_type: SessionTypeEnum;
    score_percentage?: (number | null);
    words_reviewed: number;
    duration_seconds: number;
    progress_updates: Array<WordProgressUpdate>;
};

