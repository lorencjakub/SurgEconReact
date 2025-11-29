export const genderTranslations = {
  male: 'muž',
  female: 'žena',
} as const;

export type Gender = keyof typeof genderTranslations;

export function translateGender(gender: string): string {
  return genderTranslations[gender as Gender] || gender;
}

export const cancerTypeTranslations = {
  lung: 'plic',
  breast: 'prsu',
  prostate: 'prostaty',
  colon: 'tlustého střeva',
  ovary: 'vaječníků',
  pancreas: 'slinivky',
  bladder: 'močového měchýře',
  kidney: 'ledvin',
  thyroid: 'štítné žlázy',
  leukemia: 'leukémie',
  lymphoma: 'lymfom',
  melanoma: 'melanom',
  other: 'jiný',
} as const;

export type CancerType = keyof typeof cancerTypeTranslations;

export function translateCancerType(cancerType: string): string {
  return cancerTypeTranslations[cancerType as CancerType] || cancerType;
}
