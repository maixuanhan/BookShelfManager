import { Label } from '../models/label';

export class LabelBuilder {
    private label = new Label();

    public makeNewLabel(name: string, description?: string): LabelBuilder {
        this.label.name = name;
        this.label.description = description;
        return this;
    }

    public get(): Label {
        return this.label;
    }
}
