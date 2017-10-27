const overlayOffsetV = 4;

export const getCoords = (elem, showToTop, showToLeft) => {
  if (!elem) {
    return ({ top: 0, left: 0 });
  }

  let rect = elem.getBoundingClientRect();
  let elemTop = elem.offsetTop === 0 && elem.offsetParent ? elem.offsetParent.offsetTop : elem.offsetTop;

  return {
    top: showToTop ?
      elemTop - overlayOffsetV :
      elemTop + rect.height + overlayOffsetV,

    left: showToLeft ?
      rect.left + rect.width + document.body.scrollLeft :
      rect.left + document.body.scrollLeft,

    alwaysLeft: rect.left + rect.width + document.body.scrollLeft
  };
};
