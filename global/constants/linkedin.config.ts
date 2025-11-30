export const LinkedinConfig = {
  issuer: 'https://www.linkedin.com',
  clientId: '86g8vfy2lmip57',
  redirectUrl: 'myapp://linkedin-callback',
  scopes: ['openid', 'profile', 'email', 'w_member_social'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://www.linkedin.com/oauth/v2/authorization',
    tokenEndpoint: 'https://www.linkedin.com/oauth/v2/accessToken',
  },
  usePKCE: true, 
  skipCodeExchange: true 
};