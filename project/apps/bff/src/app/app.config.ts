export enum ApplicationServiceURL {
  Users = 'http://localhost:3030/api/auth',
  Blog = 'http://localhost:3010/api/posts'
}

export const HTTP_CLIENT = {
  MAX_REDIRECTS: 5,
  TIMEOUT: 5000,
}
