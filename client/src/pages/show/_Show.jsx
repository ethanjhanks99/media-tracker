import { useState } from "react";
import { useParams } from "react-router";
import { useShow } from "../../utils/use_show";

export const Show = () => {
  const { id } = useParams();
  const [showData, loading] = useShow(id);

  if (loading) return null;

  return (
    <>
      <h3>{showData.name}</h3>
    </>
  )

}