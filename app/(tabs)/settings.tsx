import { useTheme } from "@/context/ThemeContext";
import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface RowConfig {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  badge?: string;
}

const CARD_ONE: RowConfig[] = [
  { icon: "person-circle-outline", label: "Avatar" },
  { icon: "list-outline", label: "Lists" },
  { icon: "megaphone-outline", label: "Broadcast messages" },
  { icon: "star-outline", label: "Starred" },
  { icon: "laptop-outline", label: "Linked devices" },
];

const CARD_TWO: RowConfig[] = [
  { icon: "key-outline", label: "Account" },
  { icon: "lock-closed-outline", label: "Privacy" },
  { icon: "chatbubble-outline", label: "Chats", badge: "1" },
  { icon: "notifications-outline", label: "Notifications" },
  { icon: "help-circle-outline", label: "Help" },
];

export default function SettingsScreen() {
  const { colors, isDark, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top bar */}
        <View
          style={[
            styles.topBar,
            {
              backgroundColor: colors.surface,
              borderBottomColor: colors.border,
            },
          ]}
        >
          <View
            style={[
              styles.circle,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Ionicons name="search" size={20} color={colors.icon} />
          </View>
          <Text style={[styles.topTitle, { color: colors.text }]}>
            Settings
          </Text>
          <View
            style={[
              styles.circle,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Ionicons name="qr-code-outline" size={20} color={colors.icon} />
          </View>
        </View>

        {/* Profile card */}
        <TouchableOpacity
          style={[
            styles.profileCard,
            {
              backgroundColor: colors.surface,
              borderBottomColor: colors.border,
            },
          ]}
          activeOpacity={0.7}
        >
          <View>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=12" }}
              style={styles.avatar}
            />
            <View
              style={[
                styles.onlineDot,
                { backgroundColor: colors.accent, borderColor: colors.surface },
              ]}
            />
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.name, { color: colors.text }]}>
              Vansh Tuteja
            </Text>
            <Text style={[styles.statusText, { color: colors.textSecondary }]}>
              Hey there! I am using WhatsApp
            </Text>
          </View>
          <View style={[styles.qrBox, { backgroundColor: colors.accentLight }]}>
            <Ionicons name="qr-code" size={22} color={colors.primary} />
          </View>
        </TouchableOpacity>

        {/* Dark mode toggle */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.themeRow}>
            <View
              style={[styles.iconBox, { backgroundColor: colors.accentLight }]}
            >
              <Ionicons
                name={isDark ? "moon" : "sunny-outline"}
                size={20}
                color={colors.primary}
              />
            </View>
            <Text style={[styles.rowText, { color: colors.text }]}>
              {isDark ? "Dark mode" : "Light mode"}
            </Text>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: "#D1D1D6", true: colors.accent }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Card 1 */}
        <SettingsCard rows={CARD_ONE} colors={colors} />

        {/* Card 2 */}
        <SettingsCard rows={CARD_TWO} colors={colors} />

        <Text style={[styles.version, { color: colors.textMuted }]}>
          Connect v1.0.0
        </Text>
      </ScrollView>
    </View>
  );
}

// ─────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────

function SettingsCard({
  rows,
  colors,
}: {
  rows: RowConfig[];
  colors: ReturnType<typeof useTheme>["colors"];
}) {
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      {rows.map(({ icon, label, badge }, index) => (
        <TouchableOpacity
          key={label}
          style={[
            styles.row,
            index < rows.length - 1 && {
              borderBottomWidth: 0.5,
              borderBottomColor: colors.border,
            },
          ]}
          activeOpacity={0.7}
        >
          <View
            style={[styles.iconBox, { backgroundColor: colors.accentLight }]}
          >
            <Ionicons name={icon} size={18} color={colors.primary} />
          </View>
          <Text style={[styles.rowText, { color: colors.text }]}>{label}</Text>
          <View style={{ flex: 1 }} />
          {badge ? (
            <View style={[styles.badge, { backgroundColor: colors.badge }]}>
              <Text style={[styles.badgeText, { color: colors.badgeText }]}>
                {badge}
              </Text>
            </View>
          ) : (
            <Feather name="chevron-right" size={18} color={colors.iconMuted} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ─────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 52,
    paddingBottom: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
  },
  topTitle: { fontSize: 20, fontWeight: "700" },
  circle: {
    height: 38,
    width: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 0.5,
    marginBottom: 16,
  },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  onlineDot: {
    position: "absolute",
    bottom: 1,
    right: 1,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
  },
  profileInfo: { flex: 1, marginLeft: 14 },
  name: { fontSize: 18, fontWeight: "700" },
  statusText: { fontSize: 14, marginTop: 3 },
  qrBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    marginHorizontal: 14,
    borderRadius: 16,
    marginBottom: 18,
    borderWidth: 1,
    overflow: "hidden",
  },
  themeRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  rowText: { fontSize: 15 },
  badge: {
    height: 22,
    width: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { fontSize: 12, fontWeight: "700" },
  version: { textAlign: "center", fontSize: 12, marginBottom: 30 },
});
