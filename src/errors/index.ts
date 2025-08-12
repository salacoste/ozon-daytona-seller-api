/**
 * Error handling module exports
 */

// Base error classes
export { 
  OzonApiError,
  type IRpcStatus,
  type IRpcStatusDetail,
} from './OzonApiError';

// Specialized error classes
export { 
  RateLimitError,
  AuthError, 
  ValidationError,
  NetworkError,
} from './SpecializedErrors';

// Error factory and utilities
export { 
  ErrorFactory,
  ErrorUtils,
  type IErrorContext,
} from './ErrorFactory';