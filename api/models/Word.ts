/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DifficultyEnum } from './DifficultyEnum';
export type Word = {
    word: string;
    definition: string;
    example?: (string | null);
    difficulty: DifficultyEnum;
    id: string;
    deck_id: string;
};

