const overlayOffsetV = 4;

export const getCoords = (elem, showToTop, showToLeft) => {
  if (!elem) {
    return ({ top: 0, left: 0 });
  }

  let rect = elem.getBoundingClientRect();

  return {
    top: showToTop ?
      rect.top - overlayOffsetV + window.pageYOffset :
      rect.top + rect.height + overlayOffsetV + window.pageYOffset,

    left: showToLeft ?
      rect.left + rect.width + document.body.scrollLeft :
      rect.left + document.body.scrollLeft,

    alwaysLeft: rect.left + rect.width + document.body.scrollLeft
  };
};

export const splitProps = (props, specificPropNames = []) => {
  return Object.keys(props).reduce((result, propName) => {
    const isPropSpecific = specificPropNames.indexOf(propName) >= 0;
    if (isPropSpecific) {
      const commonProps = { ...result[0] };
      const specificProps = { ...result[1], [propName]: props[propName] };
      return [commonProps, specificProps];
    }

    const commonProps = { ...result[0], [propName]: props[propName] };
    const specificProps = { ...result[1] };
    return [commonProps, specificProps];
  }, [{}, {}]);
}
