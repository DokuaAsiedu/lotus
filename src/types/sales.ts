export interface RetailClientContact {
  email: string | null
  phone: string | null
}

export interface RetailClient {
  id: string
  name: string
  profileImage: string | null
  contact: RetailClientContact
}

export interface Retailer {
  sales: string
  totalStakes: string
  retailClient: RetailClient
}

export interface RetailerSummary {
  totalRetailerFloat: string
  totalRetailers: string
  retailers: Retailer[]
}

export interface SalesResponse {
  total: string;
  totalRetailClients: string;
  totalStakes: string;
}
