import { useTodos, useTodosId } from "../services/queries";
import Todo from "./Todo";
type Props = {};

export default function TodoList({}: Props) {
  const todosIdQuery = useTodosId();
  const todoQueries = useTodos(todosIdQuery.data ?? []);
  // const isFetching = useIsFetching();

  //   if (todosIdQuery.isLoading) {
  //     return <div>Loading...</div>;
  //   }
  //   if (todosIdQuery.isError) {
  //     return <div>Error</div>;
  //   }

  return (
    <div>
      {/* <h1> Function status :{todosIdQuery.fetchStatus}</h1>
      <h1>Global isFetching : {isFetching} </h1>
      <h1> Data status :{todosIdQuery.status}</h1> */}
      {/* <ul>
        {todosIdQuery.data?.map((id) => (
          <li key={id}>id :{id}</li>
        ))}
      </ul> */}
      {todoQueries?.map(({ data }) => {
        return (
          <Todo
            key={data?.id}
            id={data?.id || Date.now()}
            title={data?.title || ""}
            completed={data?.completed || false}
          />
        );
      })}
    </div>
  );
}
