import type { Metadata } from "next";
import { OrderConfirmation } from "@/components/checkout/OrderConfirmation";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Order confirmed", robots: { index: false } };

export default async function OrderPage({ params }: PageProps<"/order/[id]">) {
  const { id } = await params;
  return (
    <Container className="py-12 sm:py-16">
      <OrderConfirmation id={id} />
    </Container>
  );
}
