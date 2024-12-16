import { Nav } from '../App/Nav';
import { SearchBar } from '../SearchBar/SearchBar';

import { Playlist } from '../Playlist/Playlist';
import { Tracklist } from '../Tracklist/Tracklist';
import { SearchResults } from '../SearchResults/SearchResults';
import { Profile } from '../Profile/Profile';

import { Route, Routes, useHistory } from 'react-router-dom';

export function Login({ loading }) {

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <>
            <Nav />
            <SearchBar />
            <Routes>
                <Route path='/user/profile' element={<Profile
                    loading={loading} />
                } />
                <Route path='/user/playlist' element={<Playlist />} />
                <Route path='/user/search-results' element={<SearchResults />} />
                <Route path='/user/tracklist' element={<Tracklist />} />
            </Routes>
        </>
    )
}

