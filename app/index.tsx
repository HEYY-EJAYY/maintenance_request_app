import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  ImageStyle,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { AdminDashboard } from "../components/admin/AdminDashboard";
import { LoginForm } from "../components/auth/LoginForm";
import { SplashScreen } from "../components/auth/SplashScreen";
import { BottomNavigation } from "../components/common/BottomNavigation";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { CategoryGrid } from "../components/dashboard/CategoryGrid";
import { RequestCard } from "../components/dashboard/RequestCard";
import { borderRadius, colors, spacing } from "../config/theme";
import { UserRole } from "../types";
import { MOCK_REQUESTS } from "../utils/constants";

type PageType =
  | "splash"
  | "login"
  | "homeowner-dashboard"
  | "submit-request"
  | "request-detail"
  | "chat"
  | "technical-issue"
  | "admin-dashboard";

export default function MaintenanceApp() {
  const [currentPage, setCurrentPage] = useState<PageType>("splash");

  const handleLogin = (role: UserRole) => {
    if (role === "homeowner") {
      setCurrentPage("homeowner-dashboard");
    } else {
      setCurrentPage("admin-dashboard");
    }
  };

  if (currentPage === "splash") {
    return <SplashScreen onGetStarted={() => setCurrentPage("login")} />;
  }

  if (currentPage === "login") {
    return <LoginForm onLogin={handleLogin} />;
  }

  // Homeowner Dashboard
  if (currentPage === "homeowner-dashboard") {
    return (
      <View style={styles.dashboardContainer}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.dashboardHeader}>
            <View>
              <Text style={styles.welcomeBack}>Welcome back,</Text>
              <Text style={styles.userName}>Jerrianne!</Text>
              <Text style={styles.dateText}>Tuesday, January 14, 2025</Text>
            </View>
            <View style={styles.profilePic}>
              <Image
                source={{
                  uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jerrianne",
                }}
                style={styles.profileImage}
              />
            </View>
          </View>

          {/* Hero Banner */}
          <ImageBackground
            source={require("../assets/images/camella.jpeg")}
            style={styles.heroBanner}
            resizeMode="cover"
          >
            <View style={styles.bannerOverlay} />
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>
                COMMUNITY CARE & ASSISTANCE
              </Text>
              <Text style={styles.bannerSubtitle}>Need Help?</Text>
              <Text style={styles.bannerQuick}>QUICK SERVICE</Text>
              <Button
                title="Submit Request"
                onPress={() => setCurrentPage("submit-request")}
                variant="accent"
                style={styles.submitButton}
              />
            </View>
          </ImageBackground>

          {/* Active Requests Section */}
          <View style={styles.activeRequestsHeader}>
            <View style={styles.activeRequestsTitle}>
              <Text style={styles.checkIcon}>📋</Text>
              <Text style={styles.activeText}>
                Active Request ({MOCK_REQUESTS.length})
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.viewHistory}>View History</Text>
            </TouchableOpacity>
          </View>

          {/* Request Cards */}
          <View style={styles.requestsContainer}>
            {MOCK_REQUESTS.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </View>

          {/* Report Category */}
          <CategoryGrid
            onCategoryPress={(category) => console.log("Category:", category)}
          />
        </ScrollView>

        {/* Bottom Navigation */}
        <BottomNavigation activeTab="home" />
      </View>
    );
  }

  // Submit Request Page
  if (currentPage === "submit-request") {
    return (
      <View style={styles.dashboardContainer}>
        <ScrollView style={styles.scrollView}>
          {/* Header */}
          <View style={styles.submitHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setCurrentPage("homeowner-dashboard")}
            >
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.submitHeaderTitle}>Submit Request</Text>
          </View>

          {/* Form */}
          <View style={styles.submitForm}>
            <Input placeholder="Select Type" style={styles.submitInput} />
            <Input placeholder="Unit / House No." style={styles.submitInput} />
            <Input
              placeholder="Short Description"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              style={styles.submitTextarea}
            />
            <Button
              title="Submit Request"
              onPress={() => setCurrentPage("request-detail")}
              variant="accent"
            />
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <BottomNavigation
          activeTab="home"
          onTabPress={(tab) => {
            if (tab === "home") setCurrentPage("homeowner-dashboard");
          }}
        />
      </View>
    );
  }

  // Request Detail Page
  if (currentPage === "request-detail") {
    return (
      <View style={styles.dashboardContainer}>
        {/* Header */}
        <View style={styles.submitHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentPage("homeowner-dashboard")}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.submitHeaderTitle}>Request Detail</Text>
        </View>

        {/* Request Detail Card */}
        <ScrollView style={styles.scrollView}>
          <View style={styles.detailContainer}>
            <View style={styles.detailCard}>
              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Electrical</Text>
                <Text style={styles.detailSubtext}>Living Room</Text>
              </View>

              <View style={styles.detailDivider} />

              <View style={styles.detailSection}>
                <Text style={styles.detailTitle}>Require</Text>
                <Text style={styles.detailValue}>123456</Text>
              </View>

              <View style={styles.detailDivider} />

              <View style={styles.detailSection}>
                <Text style={styles.detailTitle}>Status</Text>
                <View style={styles.statusRow}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>Pending</Text>
                </View>
              </View>

              <Button
                title="Chat"
                onPress={() => setCurrentPage("chat")}
                variant="accent"
                style={styles.chatButton}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  // Chat Page
  if (currentPage === "chat") {
    return (
      <View style={styles.dashboardContainer}>
        {/* Header */}
        <View style={styles.submitHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentPage("request-detail")}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.submitHeaderTitle}>Chat</Text>
        </View>

        {/* Chat Messages */}
        <ScrollView style={styles.chatContainer}>
          {/* Homeowner Message 1 */}
          <View style={styles.messageGroup}>
            <View style={styles.messageHeader}>
              <Image
                source={{
                  uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jerrianne",
                }}
                style={styles.messageAvatar}
              />
              <Text style={styles.messageSender}>Homeowner</Text>
            </View>
            <View style={styles.messageLeft}>
              <View style={styles.messageBubbleLeft}>
                <Text style={styles.messageTextLeft}>
                  I submitted a maintenance request for the living room.
                </Text>
              </View>
            </View>
          </View>

          {/* Admin Message 1 */}
          <View style={styles.messageGroup}>
            <View style={[styles.messageHeader, styles.messageHeaderRight]}>
              <Text style={styles.messageSender}>Admin</Text>
              <Image
                source={{
                  uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
                }}
                style={styles.messageAvatar}
              />
            </View>
            <View style={styles.messageRight}>
              <View style={styles.messageBubbleRight}>
                <Text style={styles.messageTextRight}>
                  I've received your request and will take a look as soon as
                  possible.
                </Text>
              </View>
            </View>
          </View>

          {/* Homeowner Message 2 */}
          <View style={styles.messageGroup}>
            <View style={styles.messageHeader}>
              <Image
                source={{
                  uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jerrianne",
                }}
                style={styles.messageAvatar}
              />
              <Text style={styles.messageSender}>Homeowner</Text>
            </View>
            <View style={styles.messageLeft}>
              <View style={styles.messageBubbleLeft}>
                <Text style={styles.messageTextLeft}>Thank you!</Text>
              </View>
            </View>
          </View>

          {/* Admin Message 2 */}
          <View style={styles.messageGroup}>
            <View style={[styles.messageHeader, styles.messageHeaderRight]}>
              <Text style={styles.messageSender}>Admin</Text>
              <Image
                source={{
                  uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
                }}
                style={styles.messageAvatar}
              />
            </View>
            <View style={styles.messageRight}>
              <View style={styles.messageBubbleRight}>
                <Text style={styles.messageTextRight}>
                  I've fixed the issue. Please check if the lights are still
                  flickering.
                </Text>
              </View>
              <Text style={styles.messageTimestamp}>Delivered on Thursday</Text>
            </View>
          </View>
        </ScrollView>

        {/* Continue Button */}
        <View style={styles.chatFooter}>
          <Button
            title="Continue"
            onPress={() => setCurrentPage("technical-issue")}
            variant="accent"
          />
        </View>
      </View>
    );
  }

  // Technical Issue Page
  if (currentPage === "technical-issue") {
    return (
      <View style={styles.dashboardContainer}>
        {/* Header */}
        <View style={styles.submitHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentPage("chat")}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.submitHeaderTitle}>Technical Issue</Text>
        </View>

        {/* Update Card */}
        <ScrollView style={styles.scrollView}>
          <View style={styles.technicalContainer}>
            <View style={styles.technicalCard}>
              <View style={styles.updateLabel}>
                <Text style={styles.updateLabelText}>UPDATE</Text>
              </View>
              <Text style={styles.updateText}>
                The lights in the living room have been fixed.
              </Text>

              <View style={styles.technicianInfo}>
                <Image
                  source={{
                    uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jerrianne",
                  }}
                  style={styles.technicianAvatar}
                />
                <View style={styles.technicianDetails}>
                  <Text style={styles.technicianName}>Jerrianne Alejandria</Text>
                  <Text style={styles.technicianDate}>October 20</Text>
                </View>
              </View>

              <Button
                title="Done"
                onPress={() => setCurrentPage("homeowner-dashboard")}
                variant="accent"
                style={styles.doneButton}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  // Admin Dashboard
  if (currentPage === "admin-dashboard") {
    return (
      <AdminDashboard onNavigate={(tab) => console.log("Navigate to:", tab)} />
    );
  }

  return null;
}

const styles = StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    backgroundColor: colors.background,
  } as ViewStyle,
  scrollView: {
    flex: 1,
  } as ViewStyle,
  scrollContent: {
    paddingBottom: 100,
  } as ViewStyle,
  dashboardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.xl,
    backgroundColor: colors.white,
  } as ViewStyle,
  welcomeBack: {
    fontSize: 14,
    color: colors.text.secondary,
  } as TextStyle,
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text.primary,
    marginTop: 4,
  } as TextStyle,
  dateText: {
    fontSize: 12,
    color: colors.text.tertiary,
    marginTop: 4,
  } as TextStyle,
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  } as ViewStyle,
  profileImage: {
    width: "100%",
    height: "100%",
  } as ImageStyle,
  heroBanner: {
    margin: spacing.xl,
    height: 200,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.secondary,
    overflow: "hidden",
  } as ViewStyle,
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlayLight,
  } as ViewStyle,
  bannerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
    zIndex: 2,
  } as ViewStyle,
  bannerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
    textAlign: "center",
    letterSpacing: 2,
    marginBottom: spacing.sm,
  } as TextStyle,
  bannerSubtitle: {
    fontSize: 14,
    color: colors.white,
    marginBottom: 4,
  } as TextStyle,
  bannerQuick: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.category.electrical,
    letterSpacing: 2,
    marginBottom: spacing.lg,
  } as TextStyle,
  submitButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxxl,
  } as ViewStyle,
  activeRequestsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.xl,
  } as ViewStyle,
  activeRequestsTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  } as ViewStyle,
  checkIcon: {
    fontSize: 20,
  } as TextStyle,
  activeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text.primary,
  } as TextStyle,
  viewHistory: {
    fontSize: 14,
    color: colors.text.secondary,
  } as TextStyle,
  requestsContainer: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  } as ViewStyle,
  submitHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.lg,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.lg,
  } as ViewStyle,
  backButton: {
    padding: spacing.sm,
  } as ViewStyle,
  backIcon: {
    fontSize: 24,
    color: colors.text.primary,
  } as TextStyle,
  submitHeaderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
  } as TextStyle,
  submitForm: {
    padding: spacing.xxl,
    paddingHorizontal: spacing.xl,
  } as ViewStyle,
  submitInput: {
    marginBottom: spacing.xl,
  } as TextStyle,
  submitTextarea: {
    minHeight: 100,
    marginBottom: spacing.xl,
  } as TextStyle,
  detailContainer: {
    padding: spacing.xl,
  } as ViewStyle,
  detailCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  } as ViewStyle,
  detailSection: {
    marginBottom: spacing.lg,
  } as ViewStyle,
  detailLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: spacing.xs,
  } as TextStyle,
  detailSubtext: {
    fontSize: 14,
    color: colors.text.secondary,
  } as TextStyle,
  detailDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  } as ViewStyle,
  detailTitle: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  } as TextStyle,
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
  } as TextStyle,
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  } as ViewStyle,
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.status.pending.bg,
  } as ViewStyle,
  statusText: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: "600",
  } as TextStyle,
  chatButton: {
    marginTop: spacing.xl,
  } as ViewStyle,
  chatContainer: {
    flex: 1,
    padding: spacing.xl,
    backgroundColor: colors.background,
  } as ViewStyle,
  messageGroup: {
    marginBottom: spacing.xl,
  } as ViewStyle,
  messageHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  } as ViewStyle,
  messageHeaderRight: {
    justifyContent: "flex-end",
  } as ViewStyle,
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  } as ImageStyle,
  messageSender: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.primary,
  } as TextStyle,
  messageLeft: {
    alignItems: "flex-start",
  } as ViewStyle,
  messageRight: {
    alignItems: "flex-end",
  } as ViewStyle,
  messageBubbleLeft: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  } as ViewStyle,
  messageBubbleRight: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  } as ViewStyle,
  messageTextLeft: {
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 20,
  } as TextStyle,
  messageTextRight: {
    fontSize: 14,
    color: colors.white,
    lineHeight: 20,
  } as TextStyle,
  messageTimestamp: {
    fontSize: 12,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
  } as TextStyle,
  chatFooter: {
    padding: spacing.xl,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  } as ViewStyle,
  technicalContainer: {
    padding: spacing.xl,
  } as ViewStyle,
  technicalCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  } as ViewStyle,
  updateLabel: {
    backgroundColor: colors.accent,
    alignSelf: "flex-start",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.lg,
  } as ViewStyle,
  updateLabelText: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.white,
    letterSpacing: 1,
  } as TextStyle,
  updateText: {
    fontSize: 16,
    color: colors.text.primary,
    lineHeight: 24,
    marginBottom: spacing.xl,
  } as TextStyle,
  technicianInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.xl,
  } as ViewStyle,
  technicianAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  } as ImageStyle,
  technicianDetails: {
    flex: 1,
  } as ViewStyle,
  technicianName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: spacing.xs,
  } as TextStyle,
  technicianDate: {
    fontSize: 14,
    color: colors.text.secondary,
  } as TextStyle,
  doneButton: {
    marginTop: spacing.md,
  } as ViewStyle,
});
