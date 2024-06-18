// src/keycloak.ts
import Keycloak from 'keycloak-js';

// Keycloak configuration
const keycloakConfig = {
  url: 'https://<KEYCLOAK_URL>/auth',
  realm: '<REALM_NAME>',
  clientId: '<CLIENT_ID>',
};

const keycloak = new Keycloak(keycloakConfig);

export const initKeycloak = (onAuthenticatedCallback: () => void) => {
  keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
    if (authenticated) {
      onAuthenticatedCallback();
    } else {
      keycloak.login();
    }
  });
};

export default keycloak;
