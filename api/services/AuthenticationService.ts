/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_login_for_access_token_auth_login_post } from '../models/Body_login_for_access_token_auth_login_post';
import type { GoogleToken } from '../models/GoogleToken';
import type { Token } from '../models/Token';
import type { UserCreate } from '../models/UserCreate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthenticationService {
    /**
     * Register User
     * Creates a new user account and returns an access token.
     * @param requestBody
     * @returns Token Successful Response
     * @throws ApiError
     */
    public static registerUserAuthRegisterPost(
        requestBody: UserCreate,
    ): CancelablePromise<Token> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Login For Access Token
     * Authenticates a user and returns an access token.
     * Uses form data (username=email, password=password) for OAuth2 compatibility.
     * @param formData
     * @returns Token Successful Response
     * @throws ApiError
     */
    public static loginForAccessTokenAuthLoginPost(
        formData: Body_login_for_access_token_auth_login_post,
    ): CancelablePromise<Token> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Auth Google
     * (Placeholder) Authenticates or registers a user via a Google OAuth token.
     * @param requestBody
     * @returns Token Successful Response
     * @throws ApiError
     */
    public static authGoogleAuthGooglePost(
        requestBody: GoogleToken,
    ): CancelablePromise<Token> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/google',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
