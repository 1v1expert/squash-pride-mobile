const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = __dirname;
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const defaultApiUrl = 'https://internal.squash-pride.ru/api/v2';

const getApiConfig = apiUrl => {
  try {
    const parsedApiUrl = new URL(apiUrl);

    return {
      proxyOrigin: parsedApiUrl.origin,
      proxyPath: parsedApiUrl.pathname.replace(/\/$/, ''),
    };
  } catch {
    return {
      proxyOrigin: undefined,
      proxyPath: apiUrl.replace(/\/$/, ''),
    };
  }
};

const readEnvValue = key => {
  const envPath = resolveApp('.env');

  if (!fs.existsSync(envPath)) {
    return undefined;
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(new RegExp(`^${key}=(.*)$`, 'm'));

  return match?.[1]?.trim();
};

const transpileModules = [
  resolveApp('index.web.js'),
  resolveApp('App.tsx'),
  resolveApp('src'),
  resolveApp('config'),
  resolveApp('i18n.ts'),
  resolveApp('node_modules/react-native'),
  resolveApp('node_modules/react-native-web'),
  resolveApp('node_modules/react-native-safe-area-context'),
  resolveApp('node_modules/react-native-screens'),
  resolveApp('node_modules/react-native-svg'),
  resolveApp('node_modules/@react-native'),
  resolveApp('node_modules/@react-navigation'),
  resolveApp('node_modules/@gluestack-ui'),
  resolveApp('node_modules/@gluestack-style'),
  resolveApp('node_modules/@legendapp'),
  resolveApp('node_modules/@expo/html-elements'),
];

module.exports = (_, argv = {}) => {
  const mode = argv.mode || 'development';
  const isProduction = mode === 'production';
  const isDev = !isProduction;
  const apiUrl = process.env.API_URL || readEnvValue('API_URL') || defaultApiUrl;
  const {proxyOrigin, proxyPath} = getApiConfig(apiUrl);
  const browserApiUrl = isDev ? proxyPath : apiUrl;

  return {
    mode,
    entry: resolveApp('index.web.js'),
    output: {
      path: resolveApp('dist'),
      filename: isProduction ? 'static/js/[name].[contenthash:8].js' : 'static/js/bundle.js',
      assetModuleFilename: 'static/media/[name].[hash][ext][query]',
      clean: true,
      publicPath: '/',
    },
    resolve: {
      alias: {
        'react-native$': 'react-native-web',
        'react-native-splash-screen$': resolveApp('src/web/shims/react-native-splash-screen.ts'),
        'react-native-orientation-locker$': resolveApp('src/web/shims/react-native-orientation-locker.ts'),
        'react-native-system-navigation-bar$': resolveApp('src/web/shims/react-native-system-navigation-bar.ts'),
        'react-native-create-thumbnail$': resolveApp('src/web/shims/react-native-create-thumbnail.ts'),
        'react-native-video-player$': resolveApp('src/web/shims/react-native-video-player.tsx'),
        'react-native-linear-gradient$': resolveApp('src/web/shims/react-native-linear-gradient.tsx'),
        'react-native-config$': resolveApp('src/web/shims/react-native-config.ts'),
        'react-native-country-picker-modal$': resolveApp('src/web/shims/react-native-country-picker-modal.tsx'),
        'react-native-picker-select$': resolveApp('src/web/shims/react-native-picker-select.tsx'),
        'react-native-calendars$': resolveApp('src/web/shims/react-native-calendars.tsx'),
        'react-native-calendars/src/calendar/day$': resolveApp('src/web/shims/react-native-calendars-day.ts'),
        'react-native-calendars/src/types$': resolveApp('src/web/shims/react-native-calendars-types.ts'),
        'react-native-calendars/src/style$': resolveApp('src/web/shims/react-native-calendars-style.ts'),
        '@react-native-community/datetimepicker$': resolveApp('src/web/shims/react-native-community-datetimepicker.tsx'),
      },
      extensions: [
        '.web.tsx',
        '.web.ts',
        '.web.jsx',
        '.web.js',
        '.tsx',
        '.ts',
        '.jsx',
        '.js',
        '.json',
      ],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          include: transpileModules,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              configFile: resolveApp('babel.config.js'),
            },
          },
        },
        {
          test: /\.(png|jpe?g|gif|webp|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolveApp('web/index.html'),
      }),
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(isDev),
        'process.env.__DEV__': JSON.stringify(isDev),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || mode),
        'process.env.API_URL': JSON.stringify(browserApiUrl),
      }),
    ],
    devServer: {
      host: '0.0.0.0',
      port: 3000,
      historyApiFallback: true,
      hot: true,
      open: false,
      proxy: proxyOrigin
        ? [
            {
              context: [proxyPath],
              target: proxyOrigin,
              changeOrigin: true,
              secure: true,
            },
          ]
        : undefined,
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
  };
};