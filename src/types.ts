import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { AppState } from "@excalidraw/excalidraw/types/types";

export interface Drawing {
  id: string;
  title: string;
  elements: ExcalidrawElement[];
  appState: AppState;
  created: number;
  lastModified: number;
}