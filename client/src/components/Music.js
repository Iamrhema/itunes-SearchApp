import React, { Component } from "react";

class Music extends Component {
  render() {
    return (
      <div class="card" style={{ width: "32rem", margin: "30px" }}>
        <img src={this.props.post.artworkUrl100} class="card-img-top"  alt="..." />
        <div class="card-body">
          <h5 class="card-title">{this.props.post.trackCensoredName}</h5>
          <p class="card-text">
            <span style={{ fontWeight: "bold" }}>Artist</span>:{" "}
            {this.props.post.artistName} <span style={{ fontWeight: "bold" }}>Album</span>:{" "}
            {this.props.post.collectionName}
          </p>
          <audio controls>
            <source src={this.props.post.previewUrl} type="audio/mpeg"></source>
          </audio>
        </div>
        <button type="button" className="btn btn-warning" onClick = {()=>this.props.favourites(this.props.post)}><span className = "glyphicon glyphicon-star"></span>Add to favourites</button>
      </div>
    );
  }
}

export default Music;
