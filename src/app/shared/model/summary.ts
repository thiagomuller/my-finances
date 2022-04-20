import { Injectable } from '@angular/core'

export interface Summary {
    account: string,
    currency: string,
    previousBalance: number,
    income: number,
    expenses: number
}