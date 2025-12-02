import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { BottomNavigation } from "../../../components/common/BottomNavigation";
import { Button } from "../../../components/common/Button";
import styles from "./requestDetailStyles";

interface RequestDetailPageProps {
  selectedRequestType: string;
  unitNumber: string;
  description: string;
  onBack: () => void;
  onNavigateToSubmitRequest: () => void;
  onNavigateToNotifications: () => void;
  onNavigateToChat: () => void;
}

export const RequestDetailPage: React.FC<RequestDetailPageProps> = ({
  selectedRequestType,
  unitNumber,
  description,
  onBack,
  onNavigateToSubmitRequest,
  onNavigateToNotifications,
  onNavigateToChat,
}) => {
  return (
    <>
      {/* Header */}
      <View style={styles.pageHeader}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Request Detail</Text>
      </View>

      {/* Request Detail Card */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <View style={styles.detailContainer}>
          <View style={styles.detailCard}>
            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>
                {selectedRequestType || "Maintenance"}
              </Text>
              <Text style={styles.detailSubtext}>Request Submitted</Text>
            </View>

            <View style={styles.detailDivider} />

            <View style={styles.detailSection}>
              <Text style={styles.detailTitle}>Request ID</Text>
              <Text style={styles.detailValue}>
                REQ-{Date.now().toString().slice(-6)}
              </Text>
            </View>

            <View style={styles.detailDivider} />

            <View style={styles.detailSection}>
              <Text style={styles.detailTitle}>Unit Number</Text>
              <Text style={styles.detailValue}>
                {unitNumber || "Not specified"}
              </Text>
            </View>

            <View style={styles.detailDivider} />

            <View style={styles.detailSection}>
              <Text style={styles.detailTitle}>Description</Text>
              <Text style={styles.detailValue}>
                {description || "No description provided"}
              </Text>
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
              onPress={onNavigateToChat}
              variant="accent"
              style={styles.chatButton}
            />
          </View>
        </View>
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
