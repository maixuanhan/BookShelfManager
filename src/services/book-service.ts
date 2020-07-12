import { Book } from "../models/book";
import { Label } from "../models/label";

export class BookService {
    public async getBooks(skip: number, take: number): Promise<[Book[], number]> {
        console.log(`getBooks(skip=${skip}, take=${take})`);
        return Book.findAndCount({
            order: { createdDate: "DESC" },
            relations: ["labels"],
            skip, take,
        });
    }

    public async addBook(info: Partial<Book>, labels?: Label[]): Promise<Book> {
        const book = new Book(undefined, info.title, info.authors, info.quantity, info.note, info.remark);
        if (labels) {
            for (const label of labels) {
                if (!label.id) {
                    await label.save();
                }
            }
            book.labels = labels;
        }
        return book.save();
    }

    public async updateBook(book: Book): Promise<Book> {
        return book.save()
    }
}
