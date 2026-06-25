import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

interface CallRecord {
  id: string;
  name: string;
  type: 'Outgoing' | 'Incoming' | 'Missed';
  time: string;
  avatar: string;
}

const CALLS: CallRecord[] = [
  { id: '1', name: 'Mom',       type: 'Outgoing', time: '11:00 PM',  avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: '2', name: 'Papa',      type: 'Incoming', time: '1:15 AM',   avatar: 'https://i.pravatar.cc/150?img=7' },
  { id: '3', name: 'Rishav',    type: 'Missed',   time: '1:01 AM',   avatar: 'https://i.pravatar.cc/150?img=8' },
  { id: '4', name: 'Franklin',  type: 'Outgoing', time: 'Yesterday', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: '5', name: 'Michael',   type: 'Incoming', time: 'Yesterday', avatar: 'https://i.pravatar.cc/150?img=9' },
  { id: '6', name: 'Work',      type: 'Missed',   time: '2 days ago',avatar: 'https://i.pravatar.cc/150?img=6' },
  { id: '7', name: 'Bhupinder', type: 'Outgoing', time: '2 days ago',avatar: 'https://i.pravatar.cc/150?img=10'},
];

type ActionItem = {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  label: string;
};

const ACTIONS: ActionItem[] = [
  { icon: 'phone-outline',    label: 'Call'       },
  { icon: 'calendar-outline', label: 'Schedule'   },
  { icon: 'dialpad',          label: 'Keypad'     },
  { icon: 'heart-outline',    label: 'Favourites' },
];

export default function CallsScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top bar */}
      <View style={[styles.topBar, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <MaterialCommunityIcons name="dots-horizontal" size={22} color={colors.icon} />
        <Text style={[styles.title, { color: colors.text }]}>Calls</Text>
        <TouchableOpacity style={[styles.plusBtn, { backgroundColor: colors.accent }]}>
          <MaterialCommunityIcons name="plus" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Quick-action row */}
      <View style={[styles.actionsRow, { backgroundColor: colors.surface }]}>
        {ACTIONS.map(({ icon, label }) => (
          <TouchableOpacity key={label} style={styles.actionItem} activeOpacity={0.7}>
            <View style={[styles.actionCircle, { backgroundColor: colors.accentLight }]}>
              <MaterialCommunityIcons name={icon} size={22} color={colors.primary} />
            </View>
            <Text style={[styles.actionLabel, { color: colors.textSecondary }]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Section title */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent</Text>

      <FlatList
        data={CALLS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.row, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />

            <View style={styles.middle}>
              <Text style={[styles.name, item.type === 'Missed' && { color: colors.missed }, { color: item.type === 'Missed' ? colors.missed : colors.text }]}>
                {item.name}
              </Text>
              <View style={styles.subRow}>
                <MaterialCommunityIcons
                  name={
                    item.type === 'Outgoing'
                      ? 'arrow-top-right'
                      : item.type === 'Incoming'
                      ? 'arrow-bottom-left'
                      : 'phone-missed'
                  }
                  size={15}
                  color={item.type === 'Missed' ? colors.missed : colors.iconMuted}
                />
                <Text style={[styles.subText, { color: colors.textSecondary }]}> {item.type}</Text>
              </View>
            </View>

            <View style={styles.right}>
              <Text style={[styles.time, { color: colors.textSecondary }]}>{item.time}</Text>
              <MaterialCommunityIcons name="information-outline" size={18} color={colors.primary} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 52,
    paddingBottom: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
  },
  title: { fontSize: 20, fontWeight: '700' },
  plusBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
  },
  actionItem: { alignItems: 'center' },
  actionCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  actionLabel: { fontSize: 12 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
  },
  avatar: { width: 46, height: 46, borderRadius: 23 },
  middle: { flex: 1, marginLeft: 12 },
  name: { fontSize: 16, fontWeight: '600' },
  subRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  subText: { fontSize: 13 },
  right: { alignItems: 'flex-end' },
  time: { fontSize: 12, marginBottom: 6 },
});
