import React from "react";
import { notFound } from "next/navigation";
import PlayerTitle from "@/components/playerSections/PlayerTitle";
import PlayerAccessGate from "@/components/playerSections/PlayerAccessGate";
import { getBook } from "@/lib/books";

const PlayerPage = async ({ params }) => {
  const { id } = await params;
  const book = await getBook(id);
  if (!book) notFound();


  return (
    <>
      <PlayerAccessGate subscriptionRequired={book.subscriptionRequired}>
        <PlayerTitle book={book} />
      </PlayerAccessGate>
    </>
  );
};

export default PlayerPage;
