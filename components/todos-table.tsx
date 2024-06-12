"use client"

import React, { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, PopoverTrigger, PopoverContent, Popover, Spinner, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Todo } from "@/types";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VerticalDotsIcon } from "./icons"

const TodosTable = ({ todos }: { todos: Todo[] }) => {
  // 할일 추가 가능 여부
  const [todoAddEnable, setTodoAddEnable] = useState(false);
  // 할일
  const [newTodoInput, setNewTodoInput] = useState("");

  // 로딩 상태
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  // toast
  const notifyEvent = (msg: string) => toast.success(msg);

  const router = useRouter();

  // 할일 추가하기
  const addATodoHandler = async (title: string) => {
    setIsLoading(true);

    await new Promise(f => setTimeout(f, 1000));
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
      method: 'post',
      body: JSON.stringify({
        title: title,
      }),
      cache: 'no-store',
    });
    setNewTodoInput('');
    router.refresh();
    setIsLoading(false);
    setTodoAddEnable(false);
    notifyEvent(title + " 추가 완료!");
    // console.log('할일 추가 완료 : ${newTodoInput}');
  }

  // 할일 list row
  const TodoRow = (aTodo: Todo) => {
    return <TableRow key={aTodo.id}>
      <TableCell>{aTodo.id.slice(0, 5)}</TableCell>
      <TableCell>{aTodo.title}</TableCell>
      <TableCell>{aTodo.is_done ? "완료" : "미완료"}</TableCell>
      <TableCell>{`${aTodo.created_at}`}</TableCell>
      <TableCell>          <div className="relative flex justify-end items-center gap-2">
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly size="sm" variant="light">
              <VerticalDotsIcon className="text-default-300" width={undefined} height={undefined} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem>상세보기</DropdownItem>
            <DropdownItem>수정</DropdownItem>
            <DropdownItem>삭제</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div></TableCell>
    </TableRow>
  }
  // 할일 추가버튼 popover
  const disableTodoAddButton = () => {
    return <Popover placement="top" showArrow={true}>
      <PopoverTrigger>
        <Button disabled className="h-14" color="default">할일 추가</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">할일을 입력해주세요</div>
        </div>
      </PopoverContent>
    </Popover>
  }

  return (
    <div className="flex flex-col space-y-2">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input className="h-14" type="text" label="새로운 할일"
          value={newTodoInput}
          onValueChange={(changedInput) => {
            setNewTodoInput(changedInput);
            setTodoAddEnable(changedInput.length > 0)
          }} />
        {todoAddEnable
          ? <Button className="h-14" color="warning" onPress={async () => {
            await addATodoHandler(newTodoInput);
          }}>추가</Button>
          : disableTodoAddButton()

        }
      </div>
      <div className="h-3">
        {isLoading && <Spinner color="warning" size="sm" />}
      </div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>할일</TableColumn>
          <TableColumn>완료여부</TableColumn>
          <TableColumn>생성일</TableColumn>
          <TableColumn>액션</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No data to show"}>
          {todos && todos.map((aTodo: Todo) => (
            TodoRow(aTodo)
          ))}
        </TableBody>
      </Table>
    </div>

  );
}

export default TodosTable;