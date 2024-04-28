import { getToken, getProducts } from '@/lib/api/kroger';

// Opt out of caching for all data requests in the route segment
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get('term') || '';

  try {
    const access_token = await getToken();
    console.log(access_token)
    const products = await getProducts(term, access_token);
    return new Response(JSON.stringify(products), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } 
  catch (error) {
    return new Response(JSON.stringify({error}), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

