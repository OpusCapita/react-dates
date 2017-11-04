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
