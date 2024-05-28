import React, { memo, useMemo } from "react";

import { useSchemaStore } from "~/state/schema";

const PositionInfoComponent: React.FC = () => {
  const retailerName = useSchemaStore((state) => state.schema?.retailer?.name);
  const retailerAddress = useSchemaStore(
    (state) => state.schema?.retailer?.address
  );

  const positionInfo = useMemo(
    () => [retailerName, retailerAddress].filter(Boolean).join(" "),
    [retailerName, retailerAddress]
  );

  if (!positionInfo) return null;

  return (
    <>
      <br />
      <strong>{positionInfo}</strong>
    </>
  );
};

export const PositionInfo = memo(PositionInfoComponent);
