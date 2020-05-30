export class Label {
    public createdDate: Date;
    constructor(
        public name: string,
        public description?: string,
        createdDate?: Date,
    ) {
        this.createdDate = createdDate || new Date();
    }
}
