// // gluestack-ui.config.ts
//
// import {createConfig} from '@gluestack-ui/themed';
// import {config as defaultConfig } from '@gluestack-ui/config';
//
// export const config = createConfig(
//     {
//   ...defaultConfig,
//   tokens: {
//     ...defaultConfig.tokens,
//     colors: {
//       ...defaultConfig.tokens.colors,
//     },
//     fontFamily: {
//       heading: 'CenturyGothic',
//       body: 'CenturyGothic',
//       mono: 'CenturyGothic',
//     },
//   },
//
//   components: {
//     Input: {
//       theme: {
//         variants: {
//           variant: {
//             primary: {
//               bgColor: '#000',
//               _text: {
//                 color: '#fff',
//               },
//               fontFamily: 'Century Gothic',
//               borderWidth: 0,
//               borderColor: '#F7A936',
//               ':focus': {
//                 _text: {
//                   color: '#fff',
//                 },
//                 // bgColor: 'purple',
//                 borderWidth: 1,
//                 borderColor: '#F7A936',
//               },
//               _dark: {
//                 bg: 'transparent',
//                 _text: {
//                   color: '$primary600',
//                 },
//                 ':hover': {
//                   _text: {
//                     color: '$primary600',
//                   },
//                   bg: '$primary600_alpha_10',
//                 },
//                 ':active': {
//                   _text: {
//                     color: '$primary600',
//                   },
//                   bg: '$primary600_alpha_20',
//                 },
//               },
//             },
//             secondary: {
//               bgColor: '#000',
//               _text: {
//                 color: '#fff',
//               },
//               borderWidth: 0,
//               ':focus': {
//                 bgColor: '#F7A936',
//                 _text: {
//                   color: '#000',
//                 },
//               },
//             },
//             textEdit: {
//               bgColor: '#25282D',
//               _text: {
//                 color: 'red',
//               },
//               fontFamily: 'Century Gothic',
//               borderWidth: 0,
//               borderColor: 'red',
//               ':focus': {
//                 _text: {
//                   color: 'red',
//                 },
//                 // bgColor: 'purple',
//                 borderWidth: 1,
//                 borderColor: '#F7A936',
//               },
//             },
//           },
//         },
//       },
//       componentConfig: {
//         descendantStyle: ['_text'],
//       },
//     },
//     Select: {
//       theme: {
//         variants: {
//           variant: {
//             primary: {
//               bgColor: '#000',
//               _text: {
//                 color: '#fff',
//               },
//               borderWidth: 0,
//               borderColor: '#F7A936',
//             },
//             secondary: {
//               bgColor: '#000',
//               _text: {
//                 color: '#fff',
//               },
//               borderWidth: 0,
//             },
//           },
//         },
//       },
//       componentConfig: {
//         descendantStyle: ['_text'],
//       },
//     },
//     SelectTrigger: {
//       theme: {
//         variants: {
//           variant: {
//             primary: {
//               bgColor: '#000',
//               _text: {
//                 color: '#fff',
//               },
//               borderWidth: 0,
//             },
//             secondary: {
//               bgColor: '#000',
//               _text: {
//                 color: '#fff',
//               },
//               borderWidth: 0,
//             },
//           },
//         },
//       },
//       componentConfig: {
//         descendantStyle: ['_text'],
//       },
//     },
//     SelectInput: {
//       theme: {
//         variants: {
//           variant: {
//             primary: {
//               color: '#fff',
//             },
//             secondary: {
//               color: '#fff',
//               ':focus': {
//                 color: '#000',
//               },
//             },
//           },
//         },
//       },
//     },
//     InputField: {
//       theme: {
//         variants: {
//           variant: {
//             primary: {
//               color: '#fff',
//             },
//             secondary: {
//               color: '#fff',
//               ':focus': {
//                 color: '#000',
//               },
//             },
//             textEdit: {
//               color: '#fff',
//             },
//           },
//         },
//       },
//       componentConfig: {
//         descendantStyle: ['_text'],
//       },
//     },
//     CheckboxIndicator: {
//       theme: {
//         variants: {
//           variant: {
//             primary: {
//               bgColor: '#000',
//               borderWidth: 0,
//             },
//           },
//         },
//       },
//       componentConfig: {
//         descendantStyle: ['_text'],
//       },
//     },
//     Text: {
//       theme: {
//         variants: {
//           variant: {
//             primary: {
//               fontFamily: 'Century Gothic',
//               color: '#FFFFFF',
//             },
//             secondary: {
//               fontFamily: 'Century Gothic',
//               color: '#F7A936',
//             },
//           },
//         },
//       },
//       componentConfig: {
//         descendantStyle: ['_text'],
//       },
//     },
//   },
// });
//
// // Get the type of Config
// type ConfigType = typeof config;
//
// // Extend the internal ui config
// declare module '@gluestack-ui/themed' {
//   interface UIConfig extends ConfigType {}
// }
