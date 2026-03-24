import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Dimensions,
  Modal,
  FlatList
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

const { height } = Dimensions.get('window');

const INSTITUTIONS = [
  "University of Ghana",
  "Kwame Nkrumah University of Science and Technology (KNUST)",
  "University of Cape Coast (UCC)",
  "University of Education, Winneba (UEW)",
  "University for Development Studies (UDS)",
  "Ashesi University",
  "Ghana Institute of Management and Public Administration (GIMPA)",
  "University of Professional Studies, Accra (UPSA)",
  "Valley View University",
  "Central University",
  "University of Health and Allied Sciences (UHAS)",
  "University of Mines and Technology (UMaT)",
  "Ghana Communication Technology University (GCTU)",
  "Academic City University College",
  "Lancaster University Ghana",
  "Pentecost University",
  "Methodist University Ghana",
  "Presbyterian University, Ghana",
  "All Nations University",
  "Wisconsin International University College, Ghana",
  "BlueCrest University College",
  "Webster University Ghana",
  "Radford University College",
  "Mountcrest University College",
  "Other"
];

export default function SignUpScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    institution: '',
    studentId: '',
    course: '',
    otherInstitution: ''
  });
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInstitutions = INSTITUTIONS.filter(inst => 
    inst.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSignUp = async () => {
    const { name, email, password, phoneNumber, institution } = formData;
    
    if (!name || !email || !password || !phoneNumber || !institution) {
      Alert.alert('Error', 'Please fill in all required fields (Name, Email, Password, Phone, Institution)');
      return;
    }

    if (institution === 'Other' && !formData.otherInstitution) {
      Alert.alert('Error', 'Please enter your institution name');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        institution: institution === 'Other' ? formData.otherInstitution : institution
      };
      const response = await api.post('/auth/register', payload);
      const { token, user } = response.data;

      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(user));

      Alert.alert('Success', 'Welcome to MindBridge!', [
        { text: 'OK', onPress: () => navigation.replace('Dashboard') }
      ]);
    } catch (error) {
      console.error('SignUp Error:', error);
      const message = error.response?.data?.error || 'Registration failed. Please check your details.';
      Alert.alert('Registration Failed', message);
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectInstitution = (inst) => {
    updateField('institution', inst);
    setModalVisible(false);
    setSearchQuery('');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image 
            source={require('../../assets/logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Join MindBridge</Text>
          <Text style={styles.subtitle}>Your Mind, Understood</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Prosper Asare"
              placeholderTextColor="#94a3b8"
              value={formData.name}
              onChangeText={(v) => updateField('name', v)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address *</Text>
            <TextInput
              style={styles.input}
              placeholder="name@university.edu"
              placeholderTextColor="#94a3b8"
              value={formData.email}
              onChangeText={(v) => updateField('email', v)}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={styles.input}
              placeholder="+233 123 456 789"
              placeholderTextColor="#94a3b8"
              value={formData.phoneNumber}
              onChangeText={(v) => updateField('phoneNumber', v)}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password *</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#94a3b8"
              value={formData.password}
              onChangeText={(v) => updateField('password', v)}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Institution *</Text>
            <TouchableOpacity 
              style={styles.input} 
              onPress={() => setModalVisible(true)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.inputText, 
                !formData.institution && { color: '#94a3b8' }
              ]}>
                {formData.institution || "Select Your Institution"}
              </Text>
            </TouchableOpacity>
          </View>

          {formData.institution === 'Other' && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Other Institution Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your school name"
                placeholderTextColor="#94a3b8"
                value={formData.otherInstitution}
                onChangeText={(v) => updateField('otherInstitution', v)}
              />
            </View>
          )}

          <View style={styles.row}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Student ID</Text>
              <TextInput
                style={styles.input}
                placeholder="20XXXXXX"
                placeholderTextColor="#94a3b8"
                value={formData.studentId}
                onChangeText={(v) => updateField('studentId', v)}
              />
            </View>
            <View style={[styles.inputContainer, { flex: 1.5 }]}>
              <Text style={styles.label}>Program / Course</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Computer Science"
                placeholderTextColor="#94a3b8"
                value={formData.course}
                onChangeText={(v) => updateField('course', v)}
              />
            </View>
          </View>

          <TouchableOpacity 
            style={styles.button}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Create Account</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Already have an account? <Text style={styles.linkHighlight}>Sign In</Text></Text>
          </TouchableOpacity>
        </View>

        {/* Institution Selection Modal */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select University</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeText}>Cancel</Text>
                </TouchableOpacity>
              </View>
              
              <TextInput
                style={styles.searchBar}
                placeholder="Search schools..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#94a3b8"
                autoFocus={Platform.OS === 'ios'}
              />

              <FlatList
                data={filteredInstitutions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={styles.instOption}
                    onPress={() => selectInstitution(item)}
                  >
                    <Text style={styles.instText}>{item}</Text>
                  </TouchableOpacity>
                )}
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfcf9',
  },
  scrollContent: {
    padding: 30,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1b263b',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 12,
    color: '#8a7e72',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginTop: 4,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1b263b',
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 14,
    color: '#1b263b',
    fontSize: 15,
    borderWidth: 1.5,
    borderColor: '#e3d9cf',
    justifyContent: 'center',
  },
  inputText: {
    fontSize: 15,
    color: '#1b263b',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#0077b6',
    borderRadius: 15,
    padding: 18,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#0077b6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#8a7e72',
    fontSize: 14,
    fontWeight: '600',
  },
  linkHighlight: {
    color: '#0077b6',
    fontWeight: '800',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(27, 38, 59, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: height * 0.75,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1b263b',
  },
  closeText: {
    color: '#0077b6',
    fontWeight: '800',
    fontSize: 14,
  },
  searchBar: {
    backgroundColor: '#f1f5f9',
    borderRadius: 15,
    padding: 14,
    marginBottom: 20,
    fontSize: 15,
    color: '#1b263b',
    fontWeight: '600',
  },
  instOption: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  instText: {
    fontSize: 15,
    color: '#1b263b',
    fontWeight: '600',
  },
});
