import React from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";

const TweetCard = React.memo(({ tweetId }) => {
  return (
    <div className="tweet-card">
      <TwitterTweetEmbed tweetId={tweetId} />
    </div>
  );
});

export default TweetCard;
