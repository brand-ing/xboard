import { useParams } from "react-router-dom";
import { useContext } from "react";
import { BoardContext } from "../context/BoardContext";
import BoardOptions from "../components/BoardOptions";
import TweetList from "../components/TweetList";
import EditableField from "../components/EditableField";
import ViewToggle from "../components/ViewToggle";
import BoardView from "../components/BoardView";
import AddTweet from "../components/AddTweet";


function BoardPage() {
  const { id } = useParams();
  const { boards, viewMode, toggleViewMode,updateBoard, addTweetToBoard, removeTweetFromBoard, tweetURL, setTweetURL } = useContext(BoardContext);

  const board = boards.find((b) => b.id.toString() === id.toString());

  const handleAddTweet = async (e) => {
    e.preventDefault();

    const extractTweetId = (url) => {
      const regex = /x\.com\/(?:\w+)\/status\/(\d+)/;
      const match = url.match(regex);
      return match ? match[1] : null;
    };

    const tweetId = extractTweetId(tweetURL.trim());
    if (tweetId) {
      await addTweetToBoard(board.id, { id: Date.now().toString(), tweetId });
      setTweetURL("");
    } else {
      console.error("Invalid Tweet URL. Unable to extract Tweet ID.");
    }
  };

  const handleSave = async (field, value) => {
    if (!board) return;

    try {
      const updatedData = {
        ...board,
        [field]: value.trim(),
      };

      await updateBoard(board.id, updatedData);
      console.log(`Updated ${field}: ${value}`);
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };


  const handleReorderTweets = (updatedTweets) => {
    const updatedBoard = { ...board, tweets: updatedTweets };
    updateBoard(board.id, updatedBoard); // Persist changes to Firestore
  };
  
  const handleUpdatePositions = (updatedTweets) => {
    const updatedBoard = { ...board, tweets: updatedTweets };
    updateBoard(board.id, updatedBoard); // Persist to Firestore
  };
  
  
  return (
    <div className="p-8">
      <EditableField
        value={board?.name || "Untitled Board"}
        onSave={(newValue) => handleSave("name", newValue)}
      />
      <EditableField
        value={board?.description || "No description provided."}
        onSave={(newValue) => handleSave("description", newValue)}
      />

      <BoardOptions boardId={id} />

      {/* View Toggle */}
      <ViewToggle viewMode={viewMode} onToggle={toggleViewMode} />

            {/* Add Tweet */}
            <AddTweet
        handleAddTweet={handleAddTweet}
        tweetURL={tweetURL}
        setTweetURL={setTweetURL}
      />

    {viewMode === "list" ? (
      <TweetList
        tweets={board?.tweets || []}
        onReorder={handleReorderTweets}
        onRemoveTweet={(tweetId) => removeTweetFromBoard(board.id, tweetId)}
      />
    ) : (
      <BoardView
        tweets={board?.tweets || []}
        onUpdatePositions={handleUpdatePositions}
      />
    )}
    </div>
  )
}

export default BoardPage;
