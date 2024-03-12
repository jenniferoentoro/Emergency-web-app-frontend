import jwt_decode from "jwt-decode";

const userData = {
    accessToken: undefined as string | undefined,
    claims: undefined as Record<string, any> | undefined,
}

const TokenManager = {
    getAccessToken: () => userData.accessToken,
    getClaims: () => {
        if (!userData.claims) {
            return undefined;
        }
        return userData.claims;
    },
    setAccessToken: (token: string | undefined) => {
        if (!token) {
            userData.accessToken = undefined;
            userData.claims = undefined;
            return undefined; 
        }

        userData.accessToken = token;
        const claims: Record<string, any> = jwt_decode(token);
        userData.claims = claims;
        return claims; 
    },
    clear: () => {
        userData.accessToken = undefined;
        userData.claims = undefined;
    }
}

export default TokenManager;
