import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    realm: 'your-realm',
    url: 'http://localhost:8080/auth',
    clientId: 'your-client-id',
});

export default keycloak;