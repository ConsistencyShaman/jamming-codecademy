import React, { useEffect, useState } from 'react';
import { getAccessToken, fetchProfile, populateUI } from '../../auth/script';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const getProfileData =  async () => {
        const access_token = await getAccessToken();

        if (!access_token) {
            throw new Error("Getting token went wrong...");
        }

        try {
            const profileData = await fetchProfile(access_token);
            setProfile(profileData);
            populateUI(profile);
        } catch (error) {
            console.log("Error fetching profile", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProfileData();
    }, []);

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <div>
            <section id="profile">
                <h2>Logged in as <span id="displayName"></span></h2>
                <img id="avatar" width="200" src="#" />
                <ul>
                    <li>User ID: <span id="id"></span></li>
                    <li>Email: <span id="email"></span></li>
                    <li>Spotify URI: <a id="uri" href="#"></a></li>
                    <li>Link: <a id="url" href="#"></a></li>
                    <li>Profile Image: <span id="imgUrl"></span></li>
                </ul>
            </section>
        </div>
    )
}

