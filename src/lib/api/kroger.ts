// KROGER API FUNCTIONS USED IN /api/products



// GETS ACCESS TOKEN TO MAKE REQUESTS TO KROGER API
export const getToken = async () => {
    const CLIENT_INFO=process.env.KROGER_CLIENT_INFO
    try {
      const res = await fetch(`https://api.kroger.com/v1/connect/oauth2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${CLIENT_INFO}`,
        },
        body: 'grant_type=client_credentials&scope=product.compact',
      });
      const data = await res.json();
      console.log('Token Response:', data); // Add this line
      if (!data.access_token) {
        console.error('Failed to retrieve access token:', data);
        return null;
      }
      console.log("Access Token:", data.access_token);
      return data.access_token;
    } 
    catch (err) {
      console.error('Error fetching access token:', err);
      throw err;
    }
  }


  export const getProducts = async (term: string, access_token: string) => {
    try {
        const response = await fetch(`https://api.kroger.com/v1/products?filter.locationId=01400722&filter.term=${encodeURIComponent(term)}`,
        {
            headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${access_token}`,
            },
        }
        );
        const data = await response.json();

        // return data; for data and meta
        // Just Data
        return data.data;
    } 
    catch (err) {
        console.error(err);
        throw new Error('Failed to fetch list of products.');
    }
};


  export const getProductDetails = async (productId: string, access_token: string) => {
    try {
         
        const response = await fetch(`https://api.kroger.com/v1/products/${productId}?filter.locationId=01400722`, {
            headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${access_token}`,
            },
        });
        const data = await response.json();
        return data.data;
    } 
    catch (err) {
        console.error(err);
        throw new Error('Failed to fetch list of product details.');
    }
  };