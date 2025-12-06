import React from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Line, Polyline, Text as SvgText } from "react-native-svg";
import { BottomNavigation } from "../../../components/common/BottomNavigation";
import styles from "./dashboardStyles";

import { User } from "../../../services/authService";

interface DashboardPageProps {
  profileImage: string | null;
  currentUser: User | null;
  allRequests: any[];
  recentRequests: any[];
  selectedDateRange: number;
  onDateRangeChange: (days: number) => void;
  pendingRequests: any[];
  completedRequests: any[];
  inProgressRequests: any[];
  activeTechnicians: number;
  completedThisWeek: number;
  avgResponseTime: number;
  getProfileImageSource: () => any;
  onProfilePress: () => void;
  onShowAllRequests: () => void;
  onShowPending: () => void;
  onShowCompleted: () => void;
  onShowInProgress: () => void;
  onNavigateToTasks: () => void;
  onNavigateToHome: () => void;
  onNavigateToNotifications: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  profileImage,
  currentUser,
  allRequests,
  recentRequests,
  selectedDateRange,
  onDateRangeChange,
  pendingRequests,
  completedRequests,
  inProgressRequests,
  activeTechnicians,
  completedThisWeek,
  avgResponseTime,
  getProfileImageSource,
  onProfilePress,
  onShowAllRequests,
  onShowPending,
  onShowCompleted,
  onShowInProgress,
  onNavigateToTasks,
  onNavigateToHome,
  onNavigateToNotifications,
}) => {
  const dateRanges = [1, 3, 7, 30];

  const getDateRangeText = () => {
    if (selectedDateRange === 1) return "Today";
    if (selectedDateRange === 7) return "Last 7 days";
    if (selectedDateRange === 30) return "Last 30 days";
    return `Last ${selectedDateRange} days`;
  };

  const handleNextDateRange = () => {
    const currentIndex = dateRanges.indexOf(selectedDateRange);
    const nextIndex = (currentIndex + 1) % dateRanges.length;
    onDateRangeChange(dateRanges[nextIndex]);
  };
  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {/* Header */}
      <View style={styles.adminHeader}>
        <View style={styles.adminHeaderText}>
          <Text style={styles.welcomeBack}>Welcome back,</Text>
          <Text style={styles.adminName}>{currentUser?.name || "Admin"}!</Text>
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>
        <TouchableOpacity style={styles.profilePic} onPress={onProfilePress}>
          <Image source={getProfileImageSource()} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.adminContent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* Dashboard Overview Section with Background Image */}
        <View style={styles.overviewContainer}>
          <ImageBackground
            source={require("../../../assets/images/camella.jpeg")}
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
                <View style={[styles.statCard, { backgroundColor: "#93c5fd" }]}>
                  <TouchableOpacity onPress={onShowAllRequests}>
                    <Text style={styles.statTotal}>
                      {recentRequests.length}
                    </Text>
                    <Text style={styles.statLabel}>Total Requests</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#6b7280",
                        fontWeight: "500",
                      }}
                    >
                      {getDateRangeText()}
                    </Text>
                    <TouchableOpacity
                      onPress={handleNextDateRange}
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 19,
                          color: "#6b7280",
                          fontWeight: "bold",
                        }}
                      >
                        ›
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.statCard, { backgroundColor: "#fbbf24" }]}
                  onPress={onShowPending}
                >
                  <Text style={styles.statNumber}>
                    {pendingRequests.length}
                  </Text>
                  <Text style={styles.statLabel}>Pending</Text>
                  <Text style={styles.statSubtext}>Needs attention</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.statCard, { backgroundColor: "#86efac" }]}
                  onPress={onShowCompleted}
                >
                  <Text style={styles.statNumber}>
                    {completedRequests.length}
                  </Text>
                  <Text style={styles.statLabel}>Completed</Text>
                  <Text style={styles.statSubtext}>This week</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.statCard,
                    {
                      backgroundColor: "#fff",
                      borderWidth: 1,
                      borderColor: "#e5e7eb",
                    },
                  ]}
                  onPress={onShowInProgress}
                >
                  <Text style={styles.statNumber}>
                    {inProgressRequests.length}
                  </Text>
                  <Text style={styles.statLabel}>In progress</Text>
                  <Text style={styles.statSubtext}>Notification</Text>
                </TouchableOpacity>
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
              <Text style={styles.performanceValue}>
                {avgResponseTime > 0 ? `${avgResponseTime}hrs` : "N/A"}
              </Text>
              <Text style={styles.performanceLabel}>Average Response Time</Text>
            </View>
            <View style={styles.performanceCard}>
              <Text style={styles.performanceIcon}>📋</Text>
              <Text style={styles.performanceValue}>{completedThisWeek}</Text>
              <Text style={styles.performanceLabel}>
                Tasks completed this week
              </Text>
            </View>
            <View style={styles.performanceCard}>
              <Text style={styles.performanceIcon}>👷</Text>
              <Text style={styles.performanceValue}>{activeTechnicians}</Text>
              <Text style={styles.performanceLabel}>Technician Active</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.taskButton}
            onPress={onNavigateToTasks}
          >
            <Text style={styles.taskButtonText}>View All Tasks</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab="home"
        onTabPress={(tab) => {
          if (tab === "request-detail") onNavigateToTasks();
          if (tab === "notifications") onNavigateToNotifications();
        }}
      />
    </SafeAreaView>
  );
};
