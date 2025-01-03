import React, { useState } from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";

const TweetList = () => {
    const [tweets, setTweets] = useState([]);
    const [input, setInput] = useState("");

    const handleAddTweet = () => {
        const tweetId = extractTweetId(input);
        if (tweetId) {
            setTweets([...tweets, { id: tweetId, type: "id" }]);
        } else {
            setTweets([...tweets, { embedCode: input, type: "embed" }]);
        }
        setInput(""); // Clear input field
    };

    const extractTweetId = (url) => {
        const regex = /twitter\.com\/(?:\w+)\/status\/(\d+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Paste Tweet link or embed code"
                />
                <button onClick={handleAddTweet}>Add Tweet</button>
            </div>
            <div>
                {tweets.map((tweet, index) =>
                    tweet.type === "id" ? (
                        <TwitterTweetEmbed key={index} tweetId={tweet.id} />
                    ) : (
                        <div
                            key={index}
                            dangerouslySetInnerHTML={{ __html: tweet.embedCode }}
                        ></div>
                    )
                )}
            </div>
        </div>
    );
};

export default TweetList;
