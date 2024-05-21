import { NextRequest, NextResponse } from "next/server";
import dataTodos from "@/data/dummy.json"

// 모든 할일 가져오기
export async function GET(request: NextRequest) {

	const response = {
		message: 'todos 몽땅 가져오기',
		data: dataTodos,
	};
	return NextResponse.json(response, { status: 202 });
}

// 할일 추가 api
export async function POST(request: NextRequest) {

	const { title } = await request.json()

	const newTodo = {
		id: "10",
		title: title,
		is_done: false
	};

	const response = {
		message: '할일 추가 성공',
		data: newTodo,
	};

	return Response.json(response, { status: 201 });
}