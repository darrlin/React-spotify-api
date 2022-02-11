import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

const Search = (props) => {
    const [searchKey, setSearchKey] = useState(''); 
    const [tracks, setTracks] = useState([]); 
    const [searchQuery, setSearchQuery] = useState('');
    const [playingTrack, setPlayingTrack] = useState();

    const searchTracks = async (search) => { 
        if (search === '') {
            setTracks([]); 
            return;
        }
        const {data} = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
             Authorization: `Bearer ${props.token}` 
        },
        params: { 
            q: search, 
            type: 'track' 
        }
        });
        setTracks(data.tracks.items);
    }

    const renderTracks = () => {
      return tracks.map(track => ( 
          <div 
          className='track-container' key={track.uri}> 
              {track.album.images ? <img src={track.album.images[0].url} alt=''/> : <div>No Image</div>}
              <p>{track.name}</p>
              <p id='artist'>{track.artists[0].name}</p>
          </div> 
      ));
    }

    return (
        <div>
            {props.token 
            ? 
            <div>
                <input
                className='search-input'
                type='text' 
                onChange={e => searchTracks(e.target.value)}
                placeholder='Поиск...'
                />
                {renderTracks()}
            </div>
            : <h2>Please login</h2> 
            }
        </div>
    );
};

export default Search;