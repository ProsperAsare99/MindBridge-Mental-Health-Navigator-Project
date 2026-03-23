'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios-config';
import { useAuth } from './use-auth';

export function useMoodTheme() {
  const { user, loading } = useAuth();
  const [pulse, setPulse] = useState<any>(null);

  useEffect(() => {
    const fetchMoodPulse = async () => {
      if (loading || !user) return;
      
      try {
        const response = await api.get('/moods/stats');
        const stats = response.data;
        applyTheme(stats.average, stats.trend);
        setPulse(stats);
      } catch (error) {
        console.error('Failed to fetch mood pulse for theme:', error);
      }
    };

    fetchMoodPulse();
  }, [user, loading]);

  const applyTheme = (avg: number, trend: string) => {
    const root = document.documentElement;
    
    // Default (Stable/Positive) - Ocean Blue
    let primary = '#0077b6'; 
    let secondary = '#d5bdaf'; // Almond Silk
    let bgGradient = 'linear-gradient(to bottom right, rgba(0, 119, 182, 0.08), rgba(213, 189, 175, 0.05))';

    if (avg < 2.5 || trend === 'DECLINING') {
      // supportive (Vibrant Blue)
      primary = '#00b4d8'; 
      bgGradient = 'linear-gradient(to bottom right, rgba(0, 180, 216, 0.1), rgba(0, 180, 216, 0.05))';
    } else if (avg < 3.5) {
      // Balanced (Soft Blue)
      primary = '#48cae4';
      bgGradient = 'linear-gradient(to bottom right, rgba(72, 202, 228, 0.08), rgba(72, 202, 228, 0.03))';
    }

    root.style.setProperty('--primary', primary);
    root.style.setProperty('--secondary', secondary);
    root.style.setProperty('--dashboard-bg-gradient', bgGradient);
  };

  return pulse;
}
