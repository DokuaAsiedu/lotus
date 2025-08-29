import React from "react"
import { Retailer } from "./sales"

export type RetailerPaneChildProps = {
  handleActiveRetailer: (retailer: Retailer) => void
}

export type RetailerTab = {
  id: string
  name: string
  content: ({activeRetailer}: {activeRetailer: Retailer | undefined}) => React.JSX.Element
}

export interface WalletTransaction {
  transactionDateTime: string;
  description: string;
  type: string;
  amount: string;
  balance: string;
}

export interface Wallet {
  entityId: number;
  walletId: number;
  walletAccountNumber: string;
  balance: string;
  history: WalletTransaction[];
}
