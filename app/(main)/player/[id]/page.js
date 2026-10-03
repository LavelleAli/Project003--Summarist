import React from "react";
import PlayerTitle from "@/components/playerSections/PlayerTitle";

const PlayerPage = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
    { next: { revalidate: 3600 } },
  );
  const book = await res.json();


  return (
    <>
      <PlayerTitle book={book} />
    </>
  );
};

export default PlayerPage;
