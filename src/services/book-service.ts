import { Book } from '../models/book';
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

    public addOrUpdateBook(book: Book): Promise<Book> {
        return book.save()
    }

    public deleteBook(id: number): Promise<DeleteResult> {
        return Book.delete(id);
    }
}
