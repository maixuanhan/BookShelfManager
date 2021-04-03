import { Label } from '../models/label';
import { Book } from '../models/book';

export class BookBuilder {
    private book = new Book();

    public makeNewBook(title: string, authors?: string, quantity?: number, note?: string, remark?: string)
        : BookBuilder {
        this.book.title = title;
        this.book.authors = authors;
        this.book.quantity = quantity || 0;
        this.book.note = note;
        this.book.remark = remark;
        return this;
    }

    public setLabels(labels?: Label[]): BookBuilder {
        if (labels) {
            this.book.labels = labels;
        }
        return this;
    }

    public get(): Book {
        return this.book;
    }
}
