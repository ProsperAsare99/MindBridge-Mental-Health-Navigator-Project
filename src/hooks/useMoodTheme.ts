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
    
    // Default (Stable/Positive) - Antique Gold
    let primary = '#c5a059'; 
    let secondary = '#d5bdaf'; // Almond Silk
    let bgGradient = 'linear-gradient(to bottom right, rgba(197, 160, 89, 0.08), rgba(213, 189, 175, 0.05))';

    if (avg < 2.5 || trend === 'DECLINING') {
      // supportive (Warmer/Deeper Gold)
      primary = '#ae9164'; 
      bgGradient = 'linear-gradient(to bottom right, rgba(174, 145, 100, 0.1), rgba(174, 145, 100, 0.05))';
    } else if (avg < 3.5) {
      // Balanced (Muted Gold-Sage)
      primary = '#9ba08d';
      bgGradient = 'linear-gradient(to bottom right, rgba(155, 160, 141, 0.08), rgba(155, 160, 141, 0.03))';
    }

    root.style.setProperty('--primary', primary);
    root.style.setProperty('--secondary', secondary);
    root.style.setProperty('--dashboard-bg-gradient', bgGradient);
  };

  return pulse;
}
