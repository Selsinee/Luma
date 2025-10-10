/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DifficultyEnum } from './DifficultyEnum';
import type { StatusEnum } from './StatusEnum';
export type WordWithProgress = {
    word: string;
    definition: string;
    example?: (string | null);
    difficulty: DifficultyEnum;
    id: string;
    status?: (StatusEnum | null);
    last_reviewed_at?: (string | null);
};

