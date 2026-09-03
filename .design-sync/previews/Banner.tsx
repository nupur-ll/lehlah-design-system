import { Banner } from "@lehlah/design-system";

function SparkleCreative() {
  return (
    <div className="flex size-full items-center justify-center">
      <svg viewBox="0 0 64 64" fill="none" className="size-16 opacity-90" aria-hidden>
        <path
          d="M32 6l6 18 18 6-18 6-6 18-6-18-18-6 18-6 6-18z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export function ColorAxis() {
  return (
    <div className="flex flex-wrap gap-4">
      <Banner
        color="purple"
        weight="default"
        header="Flash Sale"
        subtext="Up to 50% off today"
        cta="Shop now"
      />
      <Banner
        color="teal"
        weight="default"
        header="Referral bonus"
        subtext="Earn ₹500 per signup"
        cta="Invite now"
      />
      <Banner
        color="orange"
        weight="default"
        header="Boost your reach"
        subtext="Promote to affiliates"
        cta="Get started"
        creative={<SparkleCreative />}
      />
    </div>
  );
}

export function WeightAxis() {
  return (
    <div className="flex flex-wrap gap-4">
      <Banner
        color="magenta"
        weight="dark"
        header="New Arrivals"
        subtext="Fresh drops weekly"
        cta="Explore"
      />
      <Banner
        color="magenta"
        weight="default"
        header="New Arrivals"
        subtext="Fresh drops weekly"
        cta="Explore"
      />
      <Banner
        color="magenta"
        weight="light"
        header="New Arrivals"
        subtext="Fresh drops weekly"
        cta="Explore"
      />
    </div>
  );
}
