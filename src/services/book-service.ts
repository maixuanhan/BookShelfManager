import { Book } from "src/models/book";
import { Label } from "src/models/label";

export class BookService {
    public async getBooks(skip: number, take: number): Promise<[Book[], number]> {
        return Book.findAndCount({ relations: ["labels"], skip, take });
    }

    public async addBook(title: string, authors: string, quantity: number,
        description?: string, remark?: string, labelIds?: number[]): Promise<Book> {
        const book = new Book(0, title, authors, quantity, description, remark);
        if (labelIds && labelIds.length > 0) {
            const labels = await Label.findByIds(labelIds);
            book.labels = labels;
        }
        return book.save();
    }

    public async updateBook(book: Book): Promise<Book> {
        return book.save()
    }
}
