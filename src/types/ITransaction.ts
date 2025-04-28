import { User } from "./IUser"

export interface ITransaction {
    _id: string
    username: string
    user: User
    amount: number
    amountVND: number
    orderId: string
    status: string
    type: string
    currency: string
    createdAt: string
    updatedAt: string
    __v: number
}
