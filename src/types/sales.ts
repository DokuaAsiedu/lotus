import { Wallet } from "./retailers"

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
  playerPhoneNumber?: string;
  retailClient: RetailClient;
}

export interface TicketResponse {
  coupon: string;
  Stakes: Stake[];
}

export type Contact = {
  email?: null | string,
  phone?: string,
}

export type Profile = {
  entityTypeName?: string,
  channelName?: string,
  name?: string,
  profileImage?: null | string,
}

export type IdDocs = {
  GhanaCardNumber: null | string,
  GhanaCardFront: null | string,
  GhanaCardBack: null | string,
}

export interface Entity {
  "id": string;
  "entityTypeId": number;
  "channelId": number;
  "profile": Profile;
  "idDocs": IdDocs;
  "contact": Contact,
  "wallet": Wallet[];
  "createdAt": string;
}