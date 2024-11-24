export interface ExchangeRate {
    code: string;
    currency: string;
    mid: number;
    sellPrice: number;
    buyPrice: number;
    startDate?: string;
}