/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Word } from './Word';
export type Deck = {
    title: string;
    description?: (string | null);
    category: string;
    id: string;
    user_id: string;
    words?: Array<Word>;
};

