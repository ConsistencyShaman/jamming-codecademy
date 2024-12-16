
export function Welcome({ handleLogin }) {

    return (
        <div className='welcomePage'>
            <h1>Music Everywhere!</h1>
            <button onClick={() => handleLogin()}>Login with Spotify</button>
        </div>
    )
}