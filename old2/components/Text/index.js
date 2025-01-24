import { Text as ManText } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';

const schemes = {
  light: {
    color: 'dark',
    options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  dark: {
    color: 'gray',
    options: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
  },
};

const Text = ({ shade = 5, color, ...props }) => {
  const { colorScheme } = useMantineTheme();
  const scheme = schemes[colorScheme];
  return (
    <ManText
      {...{
        ...props,
        color: color || `${scheme.color}.${scheme.options[shade]}`,
      }}
    />
  );
};

export default Text;
