import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  avatar: string;
}

const COMMUNITIES: Community[] = [
  {
    id: '1',
    name: 'SAIT Students 2025',
    description: 'Official SAIT student community for updates and resources.',
    members: 4200,
    avatar: 'https://i.pravatar.cc/150?img=20',
  },
  {
    id: '2',
    name: 'CPSY Dev Team',
    description: 'Discuss assignments, share code, and collaborate.',
    members: 38,
    avatar: 'https://i.pravatar.cc/150?img=21',
  },
  {
    id: '3',
    name: 'Calgary Tech Hub',
    description: 'Events, networking, and tech news in Calgary.',
    members: 890,
    avatar: 'https://i.pravatar.cc/150?img=22',
  },
  {
    id: '4',
    name: 'Foodies YYC',
    description: 'Best restaurants and food spots in Calgary.',
    members: 1340,
    avatar: 'https://i.pravatar.cc/150?img=23',
  },
];

export default function CommunityScreen() {
  const { colors } = useTheme();

  const renderItem = ({ item }: { item: Community }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
      activeOpacity={0.75}
    >
      <Image source={{ uri: item.avatar }} style={styles.communityAvatar} />
      <View style={styles.cardContent}>
        <Text style={[styles.communityName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.communityDesc, { color: colors.textSecondary }]} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.membersRow}>
          <MaterialCommunityIcons name="account-multiple" size={14} color={colors.iconMuted} />
          <Text style={[styles.membersText, { color: colors.iconMuted }]}>
            {' '}{item.members.toLocaleString()} members
          </Text>
        </View>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={20} color={colors.iconMuted} />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Communities</Text>
        <MaterialCommunityIcons name="dots-vertical" size={22} color={colors.icon} />
      </View>

      {/* Hero banner */}
      <View style={[styles.heroBanner, { backgroundColor: colors.accentLight }]}>
        <MaterialCommunityIcons name="account-group" size={48} color={colors.primary} />
        <Text style={[styles.heroTitle, { color: colors.text }]}>Stay connected</Text>
        <Text style={[styles.heroSub, { color: colors.textSecondary }]}>
          Communities bring together multiple groups under one space.
        </Text>
        <TouchableOpacity style={[styles.createBtn, { backgroundColor: colors.accent }]}>
          <Text style={styles.createBtnText}>New community</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Your communities</Text>
      <FlatList
        data={COMMUNITIES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 52,
    paddingBottom: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
  },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  heroBanner: {
    alignItems: 'center',
    padding: 24,
    margin: 16,
    borderRadius: 16,
  },
  heroTitle: { fontSize: 20, fontWeight: '700', marginTop: 10 },
  heroSub: { fontSize: 14, textAlign: 'center', marginTop: 6, marginBottom: 16, lineHeight: 20 },
  createBtn: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
  },
  createBtnText: { color: '#FFF', fontWeight: '700', fontSize: 15 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  list: { paddingHorizontal: 16, paddingBottom: 24 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 12,
  },
  communityAvatar: { width: 52, height: 52, borderRadius: 26 },
  cardContent: { flex: 1, marginHorizontal: 12 },
  communityName: { fontSize: 16, fontWeight: '600' },
  communityDesc: { fontSize: 13, marginTop: 3, lineHeight: 18 },
  membersRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  membersText: { fontSize: 12 },
});
