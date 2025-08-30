import React from "react"
import { Entity, Retailer } from "./sales"

export type RetailerPaneChildProps = {
  handleActiveRetailer: (retailer: Entity) => void
}

export type RetailerTab = {
  id: string
  name: string
  content: ({activeRetailer}: {activeRetailer: Entity | undefined}) => React.JSX.Element
}

export interface WalletTransaction {
  transactionDateTime: string;
  description: string;
  type: string;
  amount: string;
  balance: string;
}

export interface Wallet {
  entityId?: number;
  walletId: number;
  walletName: string;
  walletTypeId?: number,
  walletAccountNumber?: string;
  balance?: string;
  walletBalance?: string;
  history?: WalletTransaction[];
}

export type Stats = {
  players: number,
  winners: number,
  sales: string
}

export interface EntityStats {
  id: number;
  entityTypeId: number;
  stats: Stats;
}
