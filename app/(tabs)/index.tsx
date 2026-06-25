import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

interface Chat {
  id: string;
  name: string;
  message: string;
  time: string;
  unread: number;
  image: string;
  pinned?: boolean;
}

const CHATS: Chat[] = [
  {
    id: '1',
    name: 'Me India',
    message: 'cpsy_200_final_project_2024.docx',
    time: 'Nov 20',
    unread: 0,
    image: 'https://i.pravatar.cc/150?img=1',
    pinned: true,
  },
  {
    id: '2',
    name: '+1 (825) 882-6885',
    message: '📷 Photo',
    time: 'Yesterday',
    unread: 0,
    image: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    name: 'Dilshan Singh SAIT',
    message: 'Thank You 🎂',
    time: '2:04 AM',
    unread: 0,
    image: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: '4',
    name: 'Mom',
    message: 'Mera sohana put',
    time: '10:16 AM',
    unread: 4,
    image: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: '5',
    name: 'Franklin',
    message: 'Are you coming tonight?',
    time: '9:30 AM',
    unread: 1,
    image: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: '6',
    name: 'Work Group',
    message: 'Michael: Meeting rescheduled to 3 PM',
    time: '8:00 AM',
    unread: 7,
    image: 'https://i.pravatar.cc/150?img=6',
  },
];

export default function ChatsScreen() {
  const { colors } = useTheme();

  const renderItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity
      style={[styles.chatItem, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}
      onPress={() =>
        router.push({ pathname: '/chats/[chatId]', params: { chatId: item.id } })
      }
      activeOpacity={0.7}
    >
      <View>
        <Image source={{ uri: item.image }} style={styles.avatar} />
        <View style={[styles.onlineDot, { borderColor: colors.surface }]} />
      </View>

      <View style={styles.chatContent}>
        <View style={styles.topRow}>
          <View style={styles.nameRow}>
            {item.pinned && (
              <MaterialCommunityIcons name="pin" size={14} color={colors.textSecondary} style={styles.pinIcon} />
            )}
            <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
          </View>
          <Text style={[styles.time, { color: item.unread > 0 ? colors.accent : colors.textSecondary }]}>
            {item.time}
          </Text>
        </View>

        <View style={styles.bottomRow}>
          <Text style={[styles.message, { color: colors.textSecondary }]} numberOfLines={1}>
            {item.message}
          </Text>

          {item.unread > 0 && (
            <View style={[styles.unreadBadge, { backgroundColor: colors.badge }]}>
              <Text style={[styles.unreadText, { color: colors.badgeText }]}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.headerBar, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Text style={[styles.header, { color: colors.text }]}>Chats</Text>
        <View style={styles.headerActions}>
          <MaterialCommunityIcons name="camera-outline" size={22} color={colors.icon} style={styles.headerIcon} />
          <MaterialCommunityIcons name="magnify" size={22} color={colors.icon} style={styles.headerIcon} />
        </View>
      </View>

      <FlatList
        data={CHATS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Button */}
      <TouchableOpacity style={[styles.fab, { backgroundColor: colors.accent }]} activeOpacity={0.8}>
        <MaterialCommunityIcons name="chat-plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 52,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 18,
  },
  chatItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    alignItems: 'center',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 1,
    right: 14,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#25D366',
    borderWidth: 2,
  },
  chatContent: {
    flex: 1,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pinIcon: {
    marginRight: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  time: {
    fontSize: 12,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {
    fontSize: 14,
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 22,
    alignItems: 'center',
  },
  unreadText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
