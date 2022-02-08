import React from 'react';
import Feed from './Feed';
import PostInputContainer from './PostInputContainer';

function Home() {
    return (
        <div className="Home">
            <div className="AppContainer">
              <Feed/>
              <PostInputContainer/>
            </div>
        </div>
        
    );
}

export default Home;