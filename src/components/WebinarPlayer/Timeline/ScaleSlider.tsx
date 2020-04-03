import React from 'react';
import useD3 from './useD3';
import * as d3 from 'd3';
import { ZoomScaleProviderContext } from './';

const ScaleSlider = () => {
  const { zoom, zoomRef, zoomTransform } = React.useContext(ZoomScaleProviderContext);
  const ref = useD3((root) => {
    root.on('input', () => {
      zoom!.scaleTo(d3.select(zoomRef!.current) as any, d3.event.target.value);
    });

    zoom!.on('zoom.scaleSlider', () => {
      root.property('value', d3.event.transform.k);
    });
  });

  const value = zoomTransform ? zoomTransform.k : zoom!.scaleExtent()[0];
  const percentage = ((value / zoom!.scaleExtent()[1]) * 100).toFixed(0);
  return (
    <div className='p-3'>
      <input
        ref={ref}
        type={'range'}
        value={value}
        min={zoom!.scaleExtent()[0]}
        max={zoom!.scaleExtent()[1]}
        step={(zoom!.scaleExtent()[1] - zoom!.scaleExtent()[0]) / 10000}
      />
      <div className='text-gray-2'>Timeline zoom: {`${percentage}%`}</div>
    </div>
  );
};

export default ScaleSlider;
