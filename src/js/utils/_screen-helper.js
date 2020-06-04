// Модуль экранный помощник
const ScreenHelper = (() => {
  /* eslint-disable no-unused-vars */
  const NAME = 'ScreenHelper';

  const Min = 320;
  const XS = 415;
  const SM = 640;
  const MD = 1000;
  const LG = 1350;

  const isMin = () => window.matchMedia(`(max-width: ${XS}px)`).matches;

  const isXS = () => window.matchMedia(`(max-width: ${SM - 1}px)`).matches;

  const isSM = () => window.matchMedia(`(min-width: ${SM}px) and (max-width: ${MD - 1}px)`).matches;

  const isMD = () => window.matchMedia(`(min-width: ${MD}px) and (max-width: ${LG - 1}px)`).matches;

  const isLG = () => window.matchMedia(`(min-width: ${LG}px)`).matches;

  const getOrientation = () => {
    if (window.matchMedia('(orientation: portrait)').matches) {
      return 'portrait';
    } return 'landscape';
  };

  const getPixelRatio = () => window.devicePixelRatio
      || window.screen.deviceXDPI / window.screen.logicalXDPI;

  const getScrollbarWidth = () => {
    const { body } = document;
    const bw1 = body.clientWidth;
    body.style.overflow = 'hidden';
    const bw2 = body.clientWidth;
    body.style.overflow = '';
    return bw2 - bw1;
  };

  const isiOS = () => navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;

  const getiOSversion = () => {
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
      const v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
      return parseInt(v[1], 10);
    }
    return null;
  };

  const getCoords = (element) => {
    const box = element.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  };

  // Скорость анимации
  const getAnimationSpeed = () => 200;

  return {
    isMin,
    isXS,
    isSM,
    isMD,
    isLG,
    getOrientation,
    getPixelRatio,
    getScrollbarWidth,
    isiOS,
    getiOSversion,
    getAnimationSpeed,
    getCoords,
    Min,
    XS,
    SM,
    MD,
    LG,
  };
})();

export default ScreenHelper;