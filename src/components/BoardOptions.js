import { useContext } from "react";
import { BoardContext } from "../context/BoardContext";
import { useNavigate } from "react-router-dom";

function BoardOptions({ boardId, handleEdit }) {
  const { delBoard } = useContext(BoardContext);
  const navigate = useNavigate();

  const handleDeleteBoard = async () => {
    try {
      await delBoard(boardId);
      console.log(`Board with ID ${boardId} deleted.`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting board:", error);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={() => handleEdit("name")}
        className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
      >
        Edit Name
      </button>
      <button
        onClick={() => handleEdit("description")}
        className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
      >
        Edit Description
      </button>
      <button
        onClick={handleDeleteBoard}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Delete Board
      </button>
    </div>
  );
}

export default BoardOptions;
