import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  
  const response = {
    message: 'test',
    data: 'testing',
  }
  return NextResponse.json(response, {status: 201});
}