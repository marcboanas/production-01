import { ENV } from './../core/env.config';

interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
  NAMESPACE: string;
};

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: 'eQ4hy2ZXpb70hVFFt24kMbE5AiAfA2y7',
  CLIENT_DOMAIN: 'mjboanas.eu.auth0.com',
  AUDIENCE: 'https://fast-island-98961.herokuapp.com/api',
  REDIRECT: `${ENV.BASE_URI}/callback`,
  SCOPE: 'openid profile',
  NAMESPACE: 'https://fast-island-98961.herokuapp.com/roles'
};