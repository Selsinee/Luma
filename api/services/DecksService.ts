/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Deck } from '../models/Deck';
import type { DeckAlmostMastered } from '../models/DeckAlmostMastered';
import type { DeckCreate } from '../models/DeckCreate';
import type { DeckDetail } from '../models/DeckDetail';
import type { DeckListResponse } from '../models/DeckListResponse';
import type { DeckNeedsReview } from '../models/DeckNeedsReview';
import type { DeckRecentItem } from '../models/DeckRecentItem';
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
    public static createDeck(
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
     * Gets a list of all decks created by the authenticated user, including progress stats.
     * Can be filtered by category and a search query.
     * @param category
     * @param query
     * @returns DeckListResponse Successful Response
     * @throws ApiError
     */
    public static getDecksByUser(
        category?: (string | null),
        query?: (string | null),
    ): CancelablePromise<DeckListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/decks/',
            query: {
                'category': category,
                'query': query,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Decks Needing Review
     * Gets a list of decks that the user has not studied recently.
     * @returns DeckNeedsReview Successful Response
     * @throws ApiError
     */
    public static getDecksNeedingReview(): CancelablePromise<Array<DeckNeedsReview>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/decks/needs-review',
        });
    }
    /**
     * Read Recently Studied Decks Endpoint
     * Gets a list of the most recently studied decks for the authenticated user.
     * @returns DeckRecentItem Successful Response
     * @throws ApiError
     */
    public static getRecentlyStudiedDecks(): CancelablePromise<Array<DeckRecentItem>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/decks/recent',
        });
    }
    /**
     * Read Deck
     * Gets the detailed information for a single deck, including its words
     * with user-specific progress and calculated stats.
     * @param deckId
     * @returns DeckDetail Successful Response
     * @throws ApiError
     */
    public static getDeckById(
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
    public static updateDeck(
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
    public static deleteDeck(
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
    /**
     * Read Almost Mastered Decks Endpoint
     * Gets a list of decks that the user has almost mastered (75-99% progress).
     * @returns DeckAlmostMastered Successful Response
     * @throws ApiError
     */
    public static getAlmostMasteredDecks(): CancelablePromise<Array<DeckAlmostMastered>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/decks/almost-mastered',
        });
    }
}
