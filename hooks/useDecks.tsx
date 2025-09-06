// hooks/useDecks.ts
import { useEffect, useState } from 'react';
import { Deck, DecksService } from '../api';

export const useDecks = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDecks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const userDecks = await DecksService.getDecksByUser();
        setDecks(userDecks);
      } catch (err) {
        setError('Failed to fetch decks.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDecks();
  }, []);

  return { decks, isLoading, error };
};
