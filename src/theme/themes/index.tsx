export { default as dark } from './dark';
export { default as default } from './default';
export { default as emerald } from './emerald';
export { default as eletricIndigo } from './eletricIndigo';
export { default as magentaProcess } from './magentaProcess';
export { default as saffron } from './saffron';
export { default as steelTeal } from './steelTeal';
export { default as tomato } from './tomato';
export { default as darkSalmon } from './darkSalmon';
export { default as copper } from './copper';
declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    header: Palette['primary'];
    profileBg: string;
    info: Palette['primary']; 
  }
  interface PaletteOptions {
    header: PaletteOptions['primary'];
    profileBg: string; 
    info: PaletteOptions['primary'];
  }
}