const fs = require('fs');
const p = 'src/components/layout/Header.jsx';
let s = fs.readFileSync(p, 'utf8');
const rep = [
  ['ï¿½import', 'import'],
  ['Ã§', 'ç'],
  ['Ã£', 'ã'],
  ['Ã¡', 'á'],
  ['Ã©', 'é'],
  ['Ãª', 'ê'],
  ['Ãº', 'ú'],
  ['Ãµ', 'õ'],
  ['Ã³', 'ó'],
  ['Ã­', 'í'],
  ['Ã‰', 'É'],
  ['Ã“', 'Ó'],
  ['Ã‡', 'Ç'],
  ['Ã¢', 'â'],
  ['Ã´', 'ô'],
  ['â†’', '→'],
  ['� \u0019', '→']
];
for (const [a, b] of rep) {
  s = s.split(a).join(b);
}
fs.writeFileSync(p, s, 'utf8');
