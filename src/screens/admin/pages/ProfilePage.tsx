import React from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomNavigation } from "../../../components/common/BottomNavigation";
import styles from "./profileStyles";

interface ProfilePageProps {
  profileImage: string | null;
  getProfileImageSource: () => any;
  onImagePress: () => void;
  onBack: () => void;
  onNavigateToTasks: () => void;
  onNavigateToHome: () => void;
  onNavigateToAlerts: () => void;
  onLogout: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  profileImage,
  getProfileImageSource,
  onImagePress,
  onBack,
  onNavigateToTasks,
  onNavigateToHome,
  onNavigateToAlerts,
  onLogout,
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
          <Text style={styles.notificationTitle}>Profile</Text>
          <Text style={styles.notificationDate}>Admin Account</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.profileContainer}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* Profile Avatar Section */}
        <View style={styles.profileAvatarSection}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={onImagePress}
          >
            <Image
              source={getProfileImageSource()}
              style={styles.profileAvatarLarge}
            />
            <View style={styles.editAvatarButton}>
              <Text style={styles.editAvatarIcon}>📷</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.profileRole}>Administrator</Text>
        </View>

        {/* Profile Info Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileField}>
            <Text style={styles.profileFieldLabel}>Name</Text>
            <View style={styles.profileFieldValue}>
              <Text style={styles.profileFieldValueText}>Rica Garcia</Text>
            </View>
          </View>

          <View style={styles.profileField}>
            <Text style={styles.profileFieldLabel}>Email</Text>
            <View style={styles.profileFieldValue}>
              <Text style={styles.profileFieldValueText}>
                admin.rica@camella.com
              </Text>
            </View>
          </View>

          <View style={styles.profileField}>
            <Text style={styles.profileFieldLabel}>Position</Text>
            <View style={styles.profileFieldValue}>
              <Text style={styles.profileFieldValueText}>
                Community Manager
              </Text>
            </View>
          </View>

          <View style={styles.profileField}>
            <Text style={styles.profileFieldLabel}>Phone</Text>
            <View style={styles.profileFieldValue}>
              <Text style={styles.profileFieldValueText}>+63 912 345 6789</Text>
            </View>
          </View>

          <View style={styles.profileField}>
            <Text style={styles.profileFieldLabel}>Community</Text>
            <View style={styles.profileFieldValue}>
              <Text style={styles.profileFieldValueText}>
                Camella Communities
              </Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.adminLogoutButton} onPress={onLogout}>
          <Text style={styles.adminLogoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab="home"
        onTabPress={(tab) => {
          if (tab === "home") onNavigateToHome();
          if (tab === "request-detail") onNavigateToTasks();
          if (tab === "notifications") onNavigateToAlerts();
        }}
      />
    </SafeAreaView>
  );
};
