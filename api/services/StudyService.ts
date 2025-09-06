/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StudySession } from '../models/StudySession';
import type { StudySessionCreate } from '../models/StudySessionCreate';
import type { UserWordProgress } from '../models/UserWordProgress';
import type { UserWordProgressUpdate } from '../models/UserWordProgressUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StudyService {
    /**
     * Create Study Session
     * Records the completion of a study session (flashcard or quiz).
     * @param requestBody
     * @returns StudySession Successful Response
     * @throws ApiError
     */
    public static createStudySessionStudySessionsPost(
        requestBody: StudySessionCreate,
    ): CancelablePromise<StudySession> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/study/sessions',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Word Progress
     * Updates the user's progress for a single word (e.g., marks it as "mastered").
     * @param wordId
     * @param requestBody
     * @returns UserWordProgress Successful Response
     * @throws ApiError
     */
    public static updateWordProgressStudyProgressWordIdPut(
        wordId: string,
        requestBody: UserWordProgressUpdate,
    ): CancelablePromise<UserWordProgress> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/study/progress/{word_id}',
            path: {
                'word_id': wordId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
