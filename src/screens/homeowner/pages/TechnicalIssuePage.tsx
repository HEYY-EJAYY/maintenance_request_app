import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { BottomNavigation } from "../../../components/common/BottomNavigation";
import { Button } from "../../../components/common/Button";
import styles from "./technicalIssueStyles";

interface TechnicalIssuePageProps {
  selectedRequestType: string;
  onBack: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToSubmitRequest: () => void;
  onNavigateToNotifications: () => void;
}

export const TechnicalIssuePage: React.FC<TechnicalIssuePageProps> = ({
  selectedRequestType,
  onBack,
  onNavigateToDashboard,
  onNavigateToSubmitRequest,
  onNavigateToNotifications,
}) => {
  return (
    <>
      {/* Header */}
      <View style={styles.pageHeader}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Technical Issue</Text>
      </View>

      {/* Update Card */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <View style={styles.technicalContainer}>
          <View style={styles.technicalCard}>
            <View style={styles.updateLabel}>
              <Text style={styles.updateLabelText}>UPDATE</Text>
            </View>
            <Text style={styles.updateText}>
              The {selectedRequestType.toLowerCase()} issue has been resolved.
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
              onPress={onNavigateToDashboard}
              variant="accent"
              style={styles.doneButton}
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab="home"
        onTabPress={(tab) => {
          if (tab === "home") onNavigateToDashboard();
          if (tab === "request-detail") onNavigateToSubmitRequest();
          if (tab === "notifications") onNavigateToNotifications();
        }}
      />
    </>
  );
};
