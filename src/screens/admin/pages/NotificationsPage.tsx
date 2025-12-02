import React from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomNavigation } from "../../../components/common/BottomNavigation";
import styles from "./notificationsStyles";

interface NotificationsPageProps {
  onBack: () => void;
  onNavigateToTasks: () => void;
  onNavigateToHome: () => void;
  onNavigateToAlerts: () => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({
  onBack,
  onNavigateToTasks,
  onNavigateToHome,
  onNavigateToAlerts,
}) => {
  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {/* Header */}
      <View style={styles.adminNotificationHeader}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.adminNotificationHeaderContent}>
          <Text style={styles.notificationTitle}>Notifications</Text>
          <Text style={styles.notificationDate}>Tuesday, January 14, 2025</Text>
        </View>
      </View>

      <ScrollView
        style={styles.adminNotificationsList}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <View style={styles.adminNotificationCard}>
          <Text style={styles.adminNotificationText}>
            New maintenance request submitted for Unit 12A
          </Text>
          <Text style={styles.notificationTime}>Just now</Text>
        </View>

        <View style={styles.adminNotificationCard}>
          <Text style={styles.adminNotificationText}>
            Request REQ-2025-0003 has been completed
          </Text>
          <Text style={styles.notificationTime}>1 hr ago</Text>
        </View>

        <View style={styles.adminNotificationCard}>
          <Text style={styles.adminNotificationText}>
            Technician assigned to plumbing issue in Unit 7C
          </Text>
          <Text style={styles.notificationTime}>2 hrs ago</Text>
        </View>

        <View style={styles.adminNotificationCard}>
          <Text style={styles.adminNotificationText}>
            High priority request requires attention in Unit 9B
          </Text>
          <Text style={styles.notificationTime}>4 hrs ago</Text>
        </View>

        <View style={styles.adminNotificationCard}>
          <Text style={styles.adminNotificationText}>
            Weekly maintenance report is ready
          </Text>
          <Text style={styles.notificationTime}>1 day ago</Text>
        </View>

        <View style={styles.adminNotificationCard}>
          <Text style={styles.adminNotificationText}>
            System maintenance scheduled for tomorrow
          </Text>
          <Text style={styles.notificationTime}>2 days ago</Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={onNavigateToHome}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={onNavigateToTasks}>
          <Text style={styles.navIcon}>📄</Text>
          <Text style={styles.navText}>Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navButton, styles.activeNavButton]}>
          <Text style={styles.navIcon}>🔔</Text>
          <Text style={styles.navText}>Alerts</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab="notifications"
        onTabPress={(tab) => {
          if (tab === "home") onNavigateToHome();
          if (tab === "request-detail") onNavigateToTasks();
        }}
      />
    </SafeAreaView>
  );
};
