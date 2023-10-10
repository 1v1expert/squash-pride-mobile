// gluestack-ui.config.ts

import {createConfig, config as defaultConfig} from '@gluestack-ui/themed';

export const config = createConfig({
  ...defaultConfig.theme,
  tokens: {
    ...defaultConfig.theme.tokens,
    colors: {
      ...defaultConfig.theme.tokens.colors,
    },
  },

  components: {
    Input: {
      theme: {
        variants: {
          variant: {
            primary: {
              bgColor: '#000',
              _text: {
                color: '#fff',
              },
              borderWidth: 0,
              borderColor: '#F7A936',
              ':focus': {
                _text: {
                  color: '#fff',
                },
                // bgColor: 'purple',
                borderWidth: 1,
                borderColor: '#F7A936',
              },
              _dark: {
                bg: 'transparent',
                _text: {
                  color: '$primary600',
                },
                ':hover': {
                  _text: {
                    color: '$primary600',
                  },
                  bg: '$primary600_alpha_10',
                },
                ':active': {
                  _text: {
                    color: '$primary600',
                  },
                  bg: '$primary600_alpha_20',
                },
              },
            },
            secondary: {
              bgColor: '#000',
              _text: {
                color: '#fff',
              },
              borderWidth: 0,
              ':focus': {
                bgColor: '#F7A936',
                _text: {
                  color: '#000',
                },
              },
            },
          },
        },
      },
      componentConfig: {
        descendantStyle: ['_text'],
      },
    },
    Select: {
      theme: {
        variants: {
          variant: {
            primary: {
              bgColor: '#000',
              _text: {
                color: '#fff',
              },
              borderWidth: 0,
              borderColor: '#F7A936',
            },
            secondary: {
              bgColor: '#000',
              _text: {
                color: '#fff',
              },
              borderWidth: 0,
            },
          },
        },
      },
      componentConfig: {
        descendantStyle: ['_text'],
      },
    },
    SelectTrigger: {
      theme: {
        variants: {
          variant: {
            primary: {
              bgColor: '#000',
              _text: {
                color: '#fff',
              },
              borderWidth: 0,
            },
            secondary: {
              bgColor: '#000',
              _text: {
                color: '#fff',
              },
              borderWidth: 0,
            },
          },
        },
      },
      componentConfig: {
        descendantStyle: ['_text'],
      },
    },
    SelectInput: {
      theme: {
        variants: {
          variant: {
            primary: {
              color: '#fff',
            },
            secondary: {
              color: '#fff',
              ':focus': {
                color: '#000',
              },
            },
          },
        },
      },
    },
    InputField: {
      theme: {
        variants: {
          variant: {
            primary: {
              color: '#fff',
            },
            secondary: {
              color: '#fff',
              ':focus': {
                color: '#000',
              },
            },
          },
        },
      },
      componentConfig: {
        descendantStyle: ['_text'],
      },
    },
    CheckboxIndicator: {
      theme: {
        variants: {
          variant: {
            primary: {
              bgColor: '#000',
              borderWidth: 0,
            },
          },
        },
      },
      componentConfig: {
        descendantStyle: ['_text'],
      },
    },
    Text: {
      theme: {
        variants: {
          variant: {
            primary: {
              color: '#FFFFFF',
            },
            secondary: {
              color: '#F7A936',
            },
          },
        },
      },
      componentConfig: {
        descendantStyle: ['_text'],
      },
    },
  },
});

// Get the type of Config
type ConfigType = typeof config;

// Extend the internal ui config
declare module '@gluestack-ui/themed' {
  interface UIConfig extends ConfigType {}
}
