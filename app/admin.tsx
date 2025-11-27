type AdminPageType =
  | "admin-dashboard"
  | "admin-profile"
  | "admin-notifications";

interface AdminAppProps {
  onLogout: () => void;
}

import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Line, Polyline, Text as SvgText } from "react-native-svg";

export const AdminApp: React.FC<AdminAppProps> = ({ onLogout }) => {
  const [currentPage, setCurrentPage] = useState<
    AdminPageType | "maintenance-requests"
  >("admin-dashboard");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showImageOptions, setShowImageOptions] = useState(false);

  // Function to handle image upload
  const handleImageUpload = async () => {
    // Request permission
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Sorry, we need camera roll permissions to upload images!"
        );
        return;
      }
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      setShowImageOptions(false);
    }
  };

  // Function to take photo with camera
  const handleTakePhoto = async () => {
    // Request camera permission
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Sorry, we need camera permissions to take photos!"
        );
        return;
      }
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      setShowImageOptions(false);
    }
  };

  // Function to remove current photo
  const handleRemovePhoto = () => {
    setProfileImage(null);
    setShowImageOptions(false);
  };

  // Function to show image options modal
  const handleEditAvatar = () => {
    setShowImageOptions(true);
  };

  // Get the profile image source
  const getProfileImageSource = () => {
    if (profileImage) {
      return { uri: profileImage };
    }
    return { uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rica" };
  };

  // Admin Profile Page
  if (currentPage === "admin-profile") {
    return (
      <SafeAreaView style={styles.dashboardContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        {/* Header */}
        <View style={styles.submitHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentPage("admin-dashboard")}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.submitHeaderTitle}>Profile</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Profile Content */}
        <ScrollView
          style={styles.profileContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Avatar Section with Edit Button */}
          <View style={styles.profileAvatarSection}>
            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={handleEditAvatar}
            >
              <Image
                source={getProfileImageSource()}
                style={styles.profileAvatarLarge}
              />
              <View style={styles.editAvatarButton}>
                <Text style={styles.editAvatarIcon}>📷</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.profileRole}>Admin</Text>
          </View>

          {/* Profile Info Card */}
          <View style={styles.profileCard}>
            <View style={styles.profileField}>
              <Text style={styles.profileFieldLabel}>Name :</Text>
              <View style={styles.profileFieldValue}>
                <Text style={styles.profileFieldValueText}>Rica Mae Rojas</Text>
              </View>
            </View>

            <View style={styles.profileField}>
              <Text style={styles.profileFieldLabel}>Email :</Text>
              <View style={styles.profileFieldValue}>
                <Text style={styles.profileFieldValueText}>
                  ricamaerojas108@gmail.com
                </Text>
              </View>
            </View>

            <View style={styles.profileField}>
              <Text style={styles.profileFieldLabel}>Address :</Text>
              <View style={styles.profileFieldValue}>
                <Text style={styles.profileFieldValueText}>
                  Butuan City, Philippines
                </Text>
              </View>
            </View>

            <View style={styles.profileField}>
              <Text style={styles.profileFieldLabel}>Phone:</Text>
              <View style={styles.profileFieldValue}>
                <Text style={styles.profileFieldValueText}>09565689390</Text>
              </View>
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.adminLogoutButton} onPress={onLogout}>
            <Text style={styles.adminLogoutButtonText}>Log out</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Image Options Modal */}
        <Modal
          visible={showImageOptions}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowImageOptions(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.imageOptionsModal}>
              <Text style={styles.modalTitle}>Change Profile Photo</Text>

              <TouchableOpacity
                style={styles.optionButton}
                onPress={handleTakePhoto}
              >
                <Text style={styles.optionButtonText}>Take Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionButton}
                onPress={handleImageUpload}
              >
                <Text style={styles.optionButtonText}>Choose from Library</Text>
              </TouchableOpacity>

              {profileImage && (
                <TouchableOpacity
                  style={[styles.optionButton, styles.removeButton]}
                  onPress={handleRemovePhoto}
                >
                  <Text style={styles.removeButtonText}>
                    Remove Current Photo
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[styles.optionButton, styles.cancelButton]}
                onPress={() => setShowImageOptions(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentPage("admin-dashboard")}
          >
            <Text style={styles.navIcon}>🏠</Text>
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentPage("maintenance-requests")}
          >
            <Text style={styles.navIcon}>📄</Text>
            <Text style={styles.navText}>Tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentPage("admin-notifications")}
          >
            <Text style={styles.navIcon}>🔔</Text>
            <Text style={styles.navText}>Alerts</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Maintenance Requests List Page
  if (currentPage === "maintenance-requests") {
    const requests = [
      {
        id: "REQ-2025-0012",
        date: "2025-10-25",
        type: "Plumbing",
        status: "pending",
        unit: "Unit 12A",
      },
      {
        id: "REQ-2025-0003",
        date: "2025-10-18",
        type: "Electrical",
        status: "in-progress",
        unit: "Unit 5A",
      },
      {
        id: "REQ-2025-0006",
        date: "2025-09-28",
        type: "General",
        status: "completed",
        unit: "Unit 7C",
      },
      {
        id: "REQ-2025-0201",
        date: "2025-08-20",
        type: "General",
        status: "completed",
        unit: "Unit 10C",
      },
      {
        id: "REQ-2025-0101",
        date: "2025-07-24",
        type: "Electrical",
        status: "in-progress",
        unit: "Unit 33H",
      },
      {
        id: "REQ-2025-0040",
        date: "2025-04-15",
        type: "Plumbing",
        status: "in-progress",
        unit: "Unit 3E",
      },
      {
        id: "REQ-2025-0901",
        date: "2025-04-13",
        type: "Electrical",
        status: "completed",
        unit: "Unit 9B",
      },
    ];

    const getStatusStyle = (status: string) => {
      if (status === "pending")
        return { backgroundColor: "#fbbf24", color: "#92400e" };
      if (status === "in-progress")
        return { backgroundColor: "#93c5fd", color: "#1e40af" };
      if (status === "completed")
        return { backgroundColor: "#86efac", color: "#166534" };
      return {};
    };

    const getStatusText = (status: string) => {
      if (status === "pending") return "Pending";
      if (status === "in-progress") return "In progress";
      if (status === "completed") return "Completed";
      return status;
    };

    return (
      <SafeAreaView style={styles.dashboardContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        {/* Header */}
        <View style={styles.submitHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentPage("admin-dashboard")}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.submitHeaderTitle}>Maintenance Request</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Table Header */}
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>Request ID</Text>
            <Text style={styles.tableHeaderCell}>Date</Text>
            <Text style={styles.tableHeaderCell}>Type</Text>
            <Text style={styles.tableHeaderCell}>Status</Text>
          </View>
          <ScrollView
            style={styles.tableBody}
            showsVerticalScrollIndicator={false}
          >
            {requests.map((request, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text style={styles.requestIdText}>{request.id}</Text>
                  <Text style={styles.unitText}>{request.unit}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.dateText2}>{request.date}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.typeText}>{request.type}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text
                    style={[
                      styles.statusBadge2,
                      getStatusStyle(request.status),
                    ]}
                  >
                    {getStatusText(request.status)}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentPage("admin-dashboard")}
          >
            <Text style={styles.navIcon}>🏠</Text>
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navIcon}>📄</Text>
            <Text style={styles.navText}>Tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentPage("admin-notifications")}
          >
            <Text style={styles.navIcon}>🔔</Text>
            <Text style={styles.navText}>Alerts</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Admin Notifications Page
  if (currentPage === "admin-notifications") {
    const notifications = [
      { text: "Completed Request Unit 9B", time: "Just now" },
      { text: "Completed Request Unit 8E", time: "1 hr ago" },
      { text: "Technician Assigned (Plumbing)", time: "2 hrs ago" },
      { text: "Technician Assigned (Electrical)", time: "4 hrs ago" },
      { text: "Completed Request Unit 10C", time: "1 day ago" },
      { text: "Technician Assigned (Electrical)", time: "2 days ago" },
    ];
    return (
      <SafeAreaView style={styles.dashboardContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        {/* Header */}
        <View style={styles.adminNotificationHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentPage("admin-dashboard")}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.adminNotificationHeaderContent}>
            <Text style={styles.notificationTitle}>Notification</Text>
            <Text style={styles.notificationDate}>
              Tuesday, January 14, 2025
            </Text>
          </View>
        </View>
        {/* Notifications List */}
        <ScrollView
          style={styles.adminNotificationsList}
          showsVerticalScrollIndicator={false}
        >
          {notifications.map((notif, idx) => (
            <View key={idx} style={styles.adminNotificationCard}>
              <Text style={styles.adminNotificationText}>{notif.text}</Text>
              <Text style={styles.notificationTime}>{notif.time}</Text>
            </View>
          ))}
        </ScrollView>
        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentPage("admin-dashboard")}
          >
            <Text style={styles.navIcon}>🏠</Text>
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentPage("maintenance-requests")}
          >
            <Text style={styles.navIcon}>📄</Text>
            <Text style={styles.navText}>Tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentPage("admin-notifications")}
          >
            <Text style={styles.navIcon}>🔔</Text>
            <Text style={styles.navText}>Alerts</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Admin Dashboard
  if (currentPage === "admin-dashboard") {
    return (
      <SafeAreaView style={styles.dashboardContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        {/* Header */}
        <View style={styles.adminHeader}>
          <View style={styles.adminHeaderText}>
            <Text style={styles.welcomeBack}>Welcome back,</Text>
            <Text style={styles.adminName}>Admin Rica!</Text>
            <Text style={styles.dateText}>Tuesday, January 14, 2025</Text>
          </View>
          <TouchableOpacity
            style={styles.profilePic}
            onPress={() => setCurrentPage("admin-profile")}
          >
            <Image
              source={getProfileImageSource()}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.adminContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Dashboard Overview Section with Background Image */}
          <View style={styles.overviewContainer}>
            <ImageBackground
              source={{
                uri: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
              }}
              style={styles.overviewBackground}
              resizeMode="cover"
            >
              <View style={styles.overlay} />
              <View style={styles.overviewContent}>
                {/* Banner */}
                <View style={styles.overviewBanner}>
                  <Text style={styles.overviewTitle}>Dashboard Overview</Text>
                </View>

                {/* Stats Grid - 4 cards in 2x2 layout */}
                <View style={styles.statsGrid}>
                  <View
                    style={[styles.statCard, { backgroundColor: "#93c5fd" }]}
                  >
                    <Text style={styles.statNumber}>12</Text>
                    <Text style={styles.statLabel}>Total Requests</Text>
                    <Text style={styles.statSubtext}>Last 3 days</Text>
                  </View>
                  <View
                    style={[styles.statCard, { backgroundColor: "#fbbf24" }]}
                  >
                    <Text style={styles.statNumber}>8</Text>
                    <Text style={styles.statLabel}>Pending</Text>
                    <Text style={styles.statSubtext}>Needs attention</Text>
                  </View>
                  <View
                    style={[styles.statCard, { backgroundColor: "#86efac" }]}
                  >
                    <Text style={styles.statNumber}>8</Text>
                    <Text style={styles.statLabel}>Completed</Text>
                    <Text style={styles.statSubtext}>This week</Text>
                  </View>
                  <View
                    style={[
                      styles.statCard,
                      {
                        backgroundColor: "#fff",
                        borderWidth: 1,
                        borderColor: "#e5e7eb",
                      },
                    ]}
                  >
                    <Text style={styles.statNumber}>10</Text>
                    <Text style={styles.statLabel}>In progress</Text>
                    <Text style={styles.statSubtext}>Notification</Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>

          {/* Weekly Progress Chart */}
          <View style={styles.chartSection}>
            <Text style={styles.chartTitle}>Weekly Progress</Text>
            <View style={styles.chartContainer}>
              <Svg width={300} height={180} style={styles.chart}>
                {/* Grid lines */}
                <Line
                  x1="30"
                  y1="140"
                  x2="280"
                  y2="140"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
                <Line
                  x1="30"
                  y1="110"
                  x2="280"
                  y2="110"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
                <Line
                  x1="30"
                  y1="80"
                  x2="280"
                  y2="80"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
                <Line
                  x1="30"
                  y1="50"
                  x2="280"
                  y2="50"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
                <Line
                  x1="30"
                  y1="20"
                  x2="280"
                  y2="20"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />

                {/* Y-axis labels */}
                <SvgText x="20" y="145" fontSize="10" fill="#999">
                  0
                </SvgText>
                <SvgText x="20" y="115" fontSize="10" fill="#999">
                  3
                </SvgText>
                <SvgText x="20" y="85" fontSize="10" fill="#999">
                  6
                </SvgText>
                <SvgText x="20" y="55" fontSize="10" fill="#999">
                  9
                </SvgText>

                {/* Completed line (green) */}
                <Polyline
                  points="40,120 70,100 100,85 130,70 160,80 190,65 220,55 250,45"
                  fill="none"
                  stroke="#86efac"
                  strokeWidth="2"
                />

                {/* Pending line (orange) */}
                <Polyline
                  points="40,130 70,115 100,105 130,95 160,100 190,90 220,95 250,85"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="2"
                />

                {/* X-axis labels */}
                <SvgText x="35" y="160" fontSize="9" fill="#666">
                  Mon
                </SvgText>
                <SvgText x="65" y="160" fontSize="9" fill="#666">
                  Tue
                </SvgText>
                <SvgText x="95" y="160" fontSize="9" fill="#666">
                  Wed
                </SvgText>
                <SvgText x="125" y="160" fontSize="9" fill="#666">
                  Thu
                </SvgText>
                <SvgText x="160" y="160" fontSize="9" fill="#666">
                  Fri
                </SvgText>
                <SvgText x="190" y="160" fontSize="9" fill="#666">
                  Sat
                </SvgText>
                <SvgText x="215" y="160" fontSize="9" fill="#666">
                  Sun
                </SvgText>
                <SvgText x="245" y="160" fontSize="9" fill="#666">
                  Mon
                </SvgText>
              </Svg>
              {/* Legend */}
              <View style={styles.chartLegend}>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendDot, { backgroundColor: "#86efac" }]}
                  />
                  <Text style={styles.legendText}>Completed</Text>
                </View>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendDot, { backgroundColor: "#fbbf24" }]}
                  />
                  <Text style={styles.legendText}>Pending</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Performance Summary */}
          <View style={styles.performanceSection}>
            <Text style={styles.performanceTitle}>Performance Summary</Text>
            <View style={styles.performanceGrid}>
              <View style={styles.performanceCard}>
                <Text style={styles.performanceIcon}>⏱️</Text>
                <Text style={styles.performanceValue}>2-3hrs</Text>
                <Text style={styles.performanceLabel}>
                  Average Response Time
                </Text>
              </View>
              <View style={styles.performanceCard}>
                <Text style={styles.performanceIcon}>📋</Text>
                <Text style={styles.performanceValue}>10</Text>
                <Text style={styles.performanceLabel}>
                  Tasks completed this week
                </Text>
              </View>
              <View style={styles.performanceCard}>
                <Text style={styles.performanceIcon}>👷</Text>
                <Text style={styles.performanceValue}>5</Text>
                <Text style={styles.performanceLabel}>Technician Active</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.taskButton}
              onPress={() => setCurrentPage("maintenance-requests")}
            >
              <Text style={styles.taskButtonText}>View All Tasks</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Image Options Modal */}
        <Modal
          visible={showImageOptions}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowImageOptions(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.imageOptionsModal}>
              <Text style={styles.modalTitle}>Change Profile Photo</Text>

              <TouchableOpacity
                style={styles.optionButton}
                onPress={handleTakePhoto}
              >
                <Text style={styles.optionButtonText}>Take Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionButton}
                onPress={handleImageUpload}
              >
                <Text style={styles.optionButtonText}>Choose from Library</Text>
              </TouchableOpacity>

              {profileImage && (
                <TouchableOpacity
                  style={[styles.optionButton, styles.removeButton]}
                  onPress={handleRemovePhoto}
                >
                  <Text style={styles.removeButtonText}>
                    Remove Current Photo
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[styles.optionButton, styles.cancelButton]}
                onPress={() => setShowImageOptions(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentPage("admin-dashboard")}
          >
            <Text style={styles.navIcon}>🏠</Text>
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentPage("maintenance-requests")}
          >
            <Text style={styles.navIcon}>📄</Text>
            <Text style={styles.navText}>Tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentPage("admin-notifications")}
          >
            <Text style={styles.navIcon}>🔔</Text>
            <Text style={styles.navText}>Alerts</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Fallback for any other pages
  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Text style={{ marginTop: 100, textAlign: "center", fontSize: 18 }}>
        Page not found
      </Text>
      <TouchableOpacity
        style={[styles.navButton, { alignSelf: "center", marginTop: 40 }]}
        onPress={() => setCurrentPage("admin-dashboard")}
      >
        <Text style={styles.navIcon}>🏠</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  // Header Styles
  adminHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    marginTop: 8,
  },
  adminHeaderText: {
    flex: 1,
  },
  welcomeBack: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 2,
  },
  adminName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  dateText: {
    fontSize: 13,
    color: "#9ca3af",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#e5e7eb",
    marginLeft: 12,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  submitHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    marginTop: 8,
  },
  headerSpacer: {
    width: 40,
  },
  adminNotificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    marginTop: 8,
  },
  adminNotificationHeaderContent: {
    flex: 1,
    marginLeft: 12,
  },
  smallProfilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    fontSize: 18,
    color: "#374151",
    fontWeight: "bold",
  },
  submitHeaderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    textAlign: "center",
    flex: 1,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  notificationDate: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  // Content Styles
  adminContent: {
    flex: 1,
  },
  // Dashboard Overview with Image Background
  overviewContainer: {
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  overviewBackground: {
    width: "100%",
    minHeight: 350,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(27, 126, 7, 0.4)",
  },
  overviewContent: {
    padding: 20,
  },
  overviewBanner: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  statCard: {
    width: "48%",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  statSubtext: {
    fontSize: 12,
    color: "#4b5563",
  },
  chartSection: {
    margin: 8,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: "center",
  },
  chart: {
    width: 300,
    height: 180,
  },
  chartLegend: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    marginTop: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    color: "#6b7280",
  },
  performanceSection: {
    margin: 8,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  performanceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
  },
  performanceGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  performanceCard: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#f3f4f6",
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 4,
    backgroundColor: "#fafafa",
  },
  performanceIcon: {
    fontSize: 20,
    marginBottom: 6,
  },
  performanceValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  performanceLabel: {
    fontSize: 10,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 12,
  },
  taskButton: {
    width: "100%",
    paddingVertical: 14,
    backgroundColor: "#166534",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Bottom Navigation
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  navButton: {
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    flex: 1,
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navText: {
    fontSize: 10,
    color: "#6b7280",
    fontWeight: "500",
  },
  // Table Styles
  tableContainer: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
  },
  tableHeaderCell: {
    flex: 1.5,
    fontSize: 12,
    fontWeight: "bold",
    color: "#6b7280",
    textAlign: "left",
  },
  tableBody: {
    flex: 1,
  },
  tableRow: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    alignItems: "center",
  },
  tableCell: {
    flex: 1.5,
  },
  requestIdText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  unitText: {
    fontSize: 11,
    color: "#6b7280",
  },
  dateText2: {
    fontSize: 11,
    color: "#6b7280",
  },
  typeText: {
    fontSize: 12,
    color: "#1f2937",
    fontWeight: "500",
  },
  statusBadge2: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    fontSize: 10,
    fontWeight: "bold",
    overflow: "hidden",
    alignSelf: "flex-start",
  },
  // Notifications Styles
  adminNotificationsList: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8fafc",
  },
  adminNotificationCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  adminNotificationText: {
    fontSize: 14,
    color: "#1f2937",
    fontWeight: "500",
    flex: 1,
  },
  notificationTime: {
    fontSize: 12,
    color: "#9ca3af",
    marginLeft: 12,
  },
  // Profile Page Styles
  profileContainer: {
    flex: 1,
    padding: 16,
  },
  profileAvatarSection: {
    alignItems: "center",
    marginBottom: 24,
    paddingVertical: 16,
  },
  avatarContainer: {
    position: "relative",
    alignItems: "center",
  },
  profileAvatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: "#e5e7eb",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#166534",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  editAvatarIcon: {
    fontSize: 16,
    color: "white",
  },
  profileRole: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  profileCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  profileField: {
    marginBottom: 20,
  },
  profileFieldLabel: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 6,
    fontWeight: "500",
  },
  profileFieldValue: {
    padding: 12,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  profileFieldValueText: {
    fontSize: 15,
    color: "#1f2937",
    fontWeight: "500",
  },
  adminLogoutButton: {
    width: "100%",
    paddingVertical: 16,
    backgroundColor: "#166534",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  adminLogoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  imageOptionsModal: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#1f2937",
  },
  optionButton: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    alignItems: "center",
  },
  optionButtonText: {
    fontSize: 16,
    color: "#166534",
    fontWeight: "600",
  },
  removeButton: {
    borderBottomWidth: 0,
  },
  removeButtonText: {
    fontSize: 16,
    color: "#dc2626",
    fontWeight: "600",
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 16,
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    borderBottomWidth: 0,
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#374151",
    fontWeight: "600",
  },
});
