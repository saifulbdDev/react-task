import React from "react";

const TdSkeleton = () => (
  <td className="text-capitalize placeholder-glow">
   
      <span className="placeholder col-12"></span>
   
  </td>
);

const TrSkeleton = () => (
  <tr className="border-b">
    {[...Array(4)].map((_, i) => (
      <TdSkeleton key={i} />
    ))}
  </tr>
);

const Skeleton = ({ count }) => (
  <>
    {[...Array(count)].map((_, i) => (
      <TrSkeleton key={i} />
    ))}
  </>
);

export default Skeleton;
