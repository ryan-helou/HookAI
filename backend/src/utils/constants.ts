export const TONES = ['funny', 'dramatic', 'inspirational', 'urgent', 'casual', 'professional'] as const;

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  USER_NOT_FOUND: 'User not found',
  UNAUTHORIZED: 'Unauthorized',
  INVALID_TOKEN: 'Invalid or expired token',
  HOOK_LIMIT_EXCEEDED: 'Monthly hook limit exceeded. Please upgrade your plan.',
  CONVERSATION_NOT_FOUND: 'Conversation not found',
  INTERNAL_ERROR: 'An internal error occurred',
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  SIGNUP_SUCCESS: 'Account created successfully',
  HOOKS_GENERATED: 'Hooks generated successfully',
  SUBSCRIPTION_UPDATED: 'Subscription updated',
};
