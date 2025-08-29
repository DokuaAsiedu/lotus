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


export interface Winner {
  stake: string;
  amount: string;
  play: string;
  retailClient: RetailClient;
}

export interface EventResult {
  eventId: string;
  winningStake: string;
  payoutAmount: string;
  totalPlayers: string;
  winners: Winner[];
}

export interface Game {
  id: string;
  name: string;
  description: string | null;
}

export interface Stake {
  ticketNumber: string;
  game: Game;
  play: string;
  stake: string;
  createdAt: string;
  stakeAmount: string;
  retailClient: RetailClient;
}

export interface TicketResponse {
  coupon: string;
  Stakes: Stake[];
}