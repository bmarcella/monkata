/**
 * Here you can add the configuration related to keycloak
 * So we can use this common config for diffrent environment
 */

const keycloakConfig  = {
  url: 'http://localhost:7878',
  realm: 'Monkata',
  clientId: 'jobs-app-fe',
};
export default keycloakConfig;
