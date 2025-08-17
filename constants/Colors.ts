export const Colors = {
  primary: {
    aquamarine: '#b5ffe1',
    celadon: '#93e5ab',
    mint: '#65b891',
    darkCyan: '#4e878c',
    darkGreen: '#00241b',
  },
  gradients: {
    primary: ['#b5ffe1', '#93e5ab'] as const,
    secondary: ['#93e5ab', '#65b891'] as const,
    dark: ['#4e878c', '#00241b'] as const,
  },
  text: {
    primary: '#00241b',
    secondary: '#4e878c',
    light: '#65b891',
    white: '#ffffff',
  },
  background: {
    primary: '#ffffff',
    secondary: '#f8fffe',
    card: '#ffffff',
  },
  status: {
    normal: '#93e5ab',
    warning: '#ffd700',
    danger: '#ff6b6b',
  }
};

export default Colors;