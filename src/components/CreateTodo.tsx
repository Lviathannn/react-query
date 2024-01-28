import { SubmitHandler, useForm } from "react-hook-form";
import { useCreatTodo } from "../services/mutation";
import { Todo } from "../types/todo";
import { useTodosId } from "../services/queries";

type Props = {};

export default function CreateTodo({}: Props) {
  const todosIdQuery = useTodosId();
  const createTodoMutation = useCreatTodo();

  const handleCreateTodo: SubmitHandler<Todo> = ({ title }) => {
    const data = {
      id: todosIdQuery.data?.length ? todosIdQuery.data.length + 1 : 1,
      title,
      completed: false,
    };
    createTodoMutation.mutate(data);
  };

  const { register, handleSubmit } = useForm<Todo>();
  return (
    <div>
      <form
        action=""
        className="mt-10 flex flex-col gap-2"
        onSubmit={handleSubmit(handleCreateTodo)}
      >
        <div className="flex flex-col">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            className="border-slate-500 border-2 rounded "
            {...register("title")}
          />
        </div>
        <button
          type="submit"
          className="px-2 py-1 text-white bg-slate-500 rounded"
          disabled={createTodoMutation.isPending}
          value={createTodoMutation.isPending ? "Loading..." : "Submit"}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
