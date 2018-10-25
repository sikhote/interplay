import { colors, spacing } from '../../lib/styling';

export default {
  container: {
    height: '100vh',
    backgroundColor: colors.background,
    flexDirection: 'row',
  },
  containerA3: {
    flexDirection: 'column',
  },
  main: {
    flex: 1,
  },
  mainHorizontalPadding: {
    paddingHorizontal: spacing.pageHorizontal,
  },
  mainHorizontalPaddingA3: {
    paddingHorizontal: spacing.pageHorizontalA3,
  },
  mainVerticalPadding: {
    paddingVertical: spacing.pageVertical,
  },
  mainVerticalPaddingA3: {
    paddingVertical: spacing.pageVerticalA3,
  },
};
