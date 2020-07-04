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

export async function searchTitle(title: string) {
    const res = await fetch(`https://www.goodreads.com/search/index.xml?key=${GOODREADS_API_KEY}&q=${title}`, {
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
                const title = b.getElementsByTagName("title")[0]?.firstChild?.nodeValue;
                console.log(title);
            }
        }
    }
}
