import { colors, spacing } from '../../lib/styling';

export default {
  container: {
    backgroundColor: colors.navigationBg,
    width: 280,
    paddingVertical: spacing.pageVertical,
  },
  containerA3: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 0,
  },
  item: {
    paddingHorizontal: spacing.pageHorizontal,
    paddingVertical: spacing.a4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemA3: {
    flex: 1,
    justifyContent: 'center'
  },
  itemTitle: {
    paddingLeft: spacing.a5,
  },
};
