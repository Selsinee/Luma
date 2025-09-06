// hooks/useCreateDeck.ts
import { useState } from 'react';
import { Deck, DeckCreate, DecksService } from '../api';

export const useCreateDeck = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createDeck = async (deckData: DeckCreate): Promise<Deck | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const newDeck = await DecksService.createDeck(deckData);
      return newDeck;
    } catch (err) {
      setError('Failed to create deck.');
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { createDeck, isLoading, error };
};
