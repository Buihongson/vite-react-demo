export interface IBank {
    createdAt: string
    lookupSupported: number
    transferSupported: number
    logo: string
    shortName: string
    bin: number
    code: string
    name: string
    _id: string
    id: number
}

export interface IBankAccount {
    createdAt: string
    accountNo: string
    accountName: string
    bank: string
    acqId: number
    amount: number
    format: string
    template: string
    description: string
    type: string
    _id: string
}
