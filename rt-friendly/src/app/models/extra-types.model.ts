export enum ExtraType {
  ShortText = 'text',
  LongText = 'textarea',
  Date = 'datetime',
  Number = 'number',
  Choice = 'choice',
  Options = 'tags',
  Boolean = 'boolean',
}

export interface ExtraInfo {
  key: string;
  label: string;
  type: ExtraType;
  value: any;
  format: string;
  options: string[];
}
