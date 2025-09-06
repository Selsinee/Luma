/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Deck } from '../models/Deck';
import type { DeckCreate } from '../models/DeckCreate';
import type { DeckDetail } from '../models/DeckDetail';
import type { DeckUpdate } from '../models/DeckUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DecksService {
    /**
     * Create Deck
     * Creates a new deck for the authenticated user.
     * @param requestBody
     * @returns Deck Successful Response
     * @throws ApiError
     */
    public static createDeckDecksPost(
        requestBody: DeckCreate,
    ): CancelablePromise<Deck> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/decks/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Decks For User
     * Gets a list of all decks created by the authenticated user.
     * Can be filtered by category.
     * @param category
     * @returns Deck Successful Response
     * @throws ApiError
     */
    public static readDecksForUserDecksGet(
        category?: (string | null),
    ): CancelablePromise<Array<Deck>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/decks/',
            query: {
                'category': category,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Deck
     * Gets the detailed information for a single deck, including its words and stats.
     * @param deckId
     * @returns DeckDetail Successful Response
     * @throws ApiError
     */
    public static readDeckDecksDeckIdGet(
        deckId: string,
    ): CancelablePromise<DeckDetail> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/decks/{deck_id}',
            path: {
                'deck_id': deckId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Deck
     * Updates a deck's information.
     * @param deckId
     * @param requestBody
     * @returns Deck Successful Response
     * @throws ApiError
     */
    public static updateDeckDecksDeckIdPut(
        deckId: string,
        requestBody: DeckUpdate,
    ): CancelablePromise<Deck> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/decks/{deck_id}',
            path: {
                'deck_id': deckId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Deck
     * Deletes a deck and all the words within it.
     * @param deckId
     * @returns Deck Successful Response
     * @throws ApiError
     */
    public static deleteDeckDecksDeckIdDelete(
        deckId: string,
    ): CancelablePromise<Deck> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/decks/{deck_id}',
            path: {
                'deck_id': deckId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
