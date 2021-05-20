export function getPropsAndAttrs(rawAttrs, componentProps) {
  const props = {};
  const attrs = {};
  Object.keys(rawAttrs).forEach((key) => {
    const value = rawAttrs[key];
    // eslint-disable-next-line no-prototype-builtins
    if (componentProps.hasOwnProperty(key)) {
      props[key] = value;
    } else {
      attrs[key] = value;
    }
  });
  return { props, attrs };
}