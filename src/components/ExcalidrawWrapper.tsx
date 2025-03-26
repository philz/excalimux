import React, { useEffect, useState } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { AppState } from "@excalidraw/excalidraw/types/types";
import { Drawing } from "../types";

interface ExcalidrawWrapperProps {
  drawing: Drawing | null;
  onDrawingChange: (elements: readonly ExcalidrawElement[], appState: AppState) => void;
}

const ExcalidrawWrapper: React.FC<ExcalidrawWrapperProps> = ({
  drawing,
  onDrawingChange
}) => {
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);

  useEffect(() => {
    if (excalidrawAPI && drawing) {
      // Ensure appState has collaborators as an empty array
      const appState = {
        ...drawing.appState,
        collaborators: []
      };
      
      excalidrawAPI.updateScene({
        elements: drawing.elements || [],
        appState
      });
    }
  }, [drawing, excalidrawAPI]);

  if (!drawing) {
    return (
      <div className="excalidraw-wrapper">
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          height: "100%",
          color: "#666",
          fontSize: "1.2rem"
        }}>
          Select a drawing from the drawer or create a new one
        </div>
      </div>
    );
  }

  // Ensure appState has collaborators as an empty array for initialData
  const initialAppState = {
    ...drawing.appState,
    collaborators: []
  };

  return (
    <div className="excalidraw-wrapper">
      <div className="excalidraw-container">
        <Excalidraw
          initialData={{
            elements: drawing.elements || [],
            appState: initialAppState
          }}
          onChange={(elements, appState) => {
            // Ensure we don't store the collaborators object which might not be serializable
            const cleanAppState = { ...appState };
            cleanAppState.collaborators = [];
            onDrawingChange(elements, cleanAppState);
          }}
          onCollabButtonClick={() => {}}
          ref={(api) => setExcalidrawAPI(api)}
        />
      </div>
    </div>
  );
};

export default ExcalidrawWrapper;