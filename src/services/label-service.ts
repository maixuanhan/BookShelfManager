import { DeleteResult } from 'typeorm/browser';
import { Label } from '../models/label';

export class LabelService {
    public getLabels(skip: number, take: number): Promise<[Label[], number]> {
        return Label.findAndCount({
            order: { createdDate: 'DESC' },
            relations: ['books'], skip, take,
        });
    }

    public getLabelsByIds(ids: number[]): Promise<Label[]> {
        return Label.findByIds(ids);
    }

    public addLabel(name: string, description?: string): Promise<Label> {
        const label = new Label(undefined, name, description);
        return label.save();
    }

    public updateLabel(label: Label): Promise<Label> {
        return label.save();
    }

    public getAllLabels(): Promise<Label[]> {
        return Label.find({
            order: { name: 'ASC' },
        });
    }

    public deleteLabel(id: number): Promise<DeleteResult> {
        return Label.delete(id);
    }
}
