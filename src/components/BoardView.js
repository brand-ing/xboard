import React from "react";
import { Rnd } from "react-rnd";
import TweetCard from "./TweetCard";

const BoardView = ({ tweets, onUpdatePositions }) => {
  const handleDragStop = (tweetId, position) => {
    const updatedTweets = tweets.map((tweet) =>
      tweet.id === tweetId ? { ...tweet, position } : tweet
    );
    onUpdatePositions(updatedTweets);
  };

  return (
    <div
      className="board-view"
      style={{
        position: "relative",
        width: "100%",
        height: "800px", // Expandable height
        border: "1px solid #ddd",
        backgroundColor: "#f9f9f9",
      }}
    >
      {tweets.map((tweet) => (
        <Rnd
          key={tweet.id}
          default={{
            x: tweet.position?.x || 0,
            y: tweet.position?.y || 0,
            width: 200,
            height: "auto",
          }}
          bounds="parent"
          onDragStop={(e, data) =>
            handleDragStop(tweet.id, { x: data.x, y: data.y })
          }
        >
          <TweetCard tweetId={tweet.tweetId} />
        </Rnd>
      ))}
    </div>
  );
};

export default BoardView;
