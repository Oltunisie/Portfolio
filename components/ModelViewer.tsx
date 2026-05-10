"use client";

import { useEffect } from "react";
import type { ModelViewerElement } from "@google/model-viewer";

// Register the custom element type so JSX accepts <model-viewer>
type ModelViewerJSX = Omit<Partial<ModelViewerElement>, "style"> & {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace React.JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerJSX;
    }
  }
}

export default function ModelViewer({ src, alt }: { src: string; alt: string }) {
  useEffect(() => {
    import("@google/model-viewer");
  }, []);

  return (
    <model-viewer
      src={src}
      alt={alt}
      camera-controls
      auto-rotate
      shadow-intensity={1}
      exposure={0.9}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    />
  );
}
