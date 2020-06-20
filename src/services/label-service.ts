import { Label } from "../models/label";

export class LabelService {
    public async getLabels(skip: number, take: number): Promise<[Label[], number]> {
        return Label.findAndCount({ relations: ["books"], skip, take });
    }

    public async addLabel(name: string, description?: string): Promise<Label> {
        const label = new Label(undefined, name, description);
        return label.save();
    }

    public async updateLabel(label: Label): Promise<Label> {
        return label.save();
    }
}
