import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TweetCard from "./TweetCard";

const TweetList = ({ tweets, onReorder, onRemoveTweet }) => {
  const handleDragEnd = (result) => {
    const { source, destination } = result;

    // Do nothing if dropped outside the list
    if (!destination) return;

    // Reorder the list
    const reorderedTweets = Array.from(tweets);
    const [movedTweet] = reorderedTweets.splice(source.index, 1);
    reorderedTweets.splice(destination.index, 0, movedTweet);

    onReorder(reorderedTweets);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tweetList">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {tweets.map((tweet, index) => (
              <Draggable key={tweet.id} draggableId={tweet.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="tweet-item flex items-center mb-4"
                  >
                    <TweetCard tweetId={tweet.tweetId} />
                    <button
                      onClick={() => onRemoveTweet(tweet.id)}
                      className="ml-4 px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TweetList;
