const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirect_uri = "http://localhost:3000/user"
const scope = 'user-read-private user-read-email';

const base_url = "https://api.spotify.com/v1";

// PKCE security
function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

// Auth spotify account
export async function spotifyAuthCodeFlow() {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams({
        client_id: client_id,
        response_type: "code",
        redirect_uri: redirect_uri,
        scope: scope,
        code_challenge_method: "S256",
        code_challenge: challenge,
    });

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;

}

// Get access token
export async function getAccessToken(code) {
    const verifier = localStorage.getItem("verifier");

    // if (!verifier) {throw new Error("Verifier WRONG!")};
    const params = new URLSearchParams({
        client_id: client_id,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirect_uri,
        code_verifier: verifier,

    });

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
    });

    const access_token = await response.json();
    if (!access_token) { throw new Error("Access Token FALSE!") };
    
    return access_token;
}

// Profile
export async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });
    const profileData = await result.json();
    return profileData;
}





// Parse the code after authO
const params = new URLSearchParams(window.location.search);
const code = params.get("code");


// Populate UI, maybe show profile with loading smbol
export function populateUI(profile) {
    document.getElementById("displayName").innerText = profile.display_name;
    if (profile.images[0]) {
        const profileImage = new Image(200, 200);
        profileImage.src = profile.images[0].url;
        document.getElementById("avatar").appendChild(profileImage);
        document.getElementById("imgUrl").innerText = profile.images[0].url;
    }

    document.getElementById("id").innerText = profile.id;
    document.getElementById("email").innerText = profile.email;
    document.getElementById("uri").innerText = profile.uri;
    document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
    document.getElementById("url").innerText = profile.href;
    document.getElementById("url").setAttribute("href", profile.href);
}

// Redirect client to auth
export async function callback() {

    const accessToken = await getAccessToken(client_id, code);
    const profile = await fetchProfile(accessToken);
    return populateUI(profile);

}

// Refresh Token
export async function refreshToken() {
    const refreshToken = localStorage.getItem("refresh_token");
    const url = "https://accounts.spotify.com/api/token";

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: client_id
        }),
    }

    const body = await fetch(url, payload);
    const response = await body.json().payload;

    localStorage.setItem('access_token', response.accessToken);
    if (response.refreshToken) {
        localStorage.setItem('refresh_token', response.refreshToken);
    }
}