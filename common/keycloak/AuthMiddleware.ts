
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

export const protect = (jwt: any, p: any, role?: string) => {
  return (req: any, res: any, next: any) => {
    try {
      const token = req?.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).send('Access Denied: No token provided.');
      }
      req.token = token;
      
      req.payload = getPayload(jwt, token, process.env.PUBLIC_KEY + "");
   
      if (role && (!req.payload.roles || !req.payload.roles.includes(role))) {
        return res.status(403).send('Access Denied: Insufficient permissions.');
      }
      next();
    } catch (err: any) {
      console.log(err);
      // Handle specific JWT errors
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(403).send('Access Denied: Token has expired.');
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
   return jwt.verify(token, PK);
}



export const GenToken = (jwt: any, payload: any, PK: string, ex: string): string => {
  return jwt.sign(payload, PK, {  expiresIn: ex });
}


export const VerifyRefreshToken = (jwt: any, token: string, PK: string) => {
  try {
    if (!token) {
      return { error: true, message : 'Access Denied: No token provided.'}
    }
    const payload = getPayload(jwt, token,PK+"");
    return { error: false , data : payload };
  } catch (err: any) {
    console.log(err);
    if (err instanceof jwt.TokenExpiredError) {
      return { error: true, message : 'Access Denied: Token has expired.'};
    } else if (err instanceof jwt.JsonWebTokenError) {
      return { error: true, message : 'Access Denied: Invalid token.'};
    } else {
      return { error: true, message : `Access Denied: ${err.message}`};
    }
  }

}

