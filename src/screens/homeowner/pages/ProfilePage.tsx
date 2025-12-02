import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { BottomNavigation } from "../../../components/common/BottomNavigation";
import styles from "./profileStyles";

interface ProfilePageProps {
  profileImage: string | null;
  onBack: () => void;
  onNavigateToSubmitRequest: () => void;
  onNavigateToNotifications: () => void;
  onEditAvatar: () => void;
  onLogout: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  profileImage,
  onBack,
  onNavigateToSubmitRequest,
  onNavigateToNotifications,
  onEditAvatar,
  onLogout,
}) => {
  const getProfileImageSource = () => {
    if (profileImage) {
      return { uri: profileImage };
    }
    return { uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jerrianne" };
  };

  return (
    <>
      {/* Header */}
      <View style={styles.pageHeader}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Profile</Text>
      </View>

      {/* Profile Content */}
      <ScrollView
        style={styles.profileContainer}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* Profile Avatar Section with Edit Button */}
        <View style={styles.profileAvatarSection}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={onEditAvatar}
          >
            <Image
              source={getProfileImageSource()}
              style={styles.profileAvatarLarge}
            />
            <View style={styles.editAvatarButton}>
              <Text style={styles.editAvatarIcon}>📷</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.profileRole}>Homeowner</Text>
        </View>

        {/* Profile Info Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileField}>
            <Text style={styles.profileFieldLabel}>Name :</Text>
            <View style={styles.profileFieldValueContainer}>
              <Text style={styles.profileFieldValue}>
                Jerrianne Kent Alejandria
              </Text>
            </View>
          </View>

          <View style={styles.profileField}>
            <Text style={styles.profileFieldLabel}>Email :</Text>
            <View style={styles.profileFieldValueContainer}>
              <Text style={styles.profileFieldValue}>
                Jerrianne03@gmail.com
              </Text>
            </View>
          </View>

          <View style={styles.profileField}>
            <Text style={styles.profileFieldLabel}>Address :</Text>
            <View style={styles.profileFieldValueContainer}>
              <Text style={styles.profileFieldValue}>
                Butuan City, Philippines
              </Text>
            </View>
          </View>

          <View style={styles.profileField}>
            <Text style={styles.profileFieldLabel}>Phone:</Text>
            <View style={styles.profileFieldValueContainer}>
              <Text style={styles.profileFieldValue}>09639147380</Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutButtonText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab="home"
        onTabPress={(tab) => {
          if (tab === "home") onBack();
          if (tab === "request-detail") onNavigateToSubmitRequest();
          if (tab === "notifications") onNavigateToNotifications();
        }}
      />
    </>
  );
};
