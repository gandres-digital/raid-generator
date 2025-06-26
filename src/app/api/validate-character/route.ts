import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { name } = await req.json();

        const response = await fetch(`http://armory.warmane.com/api/character/${encodeURIComponent(name)}/Onyxia/summary`);

        if (!response.ok) {
            return NextResponse.json({ exists: false });
        }

        const text = await response.text();
        const item = JSON.parse(text)

        if (item.level !== "70") {
            return NextResponse.json({ exists: false });
        }

        if (text.includes('"error":"Character does not exist."')) {
            return NextResponse.json({ exists: false });
        }

        return NextResponse.json({ exists: true });

    } catch {
        return NextResponse.json({ exists: false }, { status: 500 });
    }
}
