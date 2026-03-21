import { createContext, useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import YouTube from "react-youtube";

const MovieContext = createContext();

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const MovieProvider = ({ children }) => {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleVideoTrailer = async (movie) => {
    const tmdbId = movie?.tmdb?.id || movie?.id;
    if (!tmdbId) {
      setTrailerUrl("");
      setIsOpen(false);
      alert("Không tìm thấy trailer cho phim này.");
      return;
    }

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    };

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${movie?.tmdb?.type || "movie"}/${tmdbId}/videos?language=en-US`,
        options
      );

      const data = await response.json();
      const key = data?.results?.[0]?.key;
      if (key) {
        setTrailerUrl(key);
        setIsOpen(true);
      } else {
        alert("Không tìm thấy trailer cho phim này.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MovieContext.Provider value={{ handleVideoTrailer }}>
      {children}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          overlay: {
            position: "fixed",
            zIndex: 9999,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
        contentLabel="Example Modal"
      >
        {trailerUrl && (
          <div className="flex items-center justify-center mt-5">
            <YouTube videoId={trailerUrl} opts={opts} />
          </div>
        )}
      </Modal>
    </MovieContext.Provider>
  );
};

MovieProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MovieProvider, MovieContext };