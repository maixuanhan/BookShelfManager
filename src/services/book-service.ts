import { Book } from '../models/book';
import { Label } from '../models/label';
import { DeleteResult } from 'typeorm/browser';

export class BookService {
    public getBooks(skip: number, take: number): Promise<[Book[], number]> {
        console.log(`getBooks(skip=${skip}, take=${take})`);
        return Book.findAndCount({
            order: { createdDate: 'DESC' },
            relations: ['labels'],
            skip, take,
        });
    }

    public async addBook(info: Partial<Book>, labels?: Label[]): Promise<Book> {
        const book = new Book(undefined, info.title, info.authors, info.quantity, info.note, info.remark);
        if (labels) {
            book.labels = labels;
        }
        return book.save();
    }

    public updateBook(book: Book): Promise<Book> {
        return book.save()
    }

    public deleteBook(id: number): Promise<DeleteResult> {
        return Book.delete(id);
    }
}
