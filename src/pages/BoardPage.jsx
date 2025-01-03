import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { BoardContext } from "../context/BoardContext";
import BoardOptions from "../components/BoardOptions";
import { TwitterTweetEmbed } from "react-twitter-embed";
import TweetList from "../components/TweetList";

function BoardPage() {
  const { id } = useParams();
  const { boards, addTweetToBoard, removeTweetFromBoard, updateBoard } = useContext(BoardContext);
  const [tweetURL, setTweetURL] = useState("");

  const board = boards.find((b) => b.id.toString() === id.toString());

  const [editingField, setEditingField] = useState(null); // 'name' or 'description'
  const [tempValue, setTempValue] = useState("");

  const handleSave = async () => {
    if (!editingField || !tempValue.trim()) return;

    try {
      const updatedData = {
        ...board,
        [editingField]: tempValue.trim(),
      };

      await updateBoard(board.id, updatedData);
      console.log("Board updated successfully");
      setEditingField(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating board:", error);
    }
  };

  const handleCancel = () => {
    setEditingField(null); // Exit edit mode
  };

  const handleEdit = (field) => {
    setEditingField(field);
    setTempValue(board[field]); // Populate with current value
  };

  const extractTweetId = (url) => {
    const regex = /x\.com\/(?:\w+)\/status\/(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleAddTweet = async (e) => {
    e.preventDefault();

    if (!board) {
      console.error("Board is undefined or missing ID.");
      return;
    }

    const tweetId = extractTweetId(tweetURL.trim());
    if (tweetId) {
      await addTweetToBoard(board.id.toString(), {
        id: Date.now().toString(),
        tweetId, // Save the Tweet ID instead of the full URL
      });
      setTweetURL("");
    } else {
      console.error("Invalid Tweet URL. Unable to extract Tweet ID.");
    }
  };

  const handleRemoveTweet = async (tweetId) => {
    if (!board) {
      console.error("Board is undefined or missing ID.");
      return;
    }

    if (tweetId) {
      try {
        await removeTweetFromBoard(board.id.toString(), tweetId);
        console.log("Tweet removed successfully!");
      } catch (error) {
        console.error("Error removing tweet:", error);
      }
    }
  };

  return (
    <div className="p-8">
      {/* Editable Name */}
      <h1 className="text-2xl font-bold">
        {editingField === "name" ? (
          <div>
            <input
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="border rounded px-4 py-2 w-full mb-2"
            />
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          board?.name || "Board Not Found"
        )}
      </h1>

      {/* Editable Description */}
      <h3 className="text-1x2">
        {editingField === "description" ? (
          <div>
            <textarea
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="border rounded px-4 py-2 w-full mb-2"
            />
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          board?.description || "Write a description here."
        )}
      </h3>

      {/* Board Options */}
      <BoardOptions
        boardId={id}
        handleEdit={handleEdit}
      />
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

      {/* Saved Tweets */}
      <div className="mt-8">
        <h2 className="text-xl font-bold">Saved Tweets</h2>
        {board?.tweets?.length > 0 ? (
          <ul>
            {board.tweets.map((tweet) => (
              <li key={tweet.id} className="mt-4">
                {/* Render Tweet Embed */}
                <TwitterTweetEmbed tweetId={tweet.tweetId} />

                {/* Remove Tweet Button */}
                <button
                  onClick={() => handleRemoveTweet(tweet.id)}
                  className="mt-2 px-2 py-1 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tweets yet. Add some to get started!</p>
        )}
      </div>
    </div>
  );
}

export default BoardPage;
