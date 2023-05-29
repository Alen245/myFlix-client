import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  // Check if the movie prop is undefined
  if (!movie) {
    return null; // or render a placeholder/error message if desired
  }

  const { title, author, id, image } = movie;

  return (
    <Card>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title || "Unknown Title"}</Card.Title> {/* Use a fallback value if title is undefined */}

        <Link to={`/movies/${encodeURIComponent(id)}`}>
          <Button variant="link">Details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
  }),
};
