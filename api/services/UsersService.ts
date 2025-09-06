/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AchievementDetail } from '../models/AchievementDetail';
import type { User } from '../models/User';
import type { UserProfileUpdate } from '../models/UserProfileUpdate';
import type { UserSettingsUpdate } from '../models/UserSettingsUpdate';
import type { UserStats } from '../models/UserStats';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * Read Users Me
     * Fetches the profile data for the currently authenticated user.
     * @returns User Successful Response
     * @throws ApiError
     */
    public static getUser(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/me',
        });
    }
    /**
     * Update User Me
     * Updates the profile of the currently authenticated user.
     * @param requestBody
     * @returns User Successful Response
     * @throws ApiError
     */
    public static updateUser(
        requestBody: UserProfileUpdate,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/users/me',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update User Me Settings
     * Updates user-specific settings for the currently authenticated user.
     * @param requestBody
     * @returns User Successful Response
     * @throws ApiError
     */
    public static updateSettings(
        requestBody: UserSettingsUpdate,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/users/me/settings',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read User Me Achievements
     * Gets the list of all achievements for the currently authenticated user.
     * @returns AchievementDetail Successful Response
     * @throws ApiError
     */
    public static getAchievements(): CancelablePromise<Array<AchievementDetail>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/me/achievements',
        });
    }
    /**
     * Read User Me Stats
     * Fetches aggregated statistics for the user's profile dashboards.
     * @returns UserStats Successful Response
     * @throws ApiError
     */
    public static getStats(): CancelablePromise<UserStats> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/me/stats',
        });
    }
}
