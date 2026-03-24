import React, { useState, useEffect, useCallback } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../services/api';

const { width } = Dimensions.get('window');

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
        <ActivityIndicator size="large" color="#0077b6" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.nameText}>{user?.name || 'User'}</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#0077b6" />}
      >
        {/* Stats Row */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>{stats.average}</Text>
            <Text style={styles.statLabel}>Avg Mood</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>{stats.count}</Text>
            <Text style={styles.statLabel}>Total logs</Text>
          </View>
        </View>

        {/* Activity Feed */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Journey</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {activities.map((item, index) => (
          <View key={index} style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <View style={styles.typeTag}>
                <Text style={styles.activityType}>{item.type}</Text>
              </View>
              <Text style={styles.activityDate}>
                {new Date(item.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
              </Text>
            </View>
            <Text style={styles.activityTitle}>{item.title}</Text>
            {item.description && <Text style={styles.activityDesc}>{item.description}</Text>}
          </View>
        ))}

        {activities.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your journey starts here. Log your first mood to see it in your history!</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfcf9', // Official Soft Ivory
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#fdfcf9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 20,
    backgroundColor: '#fdfcf9',
  },
  welcomeText: {
    color: '#8a7e72', // Taupe
    fontSize: 14,
    fontWeight: '600',
  },
  nameText: {
    color: '#1b263b', // Deep Navy
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  logoutBtn: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e3d9cf',
  },
  logoutText: {
    color: '#1b263b',
    fontWeight: '700',
    fontSize: 11,
    textTransform: 'uppercase',
  },
  scrollContent: {
    padding: 25,
    paddingTop: 10,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 35,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#e3d9cf',
    shadowColor: '#1b263b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  statVal: {
    color: '#0077b6', // Ocean Blue
    fontSize: 28,
    fontWeight: '900',
  },
  statLabel: {
    color: '#8a7e72',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#1b263b',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  viewAllText: {
    color: '#0077b6',
    fontSize: 14,
    fontWeight: '700',
  },
  activityCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#e3d9cf',
    shadowColor: '#1b263b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  typeTag: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  activityType: {
    color: '#0077b6',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  activityDate: {
    color: '#8a7e72',
    fontSize: 11,
    fontWeight: '700',
  },
  activityTitle: {
    color: '#1b263b',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 4,
  },
  activityDesc: {
    color: '#1b263b',
    opacity: 0.7,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#8a7e72',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '500',
    fontStyle: 'italic',
  },
});
