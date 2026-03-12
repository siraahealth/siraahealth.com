import { NextResponse } from "next/server";
import { PageContentBackendService } from "@/services-backend/PageContentService";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const section = searchParams.get("section");

    if (!page || !section) {
      return NextResponse.json({ error: "Missing page or section parameter" }, { status: 400 });
    }

    const content = await PageContentBackendService.getPageContent(page, section);
    return NextResponse.json({ data: content });
  } catch (error) {
    console.error("Error in /api/internal/page-contents:", error);
    return NextResponse.json({ error: "Failed to fetch page contents" }, { status: 500 });
  }
}
