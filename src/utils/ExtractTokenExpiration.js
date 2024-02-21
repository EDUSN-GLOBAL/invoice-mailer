import { useJwt } from 'react-jwt';





export async function ExtractTokenExpiration(token) {
    const { decodedToken } = useJwt(token);


    if (decodedToken && decodedToken.exp) {
    
        const expirationInSeconds = Math.floor(decodedToken.exp / 1000);

        const currentTimestampInSeconds = Math.floor(Date.now() / 1000);

 
        if (currentTimestampInSeconds < expirationInSeconds) {
            console.log('Token is still valid');
        } else {
            console.log('Token has expired');
        }
    } else {
        console.error('Invalid or missing expiration time in the decoded token');
    }
}
