import React, { useState, useEffect, useCallback } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../services/api';

export default function DashboardScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({ average: 0, count: 0 });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) setUser(JSON.parse(userData));

      const [statsRes, activityRes] = await Promise.all([
        api.get('/moods/stats'),
        api.get('/analytics/activity-feed')
      ]);

      setStats(statsRes.data);
      setActivities(activityRes.data);
    } catch (error) {
      console.error('Fetch Error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const logout = async () => {
    await AsyncStorage.clear();
    navigation.replace('Login');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8b5cf6" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Hello,</Text>
          <Text style={styles.nameText}>{user?.name || 'User'}</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#8b5cf6" />}
      >
        {/* Stats Row */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>{stats.average}</Text>
            <Text style={styles.statLabel}>Avg Mood</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>{stats.count}</Text>
            <Text style={styles.statLabel}>Logs</Text>
          </View>
        </View>

        {/* Activity Feed */}
        <Text style={styles.sectionTitle}>Recent Journey</Text>
        {activities.map((item, index) => (
          <View key={index} style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <Text style={styles.activityType}>{item.type}</Text>
              <Text style={styles.activityDate}>
                {new Date(item.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
              </Text>
            </View>
            <Text style={styles.activityTitle}>{item.title}</Text>
            {item.description && <Text style={styles.activityDesc}>{item.description}</Text>}
          </View>
        ))}

        {activities.length === 0 && (
          <Text style={styles.emptyText}>Your journey starts here. Log your first mood to see it in your history!</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  welcomeText: {
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: '600',
  },
  nameText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
  },
  logoutBtn: {
    padding: 8,
  },
  logoutText: {
    color: '#f43f5e',
    fontWeight: '700',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  scrollContent: {
    padding: 25,
    paddingTop: 0,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  statVal: {
    color: '#8b5cf6',
    fontSize: 24,
    fontWeight: '800',
  },
  statLabel: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
    textTransform: 'uppercase',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  activityCard: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#8b5cf6',
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  activityType: {
    color: '#8b5cf6',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  activityDate: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '700',
  },
  activityTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  activityDesc: {
    color: '#94a3b8',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
  },
  emptyText: {
    color: '#64748b',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
  },
});
