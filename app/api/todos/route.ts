import { NextRequest, NextResponse } from "next/server";
import { fetchTodos, addTodos } from "@/data/firestore"
// 모든 할일 가져오기
export async function GET(request: NextRequest) {

	const fetchedTodos = await fetchTodos();
	console.log(fetchTodos);

	const response = {
		message: 'todos 몽땅 가져오기',
		data: fetchedTodos,
	};
	return NextResponse.json(response, { status: 202 });
}

// 할일 추가 api
export async function POST(request: NextRequest) {

	const { title } = await request.json();
	const addedTodo = await addTodos({ title });

	const response = {
		message: '할일 추가 성공',
		data: addedTodo,
	};

	return Response.json(response, { status: 201 });
}