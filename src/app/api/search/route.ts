import { getSession } from '@/utils/auth';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const session = await getSession();

  if (!session || !session.user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');

  if (!query) {
    return new Response(JSON.stringify({ error: 'Missing q parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`,
      {
        signal: AbortSignal.timeout(5000),
        headers: {
          'User-Agent': 'tripa/0.1.0 (sean.cheong@outlook.jp)',
        },
      },
    );

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: 'Unable to reach Nominatim' }),
        {
          status: 504,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch location data from Nominatim' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
