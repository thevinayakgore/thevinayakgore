const apiUrl = "https://opbento.vercel.app/api/bento?n=Vinayak%20Gore&g=thevinayakgore&x=thevinayakgore&l=thevinayakgore&i=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F137513396%3Fv%3D4&p=https%3A%2F%2Fui.venumity.com&z=46b7a";
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
await fetchBentoUrl(apiUrl);