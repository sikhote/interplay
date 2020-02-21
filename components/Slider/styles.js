import { borderRadii, colors } from '../../lib/styling';

export default {
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  rail: {
    height: 4,
    borderRadius: borderRadii.b,
    position: 'absolute',
    top: '50%',
    marginTop: -2,
    left: 0,
    width: '100%',
  },
  slider: {
    height: 24,
    cursor: 'pointer',
    appearance: 'none',
    background: 'none',
    width: '100%',
    outline: 'none',
    borderRadius: borderRadii.b,
    position: 'relative',
    zIndex: 1,
    '&::WebkitSliderRunnableTrack': {
      height: '100%',
    },
    '&::MozRangeTrack': {
      height: '100%',
    },
    '&::MsTrack': {
      height: '100%',
      color: 'transparent',
      border: 'none',
    },
    '&::WebkitSliderThumb': {
      appearance: 'none',
      width: 20,
      height: 20,
      borderRadius: borderRadii.b,
      background: colors.white,
      borderWidth: 2,
      borderStyle: 'solid',
      position: 'relative',
      top: 2,
    },
    '&::MozRangeThumb': {
      width: 20,
      height: 20,
      borderRadius: borderRadii.b,
      background: colors.white,
      borderWidth: 2,
      borderStyle: 'solid',
      boxSizing: 'border-box',
    },
    '&::MsThumb': {
      width: 20,
      height: 20,
      borderRadius: borderRadii.b,
      background: colors.white,
      borderWidth: 2,
      borderStyle: 'solid',
      boxSizing: 'border-box',
    },
  },
};
