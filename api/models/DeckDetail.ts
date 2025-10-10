/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WordWithProgress } from './WordWithProgress';
export type DeckDetail = {
    title: string;
    description?: (string | null);
    category: string;
    id: string;
    user_id: string;
    mastery_percentage: number;
    words_mastered: number;
    words_learning: number;
    easy_count: number;
    medium_count: number;
    hard_count: number;
    words?: Array<WordWithProgress>;
    studied_today: number;
    last_studied?: (string | null);
};

