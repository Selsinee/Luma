// hooks/useCategories.ts
import { CategoriesService } from '../api';
import { useApiQuery } from './useApiQuery';

/**
 * @hook useCategories
 *
 * Fetches the list of all available deck categories from the API.
 */
export const useCategories = () => {
  return useApiQuery(['categories'], () => CategoriesService.getCategories(), {
    staleTime: Infinity, // This data rarely changes, so cache it forever
  });
};
