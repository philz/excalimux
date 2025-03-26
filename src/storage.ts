import { Drawing } from "./types";

const STORAGE_KEY = "excalimux-drawings";

export const saveDrawings = (drawings: Drawing[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(drawings));
};

export const loadDrawings = (): Drawing[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  
  try {
    const drawings = JSON.parse(data);
    
    // Ensure each drawing has the correct appState structure
    return drawings.map((drawing: Drawing) => {
      if (!drawing.appState) {
        drawing.appState = {};
      }
      
      // Ensure collaborators is an empty array
      drawing.appState.collaborators = [];
      
      // Ensure zoom is set
      if (!drawing.appState.zoom) {
        drawing.appState.zoom = { value: 1 };
      }
      
      return drawing;
    });
  } catch (error) {
    console.error("Failed to parse drawings from localStorage:", error);
    return [];
  }
};

export const createNewDrawing = (): Drawing => {
  return {
    id: Date.now().toString(),
    title: `Drawing ${new Date().toLocaleString()}`,
    elements: [],
    appState: {
      viewBackgroundColor: "#ffffff",
      currentItemFontFamily: 1,
      gridSize: null,
      collaborators: new Map(),
      zoom: {
        value: 1
      }
    },
    created: Date.now(),
    lastModified: Date.now()
  };
};

export const updateDrawing = (
  drawings: Drawing[],
  id: string,
  updates: Partial<Drawing>
): Drawing[] => {
  return drawings.map(drawing => 
    drawing.id === id 
      ? { ...drawing, ...updates, lastModified: Date.now() } 
      : drawing
  );
};

export const deleteDrawing = (drawings: Drawing[], id: string): Drawing[] => {
  return drawings.filter(drawing => drawing.id !== id);
};

export const sortDrawingsByLastModified = (drawings: Drawing[]): Drawing[] => {
  return [...drawings].sort((a, b) => b.lastModified - a.lastModified);
};