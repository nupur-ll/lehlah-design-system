import { useState } from "react";
import { Tab } from "@lehlah/design-system";

export function Pill() {
  const [tab, setTab] = useState("overview");
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Tab type="pill" selected={tab === "overview"} onClick={() => setTab("overview")}>
        Overview
      </Tab>
      <Tab type="pill" selected={tab === "analytics"} onClick={() => setTab("analytics")}>
        Analytics
      </Tab>
      <Tab type="pill" selected={tab === "payouts"} onClick={() => setTab("payouts")}>
        Payouts
      </Tab>
    </div>
  );
}

export function Underlined() {
  const [tab, setTab] = useState("products");
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Tab type="underlined" selected={tab === "products"} onClick={() => setTab("products")}>
        Products
      </Tab>
      <Tab type="underlined" selected={tab === "collections"} onClick={() => setTab("collections")}>
        Collections
      </Tab>
      <Tab type="underlined" selected={tab === "reviews"} onClick={() => setTab("reviews")}>
        Reviews
      </Tab>
    </div>
  );
}
