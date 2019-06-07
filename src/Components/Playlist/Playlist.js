import React from 'react';
import './Playlist.css'
import TrackList from '../TrackList/TrackList'

class Playlist extends React.Component {
    constructor(props) {
        super(props)
        this.handleNamechange = this.handleNamechange.bind(this)
    }

    handleNamechange(event) {
        this.props.onNameChange(event.target.value)
    }


    render(event){
        return (
            <div className="Playlist">
                <input defaultValue={'New Playlist'} onChange={this.handleNamechange} />
                <TrackList tracks={this.props.playlistTracks}
                           isRemoval={true}
                           onRemove={this.props.onRemove} />
                <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
            </div>
        )
    }
}

export default Playlist;