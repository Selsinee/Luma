import { ApiError } from '@/api';

export default (error: any) => {
  const apiError = error as ApiError;
  return apiError.body?.detail;
};
