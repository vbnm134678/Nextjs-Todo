import { title } from "@/components/primitives";
import TodosTable from "@/components/todos-table";
import { fetchTodos } from "@/data/firestore";

async function fetchTodosApi() {

  console.log("fetch todos api called");

  const res = await fetch(`${process.env.BASE_URL}/api/todos/`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json()
}
// 2:16:47
export default async function TodosPage() {

  const response = await fetchTodosApi();

  return (
    <div className="flex flex-col space-y-8">
      <h1 className={title()}>Todos</h1>
      <TodosTable todos={response.data ?? []} />
    </div>
  );
}
