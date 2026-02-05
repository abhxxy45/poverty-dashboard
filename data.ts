
import { PovertyData } from './types';

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
].sort();

export const generateData = (): PovertyData[] => {
  const years = Array.from({ length: 11 }, (_, i) => 2015 + i);
  const data: PovertyData[] = [];

  // Grouped profiles to provide realistic synthetic starting points and improvement rates
  const profiles: Record<string, { uStart: number, rStart: number, improvement: number }> = {
    // Low Poverty / High HDI States
    'Kerala': { uStart: 5.2, rStart: 8.1, improvement: 0.6 },
    'Goa': { uStart: 4.8, rStart: 7.2, improvement: 0.5 },
    'Sikkim': { uStart: 6.1, rStart: 10.4, improvement: 0.7 },
    'Tamil Nadu': { uStart: 10.2, rStart: 16.5, improvement: 0.9 },
    'Himachal Pradesh': { uStart: 8.5, rStart: 12.4, improvement: 0.8 },
    
    // High Poverty / High Improvement States
    'Bihar': { uStart: 30.1, rStart: 46.2, improvement: 1.4 },
    'Jharkhand': { uStart: 28.4, rStart: 42.1, improvement: 1.3 },
    'Uttar Pradesh': { uStart: 26.5, rStart: 39.8, improvement: 1.2 },
    'Odisha': { uStart: 24.1, rStart: 38.2, improvement: 1.25 },
    'Chhattisgarh': { uStart: 25.4, rStart: 40.5, improvement: 1.15 },
    'Madhya Pradesh': { uStart: 22.8, rStart: 35.6, improvement: 1.1 },

    // Middle Tier / Industrial States
    'Maharashtra': { uStart: 14.5, rStart: 24.8, improvement: 1.0 },
    'Gujarat': { uStart: 13.8, rStart: 22.4, improvement: 0.95 },
    'Karnataka': { uStart: 15.2, rStart: 23.1, improvement: 1.0 },
    'Andhra Pradesh': { uStart: 14.1, rStart: 21.5, improvement: 0.9 },
    'Telangana': { uStart: 13.5, rStart: 20.8, improvement: 0.92 },
    'Punjab': { uStart: 10.8, rStart: 15.4, improvement: 0.8 },
    'Haryana': { uStart: 11.2, rStart: 16.9, improvement: 0.85 },
    'West Bengal': { uStart: 18.4, rStart: 28.5, improvement: 1.1 },
    'Rajasthan': { uStart: 17.5, rStart: 27.2, improvement: 1.05 },
    
    // Default / North-East / Others
    'Default': { uStart: 16.0, rStart: 25.0, improvement: 1.0 }
  };

  INDIAN_STATES.forEach(state => {
    const profile = profiles[state] || profiles['Default'];
    
    years.forEach((year, i) => {
      // Logic: Consistent year-on-year reduction
      // 2020 saw a slight regression due to pandemic impact
      const covidImpact = year === 2020 ? 1.8 : (year === 2021 ? 0.7 : 0);
      const recoverySpeed = year > 2021 ? 0.2 : 0; // Slightly faster reduction after recovery
      
      const yearlyDecline = i * (profile.improvement + recoverySpeed);
      
      // Calculate rates with slight randomness for realistic fluctuations
      const urbanRate = Math.max(1.8, profile.uStart - yearlyDecline + covidImpact + (Math.random() * 0.4));
      const ruralRate = Math.max(3.5, profile.rStart - (yearlyDecline * 1.1) + covidImpact + (Math.random() * 0.6));
      
      // Population logic based on state size (simulated)
      const basePop = state.length * 5; // Deterministic random-like base
      const growth = 1 + (i * 0.015);
      
      data.push({
        State: state,
        Year: year,
        Area_Type: 'Urban',
        Poverty_Rate: parseFloat(urbanRate.toFixed(2)),
        Population: Math.floor(basePop * growth)
      });
      
      data.push({
        State: state,
        Year: year,
        Area_Type: 'Rural',
        Poverty_Rate: parseFloat(ruralRate.toFixed(2)),
        Population: Math.floor(basePop * 1.5 * growth)
      });
    });
  });

  return data;
};

export const POVERTY_DATASET = generateData();
