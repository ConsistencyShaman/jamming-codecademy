import { Header } from './Header';
import { Footer } from './Footer';
import { Missing } from './Missing';

import { Welcome } from '../Login/WelcomePage';
import { Login } from '../Login/Login';

// React
import { useState, useEffect } from 'react';

// API
import { spotifyAuthCodeFlow, getAccessToken, fetchProfile } from '../../auth/script';

export function App() {
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({});

  // On app load, check if logged in
  useEffect(() => {
    // if code true, get token
    const checkCode = async (code) => {
      const token = await getAccessToken(code);
      currentToken.save(token);

      const url = new URL(window.location.href);
      url.searchParams.delete('code');

      const updatedUrl = url.search ? url.href : url.href.replace('?', '');
      window.history.replaceState({}, document.title, updatedUrl);
    }

    // if token true, fetch data; else redirect login page
    const checkToken = async () => {
      const userData = await fetchProfile(currentToken.access_token);
      setLogged(true);
      
      // update loading state and populate UI with profile data 
      // implementation goes here:
    }

    // Try catch to perform token exchange and data fetch
    try {
      const args = new URLSearchParams(window.location.search);
      const code = args.get('code');

      if (code) {
        checkCode(code);
      } else {
        console.log('cant get code');
      }

      if (!currentToken.access_token) {
        console.log('No token');
      } else {
        checkToken();
      }

    } catch (err) {
      console.log(err.message);
    }



  }, []);

  // Data structure
  const currentToken = {
    get access_token() { return localStorage.getItem('access_token') || null; },
    get refresh_token() { return localStorage.getItem('refresh_token') || null; },
    get expires_in() { return localStorage.getItem('refresh_in') || null; },
    get expires() { return localStorage.getItem('expires') || null; },

    save: function (response) {
      const { access_token, refresh_token, expires_in } = response;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('expires_in', expires_in);

      const now = new Date();
      const expiry = new Date(now.getTime() + (expires_in * 1000));
      localStorage.setItem('expires', expiry);
    }
  };

  // Login button on Welcome component
  const handleLogin = async () => {
    await spotifyAuthCodeFlow();
  }

  return (
    <div className='App'>
      <Header />
      <main>
        {!logged &&
          <Welcome handleLogin={handleLogin} />}

        {logged &&
          <Login loading={loading} />}

      </main>
      <Footer />
    </div>
  )
}
