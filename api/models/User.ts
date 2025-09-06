/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Deck } from './Deck';
export type User = {
    email: string;
    full_name: string;
    id: string;
    avatar_url?: (string | null);
    bio?: (string | null);
    streak: number;
    best_streak: number;
    level: number;
    daily_goal: number;
    notifications_enabled: boolean;
    sound_effects_enabled: boolean;
    dark_mode_enabled: boolean;
    created_at: string;
    decks?: Array<Deck>;
};

