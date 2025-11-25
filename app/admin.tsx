import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Line, Polyline, Text as SvgText } from "react-native-svg";

type AdminPageType =
  | "admin-dashboard"
  | "admin-profile"
  | "admin-notifications";

interface AdminAppProps {
  onLogout: () => void;
}

export const AdminApp: React.FC<AdminAppProps> = ({ onLogout }) => {
  const [currentPage, setCurrentPage] =
    useState<AdminPageType>("admin-dashboard");

  if (currentPage === "admin-dashboard") {
    return (
      <View style={styles.dashboardContainer}>
        {/* Header */}
        <View style={styles.adminHeader}>
          <View>
            <Text style={styles.welcomeBack}>Welcome back,</Text>
            <Text style={styles.adminName}>Admin Rica!</Text>
            <Text style={styles.dateText}>Tuesday, January 14, 2025</Text>
          </View>
          <TouchableOpacity
            style={styles.profilePic}
            onPress={() => setCurrentPage("admin-profile")}
          >
            <Image
              source={{
                uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rica",
              }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.adminContent}>
          {/* Dashboard Overview Section */}
          <View style={styles.overviewSection}>
            <View style={styles.overviewBanner}>
              <Text style={styles.overviewTitle}>Dashboard Overview</Text>
            </View>

            {/* Stats Grid */}
            <View style={styles.statsGrid}>
              <View style={[styles.statCard, { backgroundColor: "#93c5fd" }]}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Total Requests</Text>
                <Text style={styles.statSubtext}>Last 3 days</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: "#fbbf24" }]}>
                <Text style={styles.statNumber}>8</Text>
                <Text style={styles.statLabel}>Pending</Text>
                <Text style={styles.statSubtext}>Needs attention</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: "#86efac" }]}>
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
            <TouchableOpacity style={styles.taskButton}>
              <Text style={styles.taskButtonText}>Task</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentPage("admin-dashboard")}
          >
            <Text style={styles.navIcon}>🏠</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navIcon}>📄</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentPage("admin-notifications")}
          >
            <Text style={styles.navIcon}>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Placeholder for other pages
  return (
    <View style={styles.dashboardContainer}>
      <Text style={{ marginTop: 100, textAlign: "center", fontSize: 18 }}>
        {currentPage === "admin-profile"
          ? "Profile Page (Coming Soon)"
          : "Notifications (Coming Soon)"}
      </Text>
      <TouchableOpacity
        style={[styles.navButton, { alignSelf: "center", marginTop: 40 }]}
        onPress={() => setCurrentPage("admin-dashboard")}
      >
        <Text style={styles.navIcon}>🏠</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  adminHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  welcomeBack: {
    fontSize: 16,
    color: "#666",
  },
  adminName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 4,
  },
  dateText: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
  profilePic: {
    width: 54,
    height: 54,
    borderRadius: 27,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#e5e7eb",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  adminContent: {
    flex: 1,
    paddingBottom: 20,
  },
  overviewSection: {
    margin: 20,
  },
  overviewBanner: {
    backgroundColor: "#2563eb",
    backgroundImage: "url(https://i.imgur.com/5pZGJYm.jpg)", // Not supported in RN, fallback to color
    backgroundSize: "cover", // Not supported in RN
    backgroundPosition: "center", // Not supported in RN
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  statCard: {
    width: "48%",
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  statSubtext: {
    fontSize: 11,
    color: "#4b5563",
  },
  chartSection: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  chartContainer: {
    position: "relative",
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
    marginHorizontal: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  legendText: {
    fontSize: 12,
    color: "#666",
  },
  performanceSection: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  performanceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  performanceGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  performanceCard: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
  },
  performanceIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  performanceValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  performanceLabel: {
    fontSize: 10,
    color: "#666",
    textAlign: "center",
    lineHeight: 13,
  },
  taskButton: {
    width: "100%",
    paddingVertical: 14,
    backgroundColor: "#166534",
    borderRadius: 8,
    alignItems: "center",
  },
  taskButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  navButton: {
    padding: 10,
    borderRadius: 8,
  },
  navIcon: {
    fontSize: 24,
  },
});
