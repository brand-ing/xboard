import React from "react";

const AddTweet = ({ handleAddTweet, tweetURL, setTweetURL }) => {
  return (
    <div>
      {/* Add Tweet Form */}
      <form onSubmit={handleAddTweet} className="mt-4">
        <input
          type="text"
          placeholder="Tweet URL"
          value={tweetURL}
          onChange={(e) => setTweetURL(e.target.value)}
          className="border rounded px-4 py-2 w-full"
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Tweet
        </button>
      </form>
    </div>
  );
};

export default AddTweet;
