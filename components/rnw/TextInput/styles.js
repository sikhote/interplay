import { borderRadii, spacing, colors } from '../../../lib/styling';

export default {
  container: {
    position: 'relative',
    backgroundColor: colors.textInputBg,
    borderRadius: borderRadii.a1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefix: {
    paddingLeft: spacing.a6,
  },
  textInput: {
    paddingVertical: spacing.a5,
    paddingHorizontal: spacing.a6,
    color: colors.a4,
    flex: 1,
  },
};
