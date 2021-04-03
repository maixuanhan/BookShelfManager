import { Book } from 'src/models/book';

export type TRoutingParamList = {
    'menu.home': undefined;
    'menu.books': undefined;
    'book.list'?: { // ? means params are optional
        new: Partial<Book>;
    };
    'book.add'?: {
        ids: number[];
    };
    'book.assignlabels': {
        ids: number[];
        news?: string[];
    };
};
