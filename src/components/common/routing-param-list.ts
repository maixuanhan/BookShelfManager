import { Book } from '../../models/book';
import { Label } from '../../models/label';

export type TRoutingParamList = {
    'menu.home': undefined;
    'menu.books': undefined;
    'menu.labels': undefined;
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
    'label.list'?: {
        new: Partial<Label>;
    };
    'label.add': undefined;
};
