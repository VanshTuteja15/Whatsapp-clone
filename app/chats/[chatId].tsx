import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

interface Message {
  id: string;
  text: string;
  sentByMe: boolean;
  time: string;
}

const chatData: Record<string, { name: string; avatar: string; messages: Message[] }> = {
  '1': {
    name: 'Me India',
    avatar: 'https://i.pravatar.cc/150?img=1',
    messages: [
      { id: 'm1', text: 'cpsy_200_final_project_2024.docx', sentByMe: true,  time: '8:30 PM' },
      { id: 'm2', text: 'Got it, thanks!',                  sentByMe: false, time: '8:32 PM' },
    ],
  },
  '3': {
    name: 'Dilshan Singh SAIT',
    avatar: 'https://i.pravatar.cc/150?img=3',
    messages: [
      { id: 'm1', text: 'Happy birthday 🎂',  sentByMe: false, time: '2:02 AM' },
      { id: 'm2', text: 'Thank you! 🙏',      sentByMe: true,  time: '2:04 AM' },
      { id: 'm3', text: 'Hope you have a great day!', sentByMe: false, time: '2:05 AM' },
      { id: 'm4', text: 'For sure man, appreciate it', sentByMe: true, time: '2:06 AM' },
    ],
  },
  '4': {
    name: 'Mom',
    avatar: 'https://i.pravatar.cc/150?img=4',
    messages: [
      { id: 'm1', text: 'Mera sohana put 😊',          sentByMe: false, time: '10:12 AM' },
      { id: 'm2', text: 'Haha hi mom 😄',               sentByMe: true,  time: '10:13 AM' },
      { id: 'm3', text: 'Kha lia khana?',               sentByMe: false, time: '10:14 AM' },
      { id: 'm4', text: 'Haan mom, don\'t worry!',      sentByMe: true,  time: '10:15 AM' },
      { id: 'm5', text: 'Theek hai, love you beta ❤️',  sentByMe: false, time: '10:16 AM' },
    ],
  },
};

const DEFAULT_CHAT = {
  name: 'Unknown',
  avatar: 'https://i.pravatar.cc/150?img=2',
  messages: [
    { id: 'm1', text: '👋 Hey there!', sentByMe: false, time: 'Just now' },
  ],
};

export default function ChatScreen() {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();
  const { colors } = useTheme();

  const chat = (chatId && chatData[chatId]) ? chatData[chatId] : DEFAULT_CHAT;

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.chatBg }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.icon} />
        </Pressable>

        <Image source={{ uri: chat.avatar }} style={styles.avatar} />

        <View style={styles.titleBox}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>{chat.name}</Text>
          <Text style={[styles.headerSub, { color: colors.textSecondary }]}>tap here for contact info</Text>
        </View>

        <View style={styles.headerIcons}>
          <MaterialCommunityIcons name="video-outline" size={24} color={colors.icon} style={{ marginRight: 16 }} />
          <MaterialCommunityIcons name="phone-outline" size={24} color={colors.icon} />
        </View>
      </View>

      {/* Messages */}
      <ScrollView contentContainerStyle={styles.chatArea}>
        {chat.messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.bubble,
              msg.sentByMe
                ? [styles.myBubble, { backgroundColor: colors.bubble }]
                : [styles.theirBubble, { backgroundColor: colors.surface }],
            ]}
          >
            <Text style={[styles.msgText, { color: colors.text }]}>{msg.text}</Text>
            <Text style={[styles.msgTime, { color: colors.textMuted }]}>{msg.time}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Input bar */}
      <View style={[styles.inputBar, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
        <Pressable>
          <MaterialCommunityIcons name="plus" size={24} color={colors.iconMuted} />
        </Pressable>

        <View style={[styles.textInputWrapper, { backgroundColor: colors.inputBg }]}>
          <TextInput
            placeholder="Message"
            placeholderTextColor={colors.textMuted}
            style={[styles.textInput, { color: colors.text }]}
          />
          <MaterialCommunityIcons name="emoticon-outline" size={22} color={colors.iconMuted} />
        </View>

        <Pressable style={[styles.micButton, { backgroundColor: colors.accent }]}>
          <MaterialCommunityIcons name="microphone" size={22} color="#FFF" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 52,
    paddingBottom: 12,
    paddingHorizontal: 12,
    gap: 10,
    borderBottomWidth: 0.5,
  },
  avatar: { width: 38, height: 38, borderRadius: 19 },
  titleBox: { flex: 1 },
  headerTitle: { fontSize: 16, fontWeight: '700' },
  headerSub: { fontSize: 12, marginTop: 1 },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  chatArea: { padding: 12, paddingBottom: 16 },
  bubble: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    maxWidth: '75%',
  },
  myBubble: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 2,
  },
  theirBubble: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 2,
  },
  msgText: { fontSize: 15, lineHeight: 21 },
  msgTime: { fontSize: 10, alignSelf: 'flex-end', marginTop: 4 },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 0.5,
    gap: 8,
  },
  textInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
  },
  micButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
