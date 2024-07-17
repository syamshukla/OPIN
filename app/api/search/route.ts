import { NextResponse } from "next/server";

export async function GET(req: Request) {
  console.log("API route hit");

  try {
    // Correctly parse the URL from the request
    const url = new URL(req.url, 'http://localhost');
    const q = url.searchParams.get("q");

    console.log("Query parameter:", q);

    if (!q) {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 }
      );
    }

    const googleSearchUrl = `https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_API_KEY}&cx=${process.env.SEARCH_ENGINE_ID}&q=${q}`;

    console.log("Fetching from URL:", googleSearchUrl);

    const response = await fetch(googleSearchUrl);
    console.log("Fetch response status:", response.status);

    if (!response.ok) {
      const responseBody = await response.text();
      console.error("Response Body:", responseBody);
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (!data.items) {
      return NextResponse.json({ error: "No items found" }, { status: 404 });
    }

    const results = data.items.map((item: any) => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
    }));
    console.log("Results:", results);

    return NextResponse.json(results);
  } catch (error: any) {
    console.error("Error fetching search results:", error.message);
    return NextResponse.json(
      { error: "Error fetching search results" },
      { status: 500 }
    );
  }
}