/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DifficultyBreakdown } from './DifficultyBreakdown';
import type { MonthlyProgress } from './MonthlyProgress';
import type { WeeklyActivity } from './WeeklyActivity';
export type UserDashboardStats = {
    study_time_seconds: number;
    accuracy_rate: number;
    total_words_mastered: number;
    days_active: number;
    weekly_words_goal: number;
    weekly_words_progress: number;
    words_studied_today: number;
    monthly_progress: Array<MonthlyProgress>;
    difficulty_breakdown: DifficultyBreakdown;
    weekly_activity: Array<WeeklyActivity>;
};

