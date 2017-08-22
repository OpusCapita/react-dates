const overlayOffsetV = 4;

export default (elem, showToTop, showToLeft) => {
  if (!elem) {
    return ({ top: 0, left: 0, alwaysLeft: 0 });
  }

  let rect = elem.getBoundingClientRect();

  return ({
    top: showToTop ?
      rect.top - overlayOffsetV + document.body.scrollTop :
      rect.top + rect.height + overlayOffsetV + document.body.scrollTop,

    left: showToLeft ?
      rect.left + rect.width + document.body.scrollLeft :
      rect.left + document.body.scrollLeft,

    alwaysLeft: rect.left + rect.width + document.body.scrollLeft
  });
}
