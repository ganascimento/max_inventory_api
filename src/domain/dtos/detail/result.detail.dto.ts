export class ResultDetailDto {
    inventoryId: string;
    value: number;
    date: Date;
    isAdd: boolean;

    constructor (inventoryId: string, value: number, date: Date, isAdd: boolean) {
        this.inventoryId = inventoryId;
        this.value = value;
        this.date = date;
        this.isAdd = isAdd;
    }
}