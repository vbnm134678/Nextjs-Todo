"use client"

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Todo } from "@/types"

const TodosTable = ({ todos }: { todos: Todo[] }) => {
  const TodoRow = (aTodo: Todo) => {
    return <TableRow key={aTodo.id}>
      <TableCell>{aTodo.id.slice(0, 5)}</TableCell>
      <TableCell>{aTodo.title}</TableCell>
      <TableCell>{aTodo.is_done ? "완료" : "미완료"}</TableCell>
      <TableCell>{`${aTodo.created_at}`}</TableCell>
    </TableRow>
  }
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>할일</TableColumn>
        <TableColumn>완료여부</TableColumn>
        <TableColumn>생성일</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No data to show"}>
        {todos && todos.map((aTodo: Todo) => (
          TodoRow(aTodo)
        ))}
      </TableBody>
    </Table>
  );
}

export default TodosTable;