import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Music from "./components/Music";
import Video from "./components/Video";
import Movie from "./components/Movie";
import Itunes from "./Images/itunes-note-brands.svg";

class App extends Component {
  // states to hold the data and the name and type
  state = {
    favourites: [],
    posts: [],
    name: "",
    type: "",
    activeTab: 2
  };

  // onClick get the data from the api
  getData = () => {
    axios.get(`/search/${this.state.name}/${this.state.type}`).then(data =>
      this.setState({
        posts: data.data.results
      })
    );
  };

  //set the favourites
  favourites = item => {
    const favourites = this.state.favourites;
    favourites.push(item);
    this.setState({
      favourites: favourites
    });
    console.log(this.state);
  };
  // DELETE ITEMS
  delete = item => {
    const favourites = this.state.favourites;
    const newFavourites = favourites.filter(fav => fav !== item);
    this.setState({
      favourites: newFavourites
    });
  };
  render() {
    return (
      <div>
        {/* header */}
        <div style={{ textAlign: "center" }}>
          <h1>Itunes</h1>
          <img src={Itunes} alt="...." style={{ width: "30px" }} />
          <div>
            <nav>
              <a href="#favourites">
                <h1>Favourites</h1>
              </a>
            </nav>
          </div>
        </div>
        {/* user input name */}
        <div
          className="row"
          style={{ marginTop: "30px", marginRight: "50px", float: "right" }}
        >
          <div style={{ marginRight: "50px" }}>
            <input
              type="text"
              name="name"
              placeholder="Enter search Name"
              onChange={e => this.setState({ name: e.target.value })}
              className="form-control"
            />
          </div>
          <div style={{ marginRight: "20px" }}>
            {/* get the type */}
            <select
              class="form-control"
              onChange={e => this.setState({ type: e.target.value })}
            >
              <option>CHOOSE</option>
              <option value="song">Song</option>
              <option value="movie">Movie</option>
              <option value="musicVideo">Music Video</option>
            </select>
          </div>
          <div>
            {/* onclick serach item from the api */}
            <button
              onClick={this.getData}
              type="button"
              className="btn btn-dark"
            >
              <span className="glyphicon glyphicon-search"></span> Search
            </button>
          </div>
        </div>

        {/* user api serach data */}
        <div className="row" style={{ marginTop: "125px", width: "100%" }}>
          {this.state.posts.map(post => (
            <>
              <>
                {/* show the song component if the type is equal to the type */}
                {this.state.type === "song" ? (
                  <Music post={post} favourites={this.favourites} />
                ) : null}
              </>
              <>
                {/* show the movie component if the type is equal to the type */}
                {this.state.type === "movie" ? (
                  <Movie post={post} favourites={this.favourites} />
                ) : null}
              </>
              <>
                {/* show the music video component if the type is equal to the type */}
                {this.state.type === "musicVideo" ? (
                  <Video post={post} favourites={this.favourites} />
                ) : null}
              </>
            </>
          ))}
        </div>
        {/* Favourites */}
        <div id="favourites">
          <div className="favourites text-center">
            <h1>Favourites</h1>
          </div>
          <div class="row">
            <div class="col-xs-12 ">
              <nav>
                <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                  <a
                    class="nav-item nav-link active"
                    id="nav-home-tab"
                    data-toggle="tab"
                    href="#nav-home"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    Music
                  </a>
                  <a
                    class="nav-item nav-link"
                    id="nav-profile-tab"
                    data-toggle="tab"
                    href="#nav-profile"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    Movies
                  </a>
                  <a
                    class="nav-item nav-link"
                    id="nav-contact-tab"
                    data-toggle="tab"
                    href="#nav-contact"
                    role="tab"
                    aria-controls="nav-contact"
                    aria-selected="false"
                  >
                    Music Videos
                  </a>
                </div>
              </nav>

              <div
                className="tab-content py-3 px-3 px-sm-0"
                id="nav-tabContent"
              >
                <div
                  className="tab-pane fade show active"
                  id="nav-home"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  <div className="row">
                    {this.state.favourites.map(fav => (
                      <>
                        {fav.kind === "song" ? (
                          <div
                            className="card"
                            style={{ width: "32rem", margin: "30px" }}
                          >
                            <img
                              src={fav.artworkUrl100}
                              className="card-img-top"
                              alt="..."
                            />
                            <div className="card-body">
                              <h5 className="card-title">
                                {fav.trackCensoredName}
                              </h5>
                              <p className="card-text">
                                <span style={{ fontWeight: "bold" }}>
                                  Artist
                                </span>
                                : {fav.artistName}{" "}
                                <span style={{ fontWeight: "bold" }}>
                                  Album
                                </span>
                                : {fav.collectionName}
                              </p>
                              <audio controls>
                                <source
                                  src={fav.previewUrl}
                                  type="audio/mpeg"
                                ></source>
                              </audio>
                            </div>
                            <button
                              type="button"
                              className="btn btn-warning"
                              onClick={() => this.delete(fav)}
                            >
                              <span className="glyphicon glyphicon-trash"></span>
                              Add to favourites
                            </button>
                          </div>
                        ) : null}
                      </>
                    ))}
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                >
                  <div className="row">
                    {this.state.favourites.map(fav => (
                      <>
                        {fav.kind === "feature-movie" ? (
                          <div
                            className="card"
                            style={{ width: "33rem", margin: "30px" }}
                          >
                            <img
                              src={fav.artworkUrl100}
                              className="card-img-top"
                              style={{ height: "300px" }}
                              alt="..."
                            />
                            <div className="card-body">
                              <h5 className="card-title">
                                {fav.trackCensoredName}
                              </h5>
                              <p className="card-text">
                                <span style={{ fontWeight: "bold" }}>
                                  Director
                                </span>
                                : {fav.artistName}
                              </p>
                              <video
                                controls
                                style={{ width: "31rem", height: "20rem" }}
                              >
                                <source
                                  src={fav.previewUrl}
                                  type="video/mp4"
                                ></source>
                              </video>
                            </div>
                            <button
                              onClick={() => this.delete(fav)}
                              type="button"
                              className="btn btn-warning"
                            >
                              <span className="glyphicon glyphicon-trash"></span>
                              Remove
                            </button>
                          </div>
                        ) : null}
                      </>
                    ))}
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-contact"
                  role="tabpanel"
                  aria-labelledby="nav-contact-tab"
                >
                  <div className="row">
                    {this.state.favourites.map(fav => (
                      <>
                        {fav.kind === "music-video" ? (
                          <div
                            className="card"
                            style={{ width: "33rem", margin: "30px" }}
                          >
                            <img
                              src={fav.artworkUrl100}
                              className="card-img-top"
                              style={{ height: "300px" }}
                              alt="..."
                            />
                            <div className="card-body">
                              <h5 className="card-title">
                                {fav.trackCensoredName}
                              </h5>
                              <p className="card-text">
                                <span style={{ fontWeight: "bold" }}>
                                  Director
                                </span>
                                : {fav.artistName}
                              </p>
                              <video
                                controls
                                style={{ width: "31rem", height: "20rem" }}
                              >
                                <source
                                  src={fav.previewUrl}
                                  type="video/mp4"
                                ></source>
                              </video>
                            </div>
                            <button
                              onClick={() => this.delete(fav)}
                              type="button"
                              className="btn btn-warning"
                            >
                              <span className="glyphicon glyphicon-trash"></span>
                              Remove
                            </button>
                          </div>
                        ) : null}
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
