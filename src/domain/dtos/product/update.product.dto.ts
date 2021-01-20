export class UpdateProductDto {
    id: string;
    name: string;
    value: number;
    identCode: string;
    description: string;
    unitType: string;
    brand: string;
    minAmount: number;
    userId: string;

    constructor(id: string, name: string, value: number, identCode: string, description: string, unitType: string, brand: string, minAmount: number) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.identCode = identCode;
        this.description = description;
        this.unitType = unitType;
        this.brand = brand;
        this.minAmount = minAmount;
    }
}