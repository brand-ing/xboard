import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BoardContext } from '../context/BoardContext';

function HomePage() {
  const { boards } = useContext(BoardContext);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Tweet Curation Board</h1>
      <Link to="/new-board">
        <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
          + Create a Board
        </button>
      </Link>
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Your Boards</h2>
        <ul>
          {boards.length > 0 ? (
            boards.map((board) => (
              <li key={board.id} className="mt-2">
                <Link
                  to={`/board/${board.id}`}
                  className="text-blue-500 underline"
                >
                  {board.name || 'board not found'}
                </Link>
              </li>
            ))
          ) : (
            <p>No boards yet. Create one to get started!</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
