import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
          <View style={styles.heroBanner}>
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
          </View>

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
              onPress={() => setCurrentPage("homeowner-dashboard")}
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
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  dashboardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.xl,
    backgroundColor: colors.white,
  },
  welcomeBack: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text.primary,
    marginTop: 4,
  },
  dateText: {
    fontSize: 12,
    color: colors.text.tertiary,
    marginTop: 4,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  heroBanner: {
    margin: spacing.xl,
    height: 200,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.secondary,
    overflow: "hidden",
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlayLight,
  },
  bannerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
    zIndex: 2,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
    textAlign: "center",
    letterSpacing: 2,
    marginBottom: spacing.sm,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: colors.white,
    marginBottom: 4,
  },
  bannerQuick: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.category.electrical,
    letterSpacing: 2,
    marginBottom: spacing.lg,
  },
  submitButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxxl,
  },
  activeRequestsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.xl,
  },
  activeRequestsTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  checkIcon: {
    fontSize: 20,
  },
  activeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  viewHistory: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  requestsContainer: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  submitHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.lg,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.lg,
  },
  backButton: {
    padding: spacing.sm,
  },
  backIcon: {
    fontSize: 24,
    color: colors.text.primary,
  },
  submitHeaderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  submitForm: {
    padding: spacing.xxl,
    paddingHorizontal: spacing.xl,
  },
  submitInput: {
    marginBottom: spacing.xl,
  },
  submitTextarea: {
    minHeight: 100,
    marginBottom: spacing.xl,
  },
});
