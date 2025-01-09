import { createContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, setDoc, onSnapshot, doc, updateDoc, query, where, getDocs, deleteDoc } from 'firebase/firestore';

export const BoardContext = createContext(); 

export function BoardProvider({ children }) {
  const [boards, setBoards] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [tweetURL, setTweetURL] = useState("");

  // sync from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'boards'), (snapshot) => {
      const boardsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBoards(boardsData);
    });
    return () => unsubscribe();  // Cleanup on unmount
  }, []);

  const addBoard = async (board) => {
    try {
      const boardRef = doc(db, 'boards', board.id); // Use custom ID
      await setDoc(boardRef, { ...board, tweets: [] }); // Use setDoc with predefined ID
      console.log("Board added successfully with ID:", board.id);
    } catch (error) {
      console.error("Error adding board:", error);
    }
  };
  

  const delBoard = async (boardId) => {
    try {
      const boardRef = doc(db, 'boards', boardId); // Use boardId directly
      await deleteDoc(boardRef);
      console.log(`Board with ID ${boardId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting board:", error);
    }
  };
  
  const updateBoard = async (boardId, updatedData) => {
    try {
      const boardRef = doc(db, 'boards', boardId); // Reference to the document
      await updateDoc(boardRef, updatedData); // Update Firestore document with new data
      console.log(`Board with ID ${boardId} updated successfully.`);
    } catch (error) {
      console.error("Error updating board:", error);
    }
  };
  
  

  const addTweetToBoard = async (boardId, tweet) => {
    try {
      // Check if the board exists in the local state
      const currentBoard = boards.find((b) => b.id.toString() === boardId.toString());
  
      if (!currentBoard) {
        console.error("Board not found in state:", boardId);  // Debugging line
        return;
      }
  
      // Query Firestore to find the correct document ID
      const q = query(collection(db, "boards"), where("id", "==", boardId));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        console.error("No matching board in Firestore.");
        return;
      }
  
      // Use the Firestore document ID
      const docSnapshot = querySnapshot.docs[0];
      const boardRef = doc(db, "boards", docSnapshot.id);
  
      // Update the Firestore document
      await updateDoc(boardRef, {
        tweets: [...currentBoard.tweets, tweet],
      });
  
      console.log("Tweet added successfully!"); // Success debug
    } catch (error) {
      console.error("Error adding tweet:", error);
    }
  };

  const removeTweetFromBoard = async (boardId, tweetId) => {
    try {
      // Check if the board exists in the local state
      const currentBoard = boards.find((b) => b.id.toString() === boardId.toString());
  
      if (!currentBoard) {
        console.error("Board not found in state:", boardId);  // Debugging line
        return;
      }
  
      // Query Firestore to find the correct document ID
      const q = query(collection(db, "boards"), where("id", "==", boardId));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        console.error("No matching board in Firestore.");
        return;
      }
  
      // Use the Firestore document ID
      const docSnapshot = querySnapshot.docs[0];
      const boardRef = doc(db, "boards", docSnapshot.id);
  
      // Filter out the tweet to remove
      const updatedTweets = currentBoard.tweets.filter((tweet) => tweet.id !== tweetId);
  
      // Update the Firestore document
      await updateDoc(boardRef, {
        tweets: updatedTweets,
      });
  
      // console.log("Tweet removed successfully!");  // Success debug
    } catch (error) {
      console.error("Error removing tweet:", error);
    }
  };
  
  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "list" ? "board" : "list"));
  };

  return (
  <BoardContext.Provider 
    value={{ 
      boards,
      viewMode,
      toggleViewMode,
      addBoard,
      delBoard,
      addTweetToBoard,
      removeTweetFromBoard,
      updateBoard,
      tweetURL,
      setTweetURL, 
  }}>
    {children}
  </BoardContext.Provider>

  );
}
