import React, { useEffect, useState } from "react";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { AppState } from "@excalidraw/excalidraw/types/types";
import Drawer from "./components/Drawer";
import ExcalidrawWrapper from "./components/ExcalidrawWrapper";
import { Drawing } from "./types";
import {
  loadDrawings,
  saveDrawings,
  createNewDrawing,
  updateDrawing,
  sortDrawingsByLastModified
} from "./storage";

const App: React.FC = () => {
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [activeDrawingId, setActiveDrawingId] = useState<string | null>(null);

  useEffect(() => {
    const loadedDrawings = loadDrawings();
    setDrawings(sortDrawingsByLastModified(loadedDrawings));
    
    if (loadedDrawings.length > 0) {
      setActiveDrawingId(loadedDrawings[0].id);
    }
  }, []);

  useEffect(() => {
    saveDrawings(drawings);
  }, [drawings]);

  const handleCreateNewDrawing = () => {
    const newDrawing = createNewDrawing();
    setDrawings(sortDrawingsByLastModified([newDrawing, ...drawings]));
    setActiveDrawingId(newDrawing.id);
  };

  const handleSelectDrawing = (id: string) => {
    setActiveDrawingId(id);
  };

  const handleRenameDrawing = (id: string, newTitle: string) => {
    const updatedDrawings = updateDrawing(drawings, id, { title: newTitle });
    setDrawings(sortDrawingsByLastModified(updatedDrawings));
  };

  const handleDrawingChange = (elements: readonly ExcalidrawElement[], appState: AppState) => {
    if (!activeDrawingId) return;
    
    // Create a clean copy of appState without non-serializable properties
    const cleanAppState = { ...appState };
    
    // Ensure collaborators is an empty array for storage
    cleanAppState.collaborators = [];
    
    const updatedDrawings = updateDrawing(drawings, activeDrawingId, {
      elements: [...elements],
      appState: cleanAppState
    });
    
    setDrawings(updatedDrawings);
  };

  const activeDrawing = activeDrawingId
    ? drawings.find(d => d.id === activeDrawingId) || null
    : null;

  return (
    <div className="app-container">
      <Drawer
        drawings={drawings}
        activeDrawingId={activeDrawingId}
        onSelectDrawing={handleSelectDrawing}
        onCreateNewDrawing={handleCreateNewDrawing}
        onRenameDrawing={handleRenameDrawing}
      />
      <ExcalidrawWrapper
        drawing={activeDrawing}
        onDrawingChange={handleDrawingChange}
      />
    </div>
  );
};

export default App;