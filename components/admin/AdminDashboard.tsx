import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { borderRadius, colors, spacing } from "../../config/theme";
import { MOCK_REQUESTS } from "../../utils/constants";
import { RequestCard } from "../admin/RequestCard";
import { BottomNavigation } from "../common/BottomNavigation";

interface AdminDashboardProps {
  onNavigate?: (page: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigate,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeBack}>Admin Portal</Text>
            <Text style={styles.userName}>Maintenance Manager</Text>
            <Text style={styles.dateText}>Tuesday, January 14, 2025</Text>
          </View>
          <View style={styles.profilePic}>
            <Image
              source={{
                uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
              }}
              style={styles.profileImage}
            />
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: "#fcd34d" }]}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: "#93c5fd" }]}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: "#86efac" }]}>
            <Text style={styles.statNumber}>48</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>

        {/* All Requests Section */}
        <View style={styles.requestsHeader}>
          <View style={styles.requestsTitle}>
            <Text style={styles.checkIcon}>📋</Text>
            <Text style={styles.requestsText}>
              All Requests ({MOCK_REQUESTS.length})
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>

        {/* Request Cards */}
        <View style={styles.requestsContainer}>
          {MOCK_REQUESTS.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="home" onTabPress={onNavigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
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
  statsContainer: {
    flexDirection: "row",
    padding: spacing.xl,
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    padding: spacing.xl,
    borderRadius: borderRadius.md,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 4,
  },
  requestsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.xl,
  },
  requestsTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  checkIcon: {
    fontSize: 20,
  },
  requestsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  filterText: {
    fontSize: 14,
    color: colors.accent,
    fontWeight: "600",
  },
  requestsContainer: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
});
