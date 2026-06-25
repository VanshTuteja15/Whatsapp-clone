import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface TabConfig {
  name: string;
  title: string;
  icon: IconName;
}

const TABS: TabConfig[] = [
  { name: 'status',    title: 'Status',    icon: 'circle-outline'  },
  { name: 'calls',     title: 'Calls',     icon: 'phone'            },
  { name: 'community', title: 'Community', icon: 'account-group'    },
  { name: 'index',     title: 'Chats',     icon: 'chat'             },
  { name: 'settings',  title: 'Settings',  icon: 'cog'              },
];

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.tabBarBorder,
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: colors.tabIconActive,
        tabBarInactiveTintColor: colors.tabIconInactive,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      {TABS.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name={icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
