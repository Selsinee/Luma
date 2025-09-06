/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Word } from '../models/Word';
import type { WordCreate } from '../models/WordCreate';
import type { WordUpdate } from '../models/WordUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WordsService {
    /**
     * Create Word For Deck
     * Adds a new word to a specific deck.
     * Ensures the current user owns the deck.
     * @param deckId
     * @param requestBody
     * @returns Word Successful Response
     * @throws ApiError
     */
    public static createWordForDeckDecksDeckIdWordsPost(
        deckId: string,
        requestBody: WordCreate,
    ): CancelablePromise<Word> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/decks/{deck_id}/words/',
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
     * Update Word
     * Updates a word's information.
     * Ensures the current user owns the deck containing the word.
     * @param deckId
     * @param wordId
     * @param requestBody
     * @returns Word Successful Response
     * @throws ApiError
     */
    public static updateWordDecksDeckIdWordsWordIdPut(
        deckId: string,
        wordId: string,
        requestBody: WordUpdate,
    ): CancelablePromise<Word> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/decks/{deck_id}/words/{word_id}',
            path: {
                'deck_id': deckId,
                'word_id': wordId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Word
     * Deletes a word from a deck.
     * Ensures the current user owns the deck containing the word.
     * @param deckId
     * @param wordId
     * @returns Word Successful Response
     * @throws ApiError
     */
    public static deleteWordDecksDeckIdWordsWordIdDelete(
        deckId: string,
        wordId: string,
    ): CancelablePromise<Word> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/decks/{deck_id}/words/{word_id}',
            path: {
                'deck_id': deckId,
                'word_id': wordId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
