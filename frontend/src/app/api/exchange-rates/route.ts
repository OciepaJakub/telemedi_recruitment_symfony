import { NextRequest } from "next/server";

export const fetchCache = 'force-no-store'

export async function GET(req: NextRequest) {
    const baseUrl = process.env.API_URL;
    const apiKey = process.env.API_KEY;
    const startDate = req.nextUrl.searchParams.get('start_date') || '';
    const queryParams = startDate ? `?start_date=${encodeURIComponent(startDate)}` : '';

    if (!baseUrl) {
        throw new Error("API base URL is not defined in environment variables");
    }

    if (!apiKey) {
        throw new Error("API KEY is not defined in environment variables");
    }
    

    const response = await fetch(`${baseUrl}/v1/exchange-rates${queryParams}`, {
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': apiKey,
        },
        next: {
            revalidate: 0
        },
        cache: 'no-cache'
    })

    const data = await response.json()
    
    return Response.json({ data })
}