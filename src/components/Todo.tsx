import { useRef } from "react";
import { SubmitHandler } from "react-hook-form";
import { Todo } from "../types/todo";
import { useDeleteTodo, useUpdateTodo } from "../services/mutation";

type Props = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Todo({ id, title, completed }: Props) {
  const checked = useRef<HTMLInputElement>(null);
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const handleUpdateTodo: SubmitHandler<Todo> = (data) => {
    if (checked.current) {
      updateTodoMutation.mutate({
        ...data,
        completed: checked.current.checked,
      });
    }
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodoMutation.mutateAsync(id);
    console.log("deleted");
  };

  return (
    <div className="flex gap-5 mt-2">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => handleUpdateTodo({ id, title, completed })}
        ref={checked}
      />
      <h1>
        {id}. title :{title}
      </h1>
      <button
        className="bg-red-500 text-white px-2 rounded hover:bg-red-700"
        onClick={() => {
          handleDeleteTodo(id);
        }}
      >
        Delete
      </button>
    </div>
  );
}
