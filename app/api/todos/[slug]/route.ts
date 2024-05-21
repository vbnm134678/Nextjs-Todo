import { NextRequest, NextResponse } from "next/server";


// 할일 단일 조회
export async function GET(request: NextRequest,
	{ params }: { params: { slug: string } }) {

	const searchParams = request.nextUrl.searchParams;

	const search = searchParams.get('search');

	const response = {
		message: '단일 가져오기 성공',
		data: {
			id: params.slug,
			title: "todos 1",
			is_done: false,
			query: search,
		},
	};
	return NextResponse.json(response, { status: 203 });
}

// 할일 단일 삭제
export async function DELETE(request: NextRequest,
	{ params }: { params: { slug: string } }) {

	const response = {
		message: '단일 삭제 성공',
		data: {
			id: params.slug,
			title: "todos 1",
			is_done: false,
		},
	};
	return NextResponse.json(response, { status: 200 });
}

// 할일 단일 수정
export async function POST(request: NextRequest,
	{ params }: { params: { slug: string } }) {

	const { title, is_done } = await request.json()

	const editTodo = {
		id: params.slug,
		title,
		is_done
	};

	const response = {
		message: '단일 수정 성공',
		data: editTodo
	};

	return NextResponse.json(response, { status: 200 });
}