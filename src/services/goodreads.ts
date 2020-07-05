import { GOODREADS_API_KEY, GOODREADS_API_SECRET } from "react-native-dotenv";
import { DOMParser } from "xmldom";

function stringify(obj: any): string {
    const seen: any[] = [];

    return JSON.stringify(obj, function (key, val) {
        if (val != null && typeof val == "object") {
            if (seen.indexOf(val) >= 0) {
                return;
            }
            seen.push(val);
        }
        return val;
    });
}

export interface IBookInfo {
    id: number;
    title: string;
    author?: string;
    imageUrl?: string;
    thumbnailUrl?: string;
}

// <best_book type="Book">
// <id type="integer">2761626</id>
// <title>The Brass Verdict (Harry Bosch, #14; Mickey Haller, #2; Harry Bosch Universe, #18)</title>
// <author>
// <id type="integer">12470</id>
// <name>Michael Connelly</name>
// </author>
// <image_url>https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png</image_url>
// <small_image_url>https://s.gr-assets.com/assets/nophoto/book/50x75-a91bf249278a81aabab721ef782c4a74.png</small_image_url>
// </best_book>

export async function searchTitle(query: string): Promise<IBookInfo[]> {
    const result: IBookInfo[] = [];
    const res = await fetch(`https://www.goodreads.com/search/index.xml?key=${GOODREADS_API_KEY}&q=${query}`, {
        method: "GET",
    });
    if (res.ok) {
        const xmlText = await res.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText);
        // console.log("xmlDoc", xmlDoc);
        const books = xmlDoc.getElementsByTagName("best_book");
        if (books) {
            console.log("Result count:", books.length);
            for (let i = 0; i < Math.min(10, books.length); ++i) {
                const b = books[i];
                const id = Number(b.getElementsByTagName("id")[0]?.firstChild?.nodeValue);
                const title = b.getElementsByTagName("title")[0]?.firstChild?.nodeValue;
                const author = b.getElementsByTagName("author")[0]?.getElementsByTagName("name")[0]?.firstChild?.nodeValue || undefined;
                const imageUrl = b.getElementsByTagName("image_url")[0]?.firstChild?.nodeValue || undefined;
                const thumbnailUrl = b.getElementsByTagName("small_image_url")[0]?.firstChild?.nodeValue || undefined;
                console.log(title);
                if (title) { result.push({ id, title, author, imageUrl, thumbnailUrl }); }
            }
        }
    }
    return result;
}
