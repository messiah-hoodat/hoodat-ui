interface NumberToStringsMap {
  [key: number]: string[];
}

const COLOR_MAP: NumberToStringsMap = {
  0: ['#FFFFCC', '#FFFF00'],
  1: ['#FFE2AB', '#FFBC7C'],
  2: ['#FFD9DE', '#E99BA6'],
  3: ['#B3A7FF', '#f3b6c9'],
  4: ['#FFB4E1', '#E16AFF'],
  5: ['#DCF8EF', '#FEE2F8'],
  6: ['#A7FFB0', '#A7ECFF'],
  7: ['#A7F4FF', '#A7AEFF'],
};

const DEFAULT_COLOR = ['#F894A4', '#F9D1B7'];

export default function getListColors(i: number): string[] {
  return COLOR_MAP[i] ?? DEFAULT_COLOR;
}
