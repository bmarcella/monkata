
export interface JwtPayload {
  "exp": number,
  "iat": number,
  "auth_time": number,
  "jti": string,
  "iss": string,
  "aud": string,
  "sub": string,
  "typ": string,
  "azp": string,
  "nonce": string,
  "session_state": string,
  "acr": "1",
  "allowed-origins": [],
  "realm_access": {
    "roles": []
  },
  "resource_access": {
    "account": {
      "roles": []
    }
  },
  "scope": string,
  "sid": string,
  "email_verified": boolean,
  "name": string,
  "preferred_username": string,
  "given_name": string,
  "family_name": string,
  "email": string
}

export const protect = (jwt: any, p: string, role?: string) => {
  return (req: any, res: any, next: any) => {
    try {
      const token = req?.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).send('Access Denied: No token provided.');
      }
      // const publicKey = `-----BEGIN PUBLIC KEY-----\n${process.env.KEYCLOAK_PUBLIC_KEY}\n-----END PUBLIC KEY-----`;
      req.token = token;
      // req.payload = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
      req.payload = getPayload(jwt, token, process.env.KEYCLOAK_PUBLIC_KEY + "");
      // Optional: Check if the token payload includes the required role
      if (role && (!req.payload.roles || !req.payload.roles.includes(role))) {
        return res.status(403).send('Access Denied: Insufficient permissions.');
      }
      next();
    } catch (err: any) {
      console.log(err);
      // Handle specific JWT errors
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).send('Access Denied: Token has expired.');
      } else if (err instanceof jwt.JsonWebTokenError) {
        return res.status(401).send('Access Denied: Invalid token.');
      } else {
        // Handle other possible errors (e.g., from your code or other libraries)
        return res.status(401).send(`Access Denied: ${err.message}`);
      }
    }
  };
};

export const getPayload = (jwt: any, token: string, PK: string): JwtPayload => {
  const publicKey = `-----BEGIN PUBLIC KEY-----\n${PK}\n-----END PUBLIC KEY-----`;
  return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
}
