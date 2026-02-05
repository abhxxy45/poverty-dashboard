
export type AreaType = 'Urban' | 'Rural';

export interface PovertyData {
  State: string;
  Year: number;
  Area_Type: AreaType;
  Poverty_Rate: number;
  Population: number;
}

export enum Section {
  Overview = 'overview-section',
  YearlyTrend = 'trend-section',
  UrbanAnalysis = 'urban-section',
  RuralAnalysis = 'rural-section',
  Comparison = 'comparison-section',
  Stats = 'stats-section',
  Findings = 'findings-section',
  Preview = 'preview-section'
}
