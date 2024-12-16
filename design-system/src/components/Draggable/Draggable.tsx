import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable as Drgable,
} from "react-beautiful-dnd";
import dotsDrag from "../../assets/icons/dots-drag.svg";

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "grey",
  ...draggableStyle,
});

// const getListStyle = (isDraggingOver: boolean) => ({
//   background: isDraggingOver ? "lightblue" : "lightgrey",
//   padding: grid,
//   width: 250,
// });

type DragItem = {
  id: string;
  children: React.ReactNode;
};
interface IDraggableProps {
  items: DragItem[];
  className?: string;
  backgroundColor?: string;
  leftDrag?: boolean;
  handleDragEnd?: (items: DragItem[]) => void;
}

const Draggable: React.FC<IDraggableProps> = ({
  items,
  className,
  backgroundColor,
  leftDrag,
  handleDragEnd,
}) => {
  const [dragItems, setDragItems] = useState(items || []);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      dragItems,
      result.source.index,
      result.destination.index
    );

    setDragItems(reorderedItems);
    handleDragEnd && handleDragEnd(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`${className} ${
              snapshot.isDraggingOver && (backgroundColor || "bg-bg-quaternary")
            }`}
          >
            {dragItems.map((item, index) => (
              <Drgable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    className=""
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    // style={getItemStyle(
                    //   snapshot.isDragging,
                    //   provided.draggableProps.style
                    // )}
                  >
                    <div
                      className={`flex ${
                        leftDrag ? "justify-start" : "justify-end"
                      } pr-2 w-full`}
                    >
                      <img
                        {...provided.dragHandleProps}
                        className="cursor-move relative top-7 right-0"
                        draggable={false}
                        src={dotsDrag}
                        alt="drag"
                      />
                    </div>

                    {item.children}
                  </div>
                )}
              </Drgable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Draggable;
