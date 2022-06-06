import { JobInterface } from "./JobInterface";

export interface OfferCardInterface extends JobInterface {
  selected?: boolean;
  setSelectedCard:(c:OfferCardInterface|null)=>void;
}