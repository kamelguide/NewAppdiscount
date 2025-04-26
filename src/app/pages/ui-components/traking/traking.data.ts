export interface TrackingLinkDTO {
  linkId: number;
  active: boolean;
  duration: number;
  valideFrom: string;  // String is used for date because it's easier to parse
  valideTo: string;
  priority: string;
  productId: number;
  productName: string;
  discountId: number;
  discountedPrice: number;
  trackingId: number;
  idProduct: number;
  pageName: string;
  timeSpent: number;
  clicks: number;
  sessionId: string;
  latitude: number;
  longitude: number;
  entryTimeFormatted: string;  // You can format this in the frontend if needed
  categorieNAme: string;
}
export interface TrackingData {
  pagename: string;
  timespent: number;
  clicks: number;
  longitude: number;
  latitude: number;
  sessionId: string;
}
