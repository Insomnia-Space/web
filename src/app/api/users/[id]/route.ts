// import { NextRequest, NextResponse } from 'next/server';

// interface RouteParams {
//   params: {
//     id: string;
//   };
// }

// // Use context.params as a Promise<{ id: string }> to match Next.js types
// export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
//   try {
//     const { id } = await context.params;

//     // Simulate DB fetch
//     const user = {
//       id,
//       name: 'John Doe',
//       email: 'john@example.com',
//       role: 'user',
//       createdAt: '2024-01-01T00:00:00.000Z',
//       updatedAt: '2024-01-01T00:00:00.000Z',
//     };

//     if (!user) {
//       return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
//     }

//     return NextResponse.json({ success: true, data: { user } });
//   } catch (_err) {
//     // TODO: send to monitoring service
//     return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
//   }
// }

// export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
//   try {
//     const { id } = await context.params;
//     const body = await request.json();

//     // Simulate update
//     const updatedUser = {
//       id,
//       ...body,
//       updatedAt: new Date().toISOString(),
//     };

//     return NextResponse.json({
//       success: true,
//       data: { user: updatedUser },
//       message: 'User updated successfully',
//     });
//   } catch (_err) {
//     // TODO: send to monitoring service
//     return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
//   }
// }

// export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
//   try {
//     const { id } = await context.params;

//     // Simulate delete
//     return NextResponse.json({
//       success: true,
//       message: `User with id ${id} deleted successfully`,
//     });
//   } catch (_err) {
//     // TODO: send to monitoring service
//     return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
//   }
// }