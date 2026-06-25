import VanshImage from "@/assets/images/Vansh_Tuteja.jpg";
import { useTheme } from "@/context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface StatusItem {
  id: string;
  name: string;
  time: string;
  viewed: boolean;
  avatar: string;
}

const STATUSES: StatusItem[] = [
  {
    id: "1",
    name: "Dilshan Singh",
    time: "10 minutes ago",
    viewed: false,
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: "2",
    name: "Franklin",
    time: "25 minutes ago",
    viewed: false,
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: "3",
    name: "Mom",
    time: "1 hour ago",
    viewed: true,
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: "4",
    name: "Rishav",
    time: "2 hours ago",
    viewed: true,
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: "5",
    name: "Bhupinder",
    time: "4 hours ago",
    viewed: true,
    avatar: "https://i.pravatar.cc/150?img=10",
  },
];

export default function StatusScreen() {
  const { colors } = useTheme();

  const recent = STATUSES.filter((s) => !s.viewed);
  const viewed = STATUSES.filter((s) => s.viewed);

  const renderStatus = ({ item }: { item: StatusItem }) => (
    <TouchableOpacity
      style={[
        styles.statusRow,
        { backgroundColor: colors.surface, borderBottomColor: colors.border },
      ]}
      activeOpacity={0.7}
    >
      {/* Ring around avatar */}
      <View
        style={[
          styles.avatarRing,
          { borderColor: item.viewed ? colors.border : colors.accent },
        ]}
      >
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
      </View>

      <View style={styles.statusInfo}>
        <Text style={[styles.statusName, { color: colors.text }]}>
          {item.name}
        </Text>
        <Text style={[styles.statusTime, { color: colors.textSecondary }]}>
          {item.time}
        </Text>
      </View>

      <MaterialCommunityIcons
        name="dots-vertical"
        size={20}
        color={colors.iconMuted}
      />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: colors.surface, borderBottomColor: colors.border },
        ]}
      >
        <Text style={[styles.headerTitle, { color: colors.text }]}>Status</Text>
        <View style={styles.headerIcons}>
          <MaterialCommunityIcons
            name="magnify"
            size={22}
            color={colors.icon}
            style={styles.headerIcon}
          />
          <MaterialCommunityIcons
            name="dots-vertical"
            size={22}
            color={colors.icon}
          />
        </View>
      </View>

      <ScrollView>
        {/* My Status */}
        <TouchableOpacity
          style={[
            styles.myStatus,
            {
              backgroundColor: colors.surface,
              borderBottomColor: colors.border,
            },
          ]}
          activeOpacity={0.7}
        >
          <View style={styles.myAvatarWrapper}>
            <Image source={VanshImage} style={styles.avatar} />
            <View style={[styles.addDot, { backgroundColor: colors.accent }]}>
              <MaterialCommunityIcons name="plus" size={12} color="#FFF" />
            </View>
          </View>
          <View style={styles.statusInfo}>
            <Text style={[styles.statusName, { color: colors.text }]}>
              My Status
            </Text>
            <Text style={[styles.statusTime, { color: colors.textSecondary }]}>
              Tap to add status update
            </Text>
          </View>
          <MaterialCommunityIcons
            name="camera-outline"
            size={22}
            color={colors.iconMuted}
            style={{ marginRight: 10 }}
          />
          <MaterialCommunityIcons
            name="pencil-outline"
            size={22}
            color={colors.iconMuted}
          />
        </TouchableOpacity>

        {/* Recent */}
        {recent.length > 0 && (
          <>
            <Text
              style={[styles.sectionTitle, { color: colors.textSecondary }]}
            >
              Recent updates
            </Text>
            <FlatList
              data={recent}
              keyExtractor={(item) => item.id}
              renderItem={renderStatus}
              scrollEnabled={false}
            />
          </>
        )}

        {/* Viewed */}
        {viewed.length > 0 && (
          <>
            <Text
              style={[styles.sectionTitle, { color: colors.textSecondary }]}
            >
              Viewed updates
            </Text>
            <FlatList
              data={viewed}
              keyExtractor={(item) => item.id}
              renderItem={renderStatus}
              scrollEnabled={false}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 52,
    paddingBottom: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
  },
  headerTitle: { fontSize: 20, fontWeight: "700" },
  headerIcons: { flexDirection: "row", alignItems: "center" },
  headerIcon: { marginRight: 16 },
  myStatus: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 0.5,
  },
  myAvatarWrapper: { position: "relative", marginRight: 12 },
  addDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 0.5,
  },
  avatarRing: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2.5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  statusInfo: { flex: 1 },
  statusName: { fontSize: 16, fontWeight: "600" },
  statusTime: { fontSize: 13, marginTop: 2 },
});
