import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Categories,
  categoryState,
  customCategoriesState,
  toDoSelector,
} from "../atoms";
import ToDoInput from "./ToDoInput";
import ToDoList from "./ToDoList";
import { styled } from "styled-components";
import CategoryInput from "./CategoryInput";

const Container = styled.div`
  max-width: 480px;
  padding: 0px 20px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 600;
`;

function ToDo() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const customCategories = useRecoilValue(customCategoriesState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <Container>
      <Header>
        <Title>To Dos</Title>
      </Header>

      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
        {customCategories?.map((category, idx) => (
          <option key={idx} value={category}>
            {category}
          </option>
        ))}
      </select>

      <CategoryInput />

      <ToDoInput />

      {toDos?.map((toDo) => (
        <ToDoList key={toDo.id} {...toDo} />
      ))}
    </Container>
  );
}

export default ToDo;
