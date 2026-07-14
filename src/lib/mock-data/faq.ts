// FAQ data for the homepage FAQ section.

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept bKash, Nagad, and cash on delivery. For mobile payments, simply send the order total to our bKash or Nagad number — we'll verify your payment manually and confirm your order within a few hours.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Orders within Dhaka are delivered the same day or next day. Outside Dhaka, delivery typically takes 2–3 business days. A flat delivery charge of ৳60 applies to all orders.",
  },
  {
    question: "Can I return or exchange a product?",
    answer:
      "Yes! We offer a 7-day hassle-free return and exchange policy. If you're not satisfied with your purchase, contact us within 7 days of delivery and we'll arrange a pickup or exchange.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order is confirmed, you'll receive updates via SMS or WhatsApp. You can also log in to your account dashboard to view order status and history.",
  },
  {
    question: "Are your products genuine and original?",
    answer:
      "Absolutely. We source all products directly from authorized distributors and brands. Every item in our store is 100% authentic stationery — if it's on our shelves, it's the real deal.",
  },
  {
    question: "Do you offer bulk or wholesale pricing?",
    answer:
      "Yes, we do! For bulk orders of school essentials, office supplies, or corporate gifting, please reach out to us via WhatsApp or email at support@ilhamstationery.com for special pricing.",
  },
  {
    question: "What if an item I want is out of stock?",
    answer:
      "We restock regularly. You can check back on the product page or contact us on WhatsApp to find out when a specific item will be available again.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can reach us via WhatsApp for instant replies, email us at support@ilhamstationery.com, or call us at +880 1712-345678. Our support team is available Saturday to Thursday, 10 AM – 8 PM.",
  },
];
