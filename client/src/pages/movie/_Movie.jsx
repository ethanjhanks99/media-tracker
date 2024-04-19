import { useState } from "react";
import { useParams } from "react-router";
import { useMovie } from "../../utils/use_movie";

export const Movie = () => {
  const { id } = useParams();
  const [movieData, loading] = useMovie(id);

  if (loading) {
    return null;
  };


  console.log(movieData);

  return (
    <>
      <h2>{movieData.title}</h2>
      <img src={"https://image.tmdb.org/t/p/original" + movieData.poster_path} alt="" />
    </>
  )
}