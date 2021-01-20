export class CreateProductDto {
    name: string;
    value: number;
    identCode: string;
    description: string;
    unitType: string;
    brand: string;
    minAmount: number;
    userId: string;

    constructor(name: string, value: number, identCode: string, description: string, unitType: string, brand: string, minAmount: number) {
        this.name = name;
        this.value = value;
        this.identCode = identCode;
        this.description = description;
        this.unitType = unitType;
        this.brand = brand;
        this.minAmount = minAmount;
    }
}