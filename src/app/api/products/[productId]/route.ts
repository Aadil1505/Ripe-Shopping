import { getToken, getProductDetails } from '@/lib/api/kroger';

// Opt out of caching for all data requests in the route segment
export const dynamic = 'force-dynamic'

export async function GET(request: Request, { params }: { params: { productId: string }}) {
  const productId = params.productId;
  console.log("Got this productId from search: " + productId)

  try {
    const access_token = await getToken();
    console.log(access_token)
    const product = await getProductDetails(productId, access_token);
    return new Response(JSON.stringify(product), {
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




