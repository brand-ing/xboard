import React, { useState } from "react";
import './EditableField.css';

const EditableField = ({ value, label, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleSave = () => {
    if (tempValue.trim()) {
      onSave(tempValue);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTempValue(value); // Revert to the original value
    setIsEditing(false);
  };

  return (
    <div className="editable-field mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {isEditing ? (
        <div>
          {label === "Description" ? (
            <textarea
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="border rounded px-4 py-2 w-full mb-2"
            />
          ) : (
            <input
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="border rounded px-4 py-2 w-full mb-2"
            />
          )}
          <div>
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
        </div>
      ) : (
        <div>
          <p className="text-lg">{value}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded mt-2"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default EditableField;
