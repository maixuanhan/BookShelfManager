import { createConnection, Connection } from 'typeorm/browser';
import { Book } from './models/book';
import { Label } from './models/label';

export class Database {
    public static connection?: Connection;

    public static async getConnection(): Promise<Connection | undefined> {
        if (!Database.connection || !Database.connection.isConnected) {
            await Database.initialize();
        }
        return Database.connection;
    }

    public static async initialize(): Promise<void> {
        if (Database.connection && Database.connection.isConnected) { return; }
        Database.connection = await createConnection({
            type: 'react-native',
            database: 'bookshelfmanager',
            location: 'default',
            synchronize: true,
            entities: [Book, Label],
        });
    }
}
