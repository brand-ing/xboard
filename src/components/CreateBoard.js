import { useState, useContext } from 'react';
import { BoardContext } from '../context/BoardContext';
import { useNavigate } from 'react-router-dom';

function CreateBoard() {
  const [boardName, setBoardName] = useState('');
  const [description, setDescription] = useState('');
  const { addBoard } = useContext(BoardContext);
  const navigate = useNavigate();

  const handleCreateBoard = async (e) => {
    e.preventDefault();

    if (!boardName.trim()) {
      console.error("Board name is required.");
      return;
    }

    try {
      const boardId = Date.now().toString(); // Generate unique ID for the board
      const boardData = {
        id: boardId,
        name: boardName.trim(),
        description: description.trim() || '',
      };

      await addBoard(boardData); // Add board to Firestore and context
      console.log(`Board ${boardData.name} created with ID ${boardData.id}`);

      // Reset the form fields
      setBoardName('');
      setDescription('');

      // Navigate to the home page
      navigate('/');
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Create New Board</h1>
      <form onSubmit={handleCreateBoard} className="mt-4">
        <input
          type="text"
          placeholder="Board Name"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          className="border rounded px-4 py-2 w-full"
        />
        <textarea
          placeholder="Board Description (Optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded px-4 py-2 w-full mt-2"
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Create Board
        </button>
      </form>
    </div>
  );
}

export default CreateBoard;
