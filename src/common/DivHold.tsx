import { useRef } from "react";
import { CommonProps } from "../@types/utils";
import { twMerge } from "tailwind-merge";

type ElementType = Partial<Omit<HTMLElement, "children">>;

export const DivHold = ({ children, className }: ElementType & CommonProps) => {
  let isDragging = false;
  let startX;
  let scrollLeft;

  const speed = 0.9;
  const div = useRef();
  let listCursorActual = [];

  type ModeCursor = "grab" | "grabbing";

  const modifyStyle = (mode: ModeCursor) => {
    div.current.style.cursor = mode;
    [...div.current.children]?.forEach((child, index) => {
      child.style.cursor = mode === "grab" ? listCursorActual[index] : mode;
    });
  };

  const modeGrab = () => {
    isDragging = false;
    modifyStyle("grab");
  };

  const modeGrabbing = () => {
    isDragging = true;
    listCursorActual = [...div.current.children]?.map(
      (child) => child.style.cursor
    );
    modifyStyle("grabbing");
  };

  const calculatePositionInDiv = (pointInPage: number) =>
    pointInPage - div.current.offsetLeft;

  return (
    <div
      div
      className={twMerge("cursor-grab overflow-hidden", className)}
      ref={div}
      onMouseDown={(e) => {
        modeGrabbing();
        startX = calculatePositionInDiv(e.pageX);
        scrollLeft = div.current.scrollLeft;
      }}
      onMouseMove={(e) => {
        if (!isDragging) return;
        e.preventDefault();

        const x = calculatePositionInDiv(e.pageX);
        const diff = x - startX;
        const walk = diff * speed;

        div.current.scrollLeft = scrollLeft - walk;
      }}
      onMouseUp={modeGrab}
      onMouseLeave={modeGrab}
    >
      {children}
    </div>
  );
};
