const apiUrl = "https://opbento.edgexhq.tech/api/bento?n=Vinayak%20Gore&g=TheVinayakGore&x=thevinayakgore&l=thevinayakgore&i=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F137513396%3Fv%3D4&p=thevinayakgore.vercel.app&z=58fc3";
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
