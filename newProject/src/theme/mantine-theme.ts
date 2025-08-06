import {
  Button,
  Card,
  Container,
  createTheme,
  defaultVariantColorsResolver,
  em,
  Menu,
  Modal,
  MultiSelect,
  rem,
  SegmentedControl,
  Select,
  type VariantColorsResolver,
} from '@mantine/core';
import multiSelectStyles from '@theme/multi-select-grouping.module.css';
import { Roboto, Roboto_Mono } from 'next/font/google';
// These variables need to be in sync with the postcss config
const BREAKPOINTS: Record<string, number> = {
  sm: 768,
  md: 880,
  lg: 1296,
};
const CONTAINER_SIZES: Record<string, string> = {
  sm: em(BREAKPOINTS.sm),
  md: em(BREAKPOINTS.md),
  lg: em(BREAKPOINTS.lg),
};
const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
});
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
});
const variantColorResolver: VariantColorsResolver = input => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);
  if (input.variant === 'transparent') {
    return {
      ...defaultResolvedColors,
      color: 'var(--mantine-color-gray-6)',
      hoverColor: 'var(--mantine-color-gray-6)',
    };
  }
  return defaultResolvedColors;
};
export const mantineTheme = createTheme({
  variantColorResolver,
  cursorType: 'pointer',
  fontFamily: roboto.style.fontFamily,
  fontFamilyMonospace: robotoMono.style.fontFamily,
  primaryColor: 'primary',
  headings: {
    sizes: {
      h1: {
        fontSize: rem(40),
        lineHeight: '1.2',
      },
      h2: {
        fontSize: rem(32),
        lineHeight: '1.35',
      },
      h3: {
        fontSize: rem(24),
        lineHeight: '1.33',
      },
      h4: {
        fontSize: rem(20),
        lineHeight: '1.2',
      },
      h5: {
        fontSize: rem(16),
        lineHeight: '1.25',
      },
      h6: {
        fontSize: rem(12),
        lineHeight: '1.33',
      },
    },
    fontWeight: '700',
  },
  fontSizes: {
    xxs: rem(10),
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20),
  },
  lineHeights: {
    xxs: '1.2',
    xs: '1.16',
    sm: '1.14',
    md: '1.14',
    lg: '1.11',
    xl: '1.2',
  },
  breakpoints: {
    sm: em(BREAKPOINTS.sm),
    md: em(BREAKPOINTS.md),
    lg: em(BREAKPOINTS.lg),
  },
  components: {
    Container: Container.extend({
      vars: (_, { size, fluid }) => ({
        root: {
          '--container-size': fluid
            ? '100%'
            : size !== undefined && size in CONTAINER_SIZES
              ? CONTAINER_SIZES[size as keyof typeof CONTAINER_SIZES]
              : rem(size),
        },
      }),
    }),
    MultiSelect: MultiSelect.extend({
      defaultProps: {
        classNames: {
          groupLabel: multiSelectStyles.groupLabel,
        },
        styles: {
          label: {
            marginBottom: 4,
          },
        },
        clearable: true,
        searchable: true,
        nothingFoundMessage: 'Nothing found...',
        rightSectionProps: {
          style: {
            cursor: 'pointer',
          },
        },
      },
    }),
    Button: Button.extend({
      defaultProps: {
        fw: 400,
      },
    }),
    Modal: Modal.extend({
      defaultProps: {
        overlayProps: {
          blur: 4,
        },
      },
    }),
    Menu: Menu.extend({
      defaultProps: {
        styles: {
          item: {
            fontSize: '14px',
            padding: '8px 12px',
          },
        },
      },
    }),
    Card: Card.extend({
      defaultProps: {
        radius: 8,
      },
    }),
    Select: Select.extend({
      defaultProps: {
        styles: {
          label: {
            marginBottom: 4,
          },
        },
      },
    }),
    SegmentedControl: SegmentedControl.extend({
      defaultProps: {
        styles: {
          label: {
            fontWeight: 400,
          },
        },
      },
    }),
  },
});
