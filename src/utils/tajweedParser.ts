interface TajweedRule {
  identifier: string;
  color: string;
  cssClass: string;
  description: string;
}

const tajweedRules: Record<string, TajweedRule> = {
  'h': { identifier: 'hamza-wasl', color: '#AAAAAA', cssClass: 'ham_wasl', description: 'Hamzat ul Wasl' },
  's': { identifier: 'silent', color: '#AAAAAA', cssClass: 'slnt', description: 'Silent' },
  'l': { identifier: 'laam-shamsiyah', color: '#AAAAAA', cssClass: 'slnt', description: 'Lam Shamsiyyah' },
  'n': { identifier: 'madda-normal', color: '#537FFF', cssClass: 'madda_normal', description: 'Normal Prolongation: 2 Vowels' },
  'p': { identifier: 'madda-permissible', color: '#4050FF', cssClass: 'madda_permissible', description: 'Permissible Prolongation: 2, 4, 6 Vowels' },
  'm': { identifier: 'madda-necessary', color: '#000EBC', cssClass: 'madda_necessary', description: 'Necessary Prolongation: 6 Vowels' },
  'q': { identifier: 'qalaqah', color: '#DD0008', cssClass: 'qlq', description: 'Qalqalah' },
  'o': { identifier: 'madda-obligatory', color: '#2144C1', cssClass: 'madda_obligatory', description: 'Obligatory Prolongation: 4-5 Vowels' },
  'c': { identifier: 'ikhafa-shafawi', color: '#D500B7', cssClass: 'ikhf_shfw', description: "Ikhafa' Shafawi - With Meem" },
  'f': { identifier: 'ikhafa', color: '#9400A8', cssClass: 'ikhf', description: "Ikhafa'" },
  'w': { identifier: 'idgham-shafawi', color: '#58B800', cssClass: 'idghm_shfw', description: 'Idgham Shafawi - With Meem' },
  'i': { identifier: 'iqlab', color: '#26BFFD', cssClass: 'iqlb', description: 'Iqlab' },
  'a': { identifier: 'idgham-with-ghunnah', color: '#169777', cssClass: 'idgh_ghn', description: 'Idgham - With Ghunnah' },
  'u': { identifier: 'idgham-without-ghunnah', color: '#169200', cssClass: 'idgh_w_ghn', description: 'Idgham - Without Ghunnah' },
  'd': { identifier: 'idgham-mutajanisayn', color: '#A1A1A1', cssClass: 'idgh_mus', description: 'Idgham - Mutajanisayn' },
  'b': { identifier: 'idgham-mutaqaribayn', color: '#A1A1A1', cssClass: 'idgh_mut', description: 'Idgham - Mutaqaribayn' },
  'g': { identifier: 'ghunnah', color: '#FF7E1E', cssClass: 'ghn', description: 'Ghunnah: 2 Vowels' }
};

export const parseTajweed = (text: string): string => {
  let result = text;
  const regex = /\[([\w]):(\d+)\[([\s\S]+?)\]/g;

  result = result.replace(regex, (match, ruleKey, tajweedNumber, content) => {
    const rule = tajweedRules[ruleKey];
    if (!rule) return content;

    return `<span class="tajweed ${rule.cssClass}" 
      data-type="${rule.identifier}"
      data-description="${rule.description}"
      data-number="${tajweedNumber}"
      style="color: ${rule.color}">${content}</span>`;
  });

  return result;
};

export const getTajweedRules = () => Object.values(tajweedRules);