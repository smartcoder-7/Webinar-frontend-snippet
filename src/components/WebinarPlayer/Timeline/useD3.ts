import * as d3 from 'd3';
import React from 'react';

function useD3<t extends Element = any>(
  fn: (root: d3.Selection<t, any, any, any>) => any,
  deps?: any[]
): React.RefObject<t> {
  const ref = React.useRef<t>(null);

  React.useEffect(() => {
    if (ref && ref.current) {
      fn(d3.select(ref.current));
    }
  }, deps);
  return ref;
}

export default useD3;
