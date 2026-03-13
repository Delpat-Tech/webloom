import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const existing = request.cookies.get('csrf-token')?.value;

    if (existing) {
        return NextResponse.json({ csrfToken: existing });
    }

    const csrfToken = crypto.randomUUID().replace(/-/g, '') + crypto.randomUUID().replace(/-/g, '');
    const response = NextResponse.json({ csrfToken });
    response.cookies.set('csrf-token', csrfToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
    });

    return response;
}
