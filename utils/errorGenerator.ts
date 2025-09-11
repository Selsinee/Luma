import { ApiError } from '../api';

// This is a type guard to check if an error is an ApiError
function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'body' in error &&
    'status' in error
  );
}

export default (error: unknown): string => {
  if (isApiError(error)) {
    // Access the 'detail' message from your FastAPI backend
    if (typeof error.body?.detail === 'string') {
      return error.body.detail;
    }
    return `Error ${error.status}: ${error.statusText}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred.';
};
