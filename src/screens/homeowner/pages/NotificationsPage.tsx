import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { BottomNavigation } from "../../../components/common/BottomNavigation";
import styles from "./notificationsStyles";

interface NotificationsPageProps {
  onBack: () => void;
  onNavigateToSubmitRequest: () => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({
  onBack,
  onNavigateToSubmitRequest,
}) => {
  const notifications = [
    { text: "Completed Request", time: "Just now" },
    { text: "Pending Request", time: "1 hr ago" },
    { text: "Pending Request", time: "2 hrs ago" },
    { text: "In progress Request", time: "4 hrs ago" },
    { text: "Completed Request", time: "1 day ago" },
    { text: "Completed Request", time: "2 days ago" },
  ];

  return (
    <>
      {/* Header */}
      <View style={styles.notificationHeader}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.notificationTitle}>Notification</Text>
          <Text style={styles.notificationDate}>Tuesday, January 14, 2025</Text>
        </View>
      </View>

      {/* Notifications List */}
      <ScrollView
        style={styles.notificationsList}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {notifications.map((notification, index) => (
          <View key={index} style={styles.notificationCard}>
            <TouchableOpacity style={styles.notificationItem}>
              <Text style={styles.notificationText}>{notification.text}</Text>
              <Text style={styles.notificationTime}>{notification.time}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab="notifications"
        onTabPress={(tab) => {
          if (tab === "home") onBack();
          if (tab === "request-detail") onNavigateToSubmitRequest();
        }}
      />
    </>
  );
};
