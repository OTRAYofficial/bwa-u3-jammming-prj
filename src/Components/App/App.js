import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Spotify from '../../util/Spotify.js';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchResults: [],
            playlistName:'New Playlist',
            playlistTracks:[]
        }
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlayList = this.savePlayList.bind(this);
        this.search = this.search.bind(this);
    };

    addTrack(track) {
        if(this.state.playlistTracks.findIndex(_track => _track.id === track.id) === -1) {
            let tracks = this.state.playlistTracks
            tracks.push(track)
            this.setState({playlistTracks: tracks})
        }
    }
    
    removeTrack(track) {
        const trackIndx = this.state.playlistTracks.findIndex(_track => _track.id === track.id);
        if(trackIndx > -1) {
            let tracks = this.state.playlistTracks
            tracks.splice(trackIndx, 1)
            this.setState({playlistTracks: tracks})
        }
    }

    updatePlaylistName(name) {
        this.setState({playlistName: name})
    }

    savePlayList() {
        const trackURIs = this.state.playlistTracks.map(track => track.uri);
        Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
            this.setState(
                {
                    playlistName: 'New Playlist',
                    playlistTracks: []
                })
        })
    }

    search(searchTerm) {
        Spotify.search(searchTerm).then(tracks => {
            this.setState({
                searchResults: tracks
            })
        });
    }

    render() {
    return (
        <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
                <SearchBar onSearch={this.search} />
                <div className="App-playlist">
                    <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
                    <Playlist playlistName={this.state.playlistName}
                              playlistTracks={this.state.playlistTracks}
                              onRemove={this.removeTrack}
                              onNameChange={this.updatePlaylistName}
                              onSave={this.savePlayList}

                    />

                </div>
            </div>
        </div>
    );
  }
}

export default App;