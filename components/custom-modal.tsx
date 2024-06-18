import { CustomModalType, Todo } from "@/types";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Switch } from "@nextui-org/react";
import { modal } from "@nextui-org/theme";
import { useState } from "react";
const CustomModal = ({ focusedTodo, modalType, onClose, onEdit, onDelete }: {
  focusedTodo: Todo,
  modalType: CustomModalType,
  onClose: () => void,
  onEdit: (id: string, title: string, isDone: boolean) => void,
  onDelete: (id: string) => void,
}) => {

  // Edit Modal is_done 체크
  const [isDone, setIsDone] = useState(focusedTodo.is_done);
  // Edit Modal input content 체크
  const [editedTodoInput, setEditedTodoInput] = useState<string>(focusedTodo.title);

  // Edit button Loading
  const [isLoading, setIsLoading] = useState(false);

  const DetailModal = () => {
    return (
      <>
        <ModalHeader className="flex flex-col gap-1">할일 상세</ModalHeader>
        <ModalBody>
          <p><span>id : {focusedTodo.id}</span></p>
          <p><span>할일 : {focusedTodo.title}</span></p>
          <div className="flex sapce-x-1">
            <span>완료여부 : </span>
            <p className="px-1">{focusedTodo.is_done ? " 완료" : " 미완료"}</p>
          </div>
          <div className="flex space-x-1">
            <span>작성일 :</span>
            <p>{`${focusedTodo.created_at}`}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="default" onPress={onClose}>
            닫기
          </Button>
        </ModalFooter>
      </>
    )
  }
  const EditModal = () => {
    return (
      <>
        <ModalHeader className="flex flex-col gap-1">할일 수정</ModalHeader>
        <ModalBody>
          <p><span className="font-bold">id : {focusedTodo.id}</span></p>
          <p>입력된 할일 : {editedTodoInput}</p>
          <Input
            isRequired
            autoFocus
            label="Todo"
            placeholder="할일을 입력해주세요"
            variant="bordered"
            defaultValue={focusedTodo.title}
            value={editedTodoInput}
            onValueChange={setEditedTodoInput}
          />
          <div className="flex py-2 sapce-x-2">
            <span className="font-bold">완료여부 : </span>
            <Switch
              className="px-2"
              defaultSelected={focusedTodo.is_done}
              aria-label="Automatic updates"
              color="warning"
              onValueChange={setIsDone}
            >
            </Switch>
            {isDone ? "완료" : "미완료"}
          </div>
          <div className="flex py-2 space-x-2">
            <span className="font-bold">작성일 : </span>
            <p>{`${focusedTodo.created_at}`}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="warning" variant="flat" onPress={() => {
            setIsLoading(true);
            onEdit(focusedTodo.id, editedTodoInput, isDone);
          }}>
            {isLoading ? <Spinner color="warning" size="sm" /> : "수정"}
          </Button>
          <Button color="default" onPress={onClose}>
            닫기
          </Button>
        </ModalFooter>
      </>
    )
  }
  const DeleteModal = () => {
    return (
      <>
        <ModalHeader className="flex flex-col gap-1">{modalType}</ModalHeader>
        <ModalBody>
          <p><span>id : {focusedTodo.id}</span></p>
          <p><span>할일 : {focusedTodo.title}</span></p>
          <div className="flex sapce-x-1">
            <span>완료여부 : </span>
            <p className="px-1">{focusedTodo.is_done ? " 완료" : " 미완료"}</p>
          </div>
          <div className="flex space-x-1">
            <span>작성일 :</span>
            <p>{`${focusedTodo.created_at}`}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={() => {
            setIsLoading(true);
            onDelete(focusedTodo.id);
          }}>
            {isLoading ? <Spinner color="danger" size="sm" /> : "삭제"}
          </Button>
          <Button color="default" onPress={onClose}>
            닫기
          </Button>
        </ModalFooter>
      </>
    )
  }
  const getModal = (type: CustomModalType) => {
    switch (type) {
      case 'detail':
        return DetailModal();
      case 'edit':
        return EditModal();
      case 'delete':
        return DeleteModal();
      default: break;
    }
  }

  return (
    <>
      {getModal(modalType)}
    </>
  )
}

export default CustomModal;