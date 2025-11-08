const apiUrl =
  "https://opbento.vercel.app/api/bento?n=Vinayak%20Gore&g=thevinayakgore&x=thevinayakgore&l=thevinayakgore&i=https%3A%2F%2Fthevinayakgore.vercel.app%2F_next%2Fimage%3Furl%3D%252Flogo.jpg%26w%3D1080%26q%3D75&p=https%3A%2F%2Fthevinayakgore.vercel.app%2F&z=dd7bc";
interface BentoResponse {
  url: string;
}

const fetchBentoUrl = async (apiUrl: string): Promise<string> => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: BentoResponse = (await response.json()) as BentoResponse;
    return data.url;
  } catch (error) {
    console.error("Error fetching Bento URL:", error);
    throw error;
  }
};

// @ts-ignore
fetchBentoUrl(apiUrl);
