export class ChangeAmountInventoryDto {
    id: string;
    value: number;

    constructor(id: string, value: number) {
        this.id = id;
        this.value = value;
    }
}