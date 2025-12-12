export enum AgeRange {
  THREE_TO_FIVE = 'THREE_TO_FIVE',
  SIX_TO_EIGHT = 'SIX_TO_EIGHT',
  NINE_TO_TWELVE = 'NINE_TO_TWELVE'
  
}

export function ageRangeLabel(value: AgeRange): string {
  switch (value) {
    case AgeRange.THREE_TO_FIVE:
      return '3–5 anos';
    case AgeRange.SIX_TO_EIGHT:
      return '6–8 anos';
    case AgeRange.NINE_TO_TWELVE:
      return '9–12 anos';
    default:
      return value;
  }
}