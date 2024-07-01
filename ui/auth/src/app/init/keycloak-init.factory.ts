import { KeycloakService } from "keycloak-angular";
import { environment } from "src/environments/environment.prod";

export function initializeKeycloak(
  keycloak: KeycloakService
  ) {
    return () =>
      keycloak.init({
        config: environment.keycloak
      });
}
