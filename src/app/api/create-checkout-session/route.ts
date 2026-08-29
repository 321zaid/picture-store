import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const { items } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const key = process.env.STRIPE_SECRET_KEY;
    if (!key || !key.startsWith("sk_")) {
      return NextResponse.json(
        { error: "Stripe is not configured. Add STRIPE_SECRET_KEY in the Cloudflare Pages dashboard." },
        { status: 503 }
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://picture-store-9am.pages.dev";

    const body = new URLSearchParams();
    body.set("mode", "payment");
    body.set("success_url", `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`);
    body.set("cancel_url", `${baseUrl}/cancel`);
    body.set("payment_method_types[0]", "card");

    items.forEach((item: { title: string; price: number }, i: number) => {
      body.set(`line_items[${i}][price_data][currency]`, "usd");
      body.set(`line_items[${i}][price_data][product_data][name]`, item.title);
      body.set(
        `line_items[${i}][price_data][unit_amount]`,
        String(Math.round(item.price * 100))
      );
      body.set(`line_items[${i}][quantity]`, "1");
    });

    const resp = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    const data = await resp.json();
    if (!resp.ok) {
      return NextResponse.json(
        { error: data?.error?.message || "Stripe request failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ sessionId: data.id, url: data.url });
  } catch (err: any) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
