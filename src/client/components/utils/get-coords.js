const overlayOffsetV = 4;

export default (elem, showToTop, showToLeft) => {
  if (!elem) {
    return { top: 0, left: 0 };
  }

  let offsetLeft = 0;
  let offsetTop = 0;
  let rect = elem.getBoundingClientRect();

  do {
    if (!isNaN(elem.offsetLeft)) {
      offsetLeft += elem.offsetLeft;
    }
    if (!isNaN(elem.offsetTop)) {
      offsetTop += elem.offsetTop;
    }
  } while(elem = elem.offsetParent);

  return {
    top: showToTop ?
      offsetTop - overlayOffsetV :
      offsetTop + rect.height + overlayOffsetV,

    left: showToLeft ?
      offsetLeft + rect.width :
      offsetLeft,

    alwaysLeft: offsetLeft + rect.width
  };
}
