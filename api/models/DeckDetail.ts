/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Word } from './Word';
export type DeckDetail = {
    title: string;
    description?: (string | null);
    category: string;
    id: string;
    user_id: string;
    words?: Array<Word>;
    mastery_percentage: number;
    words_mastered: number;
    words_learning: number;
    easy_count: number;
    medium_count: number;
    hard_count: number;
};

