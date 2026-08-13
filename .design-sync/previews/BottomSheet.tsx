import { useState } from "react";
import { BottomSheet } from "@lehlah/design-system";

export function FilterSheet() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["Active"]);
  return (
    // BottomSheet renders its overlay as `fixed inset-0`. The card harness's
    // single-mode mount point has a `transform`, which per the CSS spec makes
    // IT the containing block for that fixed child — since the mount point has
    // no other flowed content, it collapses to 0 height and `inset-0` resolves
    // against a 0-height box. Giving the mount point explicit viewport-matching
    // height via this wrapper fixes the containing block's size.
    <div style={{ position: "relative", height: "560px", width: "100%" }}>
      <BottomSheet
        open
        onClose={() => {}}
        headerText="Filters"
        filters={[
          { name: "Category", options: ["Skincare", "Makeup", "Haircare"] },
          { name: "Status", options: ["Active", "Paused"] },
        ]}
        selectedOptions={selectedOptions}
        onOptionToggle={(opt) =>
          setSelectedOptions((prev) => (prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]))
        }
        onPrimaryAction={() => {}}
      />
    </div>
  );
}
