import React from "react";
import { Drawing } from "../types";

interface DrawerProps {
  drawings: Drawing[];
  activeDrawingId: string | null;
  onSelectDrawing: (id: string) => void;
  onCreateNewDrawing: () => void;
  onRenameDrawing: (id: string, newTitle: string) => void;
}

const Drawer: React.FC<DrawerProps> = ({
  drawings,
  activeDrawingId,
  onSelectDrawing,
  onCreateNewDrawing,
  onRenameDrawing
}) => {
  const handleRename = (id: string) => {
    const drawing = drawings.find(d => d.id === id);
    if (!drawing) return;
    
    const newTitle = prompt("Enter new title:", drawing.title);
    if (newTitle !== null && newTitle.trim() !== "") {
      onRenameDrawing(id, newTitle.trim());
    }
  };

  return (
    <div className="drawer">
      <div className="drawer-header">
        <h1 className="drawer-title">Excalimux</h1>
        <button className="new-drawing-btn" onClick={onCreateNewDrawing}>
          New Drawing
        </button>
      </div>
      <div className="drawing-list">
        {drawings.length === 0 ? (
          <div style={{ padding: "16px", textAlign: "center", color: "#666" }}>
            No drawings yet. Create one to get started!
          </div>
        ) : (
          drawings.map(drawing => (
            <div
              key={drawing.id}
              className={`drawing-item ${drawing.id === activeDrawingId ? "active" : ""}`}
              onClick={() => onSelectDrawing(drawing.id)}
              onDoubleClick={() => handleRename(drawing.id)}
            >
              <div className="drawing-item-title">{drawing.title}</div>
              <div className="drawing-item-date">
                {new Date(drawing.lastModified).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Drawer;