declare module '*.png';
declare module '*.svg';
declare module 'fractional';
declare module 'hot';

declare var module: {
  hot: {
    accept(path?: string, callback?: () => void): void;
  };
};
