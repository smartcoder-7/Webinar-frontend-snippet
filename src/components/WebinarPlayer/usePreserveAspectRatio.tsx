import React from 'react';

const usePreserveAspectRatio = <T extends HTMLDivElement>(): {
  style: { transform: string };
  ref: React.Ref<T>;
} => {
  const ref = React.useRef<T>(null);
  const [width, setWidth] = React.useState(1);

  React.useEffect(() => {
    function onResize() {
      return ref.current! && setWidth(ref.current!.offsetWidth);
    }
    window.addEventListener('resize', onResize);
    setWidth(ref.current!.offsetWidth);

    return () => window.removeEventListener('resize', onResize);
  }, [ref.current]);

  const style = {
    transform: `scale(${width / 1000})`,
  };

  return { ref, style };
};

export default usePreserveAspectRatio;
