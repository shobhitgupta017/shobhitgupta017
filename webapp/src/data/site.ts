export type PaymentMethod = {
  id: "cod" | "upi";
  label: string;
  description: string;
};

export const site = {
  name: "Madan Mohan General Store",
  shortName: "Madan Mohan",
  tagline: "From our shelves to your home.",
  description:
    "Madan Mohan General Store — daily groceries, staples, dairy, snacks and household essentials delivered across Krishna Nagar and nearby Delhi neighbourhoods.",
  address: {
    line1: "A-83 Radheypuri",
    line2: "Krishna Nagar",
    city: "Delhi",
    pincode: "110051",
    full: "A-83 Radheypuri, Krishna Nagar, Delhi 110051",
  },
  phones: [
    { label: "Primary", number: "+91 8447813163", tel: "+918447813163" },
    { label: "Alternate", number: "+91 9650403892", tel: "+919650403892" },
  ],
  whatsapp: {
    number: "+91 8447813163",
    link: "https://wa.me/918447813163",
  },
  email: "shobhitgupta017@gmail.com",
  hours: {
    label: "10:00 AM – 10:00 PM",
    days: "All 7 days, no holidays",
  },
  delivery: {
    /** Free delivery above this order value anywhere in our service areas. */
    freeDeliveryThreshold: 3000,
    /** Free delivery above this order value within `nearbyRadiusKm` of the store. */
    nearbyFreeDeliveryThreshold: 500,
    nearbyRadiusKm: 1,
    /** Flat charge applied when no free-delivery rule is met. Placeholder — confirm with the store. */
    deliveryCharge: 49,
    /** Minimum order value required before an order can be placed. */
    minimumOrderValue: 200,
    serviceAreas: [
      "Krishna Nagar",
      "Ram Nagar",
      "Jagatpuri",
      "AGCR Enclave",
      "Hargobind Enclave",
      "Patparganj",
      "Nearby areas",
    ],
  },
  paymentMethods: [
    {
      id: "cod",
      label: "Cash on Delivery",
      description: "Pay our delivery partner in cash when your order arrives.",
    },
    {
      id: "upi",
      label: "UPI",
      description: "Scan and pay on delivery using any UPI app.",
    },
  ] as PaymentMethod[],
} as const;

export const primaryPhone = site.phones[0];

export type Site = typeof site;
