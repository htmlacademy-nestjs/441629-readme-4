export const VALIDATION_USER = {
  MIN_PASS_LENGHT: 6,
  MAX_PASS_LENGTH: 12,
}

export const AUTH_USER = {
  CREATED: 'The new user has been successfully created.',
  EMAIL_NOT_VALID: 'The email is not valid',
  EXISTS: 'User with this email exists',
  GET: 'User found.',
  LOGGED: 'User has been successfully logged.',
  NOT_FOUND: 'User not fount',
  PASSWORD_WRONG: 'User password is wrong',
  PASSWODR_OR_LOGIN_WRONG: 'Password or Login is wrong.',
  PASSWORD_LENGTH_WRONG: `Password must be >= ${VALIDATION_USER.MIN_PASS_LENGHT} and <= ${VALIDATION_USER.MAX_PASS_LENGTH}`,
}
