import React from "react";
import {
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { BottomNavigation } from "../../../components/common/BottomNavigation";
import { Button } from "../../../components/common/Button";
import { CategoryGrid } from "../../../components/homeowner/CategoryGrid";
import { RequestCard } from "../../../components/homeowner/RequestCard";
import { colors } from "../../../config/theme";
import { MOCK_REQUESTS } from "../../../utils/constants";
import styles from "./dashboardStyles";

interface DashboardPageProps {
  profileImage: string | null;
  showHistoryModal: boolean;
  requestHistory: any[];
  onNavigateToProfile: () => void;
  onNavigateToSubmitRequest: () => void;
  onNavigateToNotifications: () => void;
  onCategoryPress: (category: string) => void;
  onShowHistoryModal: () => void;
  onHideHistoryModal: () => void;
  getStatusStyle: (status: string) => any;
  getStatusText: (status: string) => string;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  profileImage,
  showHistoryModal,
  requestHistory,
  onNavigateToProfile,
  onNavigateToSubmitRequest,
  onNavigateToNotifications,
  onCategoryPress,
  onShowHistoryModal,
  onHideHistoryModal,
  getStatusStyle,
  getStatusText,
}) => {
  const getProfileImageSource = () => {
    if (profileImage) {
      return { uri: profileImage };
    }
    return { uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jerrianne" };
  };

  return (
    <>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 80 }]}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeBack}>Welcome back,</Text>
            <Text style={styles.userName}>Jerrianne!</Text>
            <Text style={styles.dateText}>Tuesday, January 14, 2025</Text>
          </View>
          <TouchableOpacity
            style={styles.profilePic}
            onPress={onNavigateToProfile}
          >
            <Image
              source={getProfileImageSource()}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* Hero Banner */}
        <ImageBackground
          source={require("../../../assets/images/camella.jpeg")}
          style={styles.heroBanner}
          resizeMode="cover"
        >
          <View style={styles.bannerOverlay} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>COMMUNITY CARE & ASSISTANCE</Text>
            <Text style={styles.bannerSubtitle}>Need Help?</Text>
            <Text style={styles.bannerQuick}>QUICK SERVICE</Text>
            <Text style={styles.bannerTextIssue}>Report an Issue</Text>
            <Button
              title="Submit Request"
              onPress={onNavigateToSubmitRequest}
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
          <TouchableOpacity onPress={onShowHistoryModal}>
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
        <CategoryGrid onCategoryPress={onCategoryPress} />
      </ScrollView>

      {/* View History Modal */}
      <Modal
        visible={showHistoryModal}
        transparent={true}
        animationType="slide"
        onRequestClose={onHideHistoryModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.historyModal}>
            <View style={styles.historyHeader}>
              <Text style={styles.historyTitle}>Request History</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={onHideHistoryModal}
              >
                <Icon name="close" size={24} color={colors.text.primary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.historyList}>
              {requestHistory.map((request, index) => (
                <View key={index} style={styles.historyCard}>
                  <View style={styles.historyCardHeader}>
                    <Text style={styles.historyRequestId}>{request.id}</Text>
                    <Text
                      style={[
                        styles.historyStatusBadge,
                        getStatusStyle(request.status),
                      ]}
                    >
                      {getStatusText(request.status)}
                    </Text>
                  </View>

                  <Text style={styles.historyType}>{request.type}</Text>
                  <Text style={styles.historyDescription}>
                    {request.description}
                  </Text>

                  <View style={styles.historyCardFooter}>
                    <Text style={styles.historyUnit}>{request.unit}</Text>
                    <Text style={styles.historyDate}>{request.date}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab="home"
        onTabPress={(tab) => {
          if (tab === "notifications") onNavigateToNotifications();
          if (tab === "request-detail") onNavigateToSubmitRequest();
        }}
      />
    </>
  );
};
