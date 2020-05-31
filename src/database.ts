import { createConnection } from "typeorm/browser";
import { Book } from "./models/book";
import { Label } from "./models/label";

export const init = async () => {
    const connection = await createConnection({
        type: "react-native",
        database: "bookshelfmanager",
        location: "default",
        synchronize: true,
        entities: [Book, Label]
    });
    // Book.useConnection(connection);
    // Label.useConnection(connection);
    return connection;
};
