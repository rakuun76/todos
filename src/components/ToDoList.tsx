import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, IToDo, customCategoriesState, toDoState } from "../atoms";

function ToDoList({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const customCategories = useRecoilValue(customCategoriesState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      {customCategories.map(
        (customCategorie) =>
          category !== customCategorie && (
            <button name={customCategorie} onClick={onClick}>
              {customCategorie}
            </button>
          )
      )}
    </li>
  );
}

export default ToDoList;
