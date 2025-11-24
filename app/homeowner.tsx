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
import Icon from "react-native-vector-icons/MaterialIcons";
import { BottomNavigation } from "../components/common/BottomNavigation";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { CategoryGrid } from "../components/homeowner/CategoryGrid";
import { RequestCard } from "../components/homeowner/RequestCard";
import { borderRadius, colors, spacing } from "../config/theme";
import { MOCK_REQUESTS } from "../utils/constants";

type HomeownerPageType =
  | "dashboard"
  | "submit-request"
  | "request-detail"
  | "chat"
  | "technical-issue"
  | "notifications"
  | "profile";

interface HomeownerAppProps {
  onLogout: () => void;
}

export const HomeownerApp: React.FC<HomeownerAppProps> = ({ onLogout }) => {
  const [currentPage, setCurrentPage] = useState<HomeownerPageType>("dashboard");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Homeowner",
      text: "I submitted a maintenance request for the living room.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jerrianne",
      isHomeowner: true,
    },
    {
      id: 2,
      sender: "Admin",
      text: "I've received your request and will take a look as soon as possible.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
      isHomeowner: false,
    },
    {
      id: 3,
      sender: "Homeowner",
      text: "Thank you!",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jerrianne",
      isHomeowner: true,
    },
    {
      id: 4,
      sender: "Admin",
      text: "I've fixed the issue. Please check if the lights are still flickering.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
      isHomeowner: false,
      timestamp: "Delivered on Thursday",
    },
  ]);
  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "Homeowner",
        text: messageInput,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jerrianne",
        isHomeowner: true,
      };
      setMessages([...messages, newMessage]);
      setMessageInput("");
    }
  };

  // Dashboard
  if (currentPage === "dashboard") {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.welcomeBack}>Welcome back,</Text>
              <Text style={styles.userName}>Jerrianne!</Text>
              <Text style={styles.dateText}>Tuesday, January 14, 2025</Text>
            </View>
            <View style={styles.profilePic}>
              <TouchableOpacity onPress={() => setCurrentPage("profile")}>
                <Icon name="account-circle" size={50} color="#555" />
              </TouchableOpacity>
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
        <BottomNavigation
          activeTab="home"
          onTabPress={(tab) => {
            if (tab === "notifications") setCurrentPage("notifications");
            if (tab === "request-detail") setCurrentPage("submit-request");
          }}
        />
      </View>
    );
  }

  // Submit Request Page
  if (currentPage === "submit-request") {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {/* Header */}
          <View style={styles.pageHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setCurrentPage("dashboard")}
            >
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.pageTitle}>Submit Request</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input placeholder="Select Type" style={styles.input} />
            <Input placeholder="Unit / House No." style={styles.input} />
            <Input
              placeholder="Short Description"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              style={styles.textarea}
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
          activeTab="requests"
          onTabPress={(tab) => {
            if (tab === "home") setCurrentPage("dashboard");
            if (tab === "notifications") setCurrentPage("notifications");
          }}
        />
      </View>
    );
  }

  // Request Detail Page
  if (currentPage === "request-detail") {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.pageHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentPage("dashboard")}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Request Detail</Text>
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

        {/* Bottom Navigation */}
        <BottomNavigation
          activeTab="home"
          onTabPress={(tab) => {
            if (tab === "home") setCurrentPage("dashboard");
            if (tab === "request-detail") setCurrentPage("submit-request");
            if (tab === "notifications") setCurrentPage("notifications");
          }}
        />
      </View>
    );
  }

  // Chat Page
  if (currentPage === "chat") {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.pageHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentPage("request-detail")}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Chat</Text>
        </View>

        {/* Chat Messages */}
        <ScrollView style={styles.chatContainer}>
          {messages.map((message) => (
            <View key={message.id} style={styles.messageGroup}>
              <View
                style={[
                  styles.messageHeader,
                  !message.isHomeowner && styles.messageHeaderRight,
                ]}
              >
                {message.isHomeowner ? (
                  <>
                    <Image
                      source={{ uri: message.avatar }}
                      style={styles.messageAvatar}
                    />
                    <Text style={styles.messageSender}>{message.sender}</Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.messageSender}>{message.sender}</Text>
                    <Image
                      source={{ uri: message.avatar }}
                      style={styles.messageAvatar}
                    />
                  </>
                )}
              </View>
              <View
                style={
                  message.isHomeowner ? styles.messageLeft : styles.messageRight
                }
              >
                <View
                  style={
                    message.isHomeowner
                      ? styles.messageBubbleLeft
                      : styles.messageBubbleRight
                  }
                >
                  <Text
                    style={
                      message.isHomeowner
                        ? styles.messageTextLeft
                        : styles.messageTextRight
                    }
                  >
                    {message.text}
                  </Text>
                </View>
                {message.timestamp && (
                  <Text style={styles.messageTimestamp}>
                    {message.timestamp}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Message Input */}
        <View style={styles.chatFooter}>
          <View style={styles.messageInputContainer}>
            <Input
              placeholder="Type a message..."
              value={messageInput}
              onChangeText={setMessageInput}
              style={styles.messageInput}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendMessage}
            >
              <Icon name="send" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
          <Button
            title="Continue"
            onPress={() => setCurrentPage("technical-issue")}
            variant="accent"
            style={styles.continueButton}
          />
        </View>

        {/* Bottom Navigation */}
        <BottomNavigation
          activeTab="home"
          onTabPress={(tab) => {
            if (tab === "home") setCurrentPage("dashboard");
            if (tab === "request-detail") setCurrentPage("submit-request");
            if (tab === "notifications") setCurrentPage("notifications");
          }}
        />
      </View>
    );
  }

  // Technical Issue Page
  if (currentPage === "technical-issue") {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.pageHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentPage("chat")}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Technical Issue</Text>
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
                  <Text style={styles.technicianName}>
                    Jerrianne Alejandria
                  </Text>
                  <Text style={styles.technicianDate}>October 20</Text>
                </View>
              </View>

              <Button
                title="Done"
                onPress={() => setCurrentPage("dashboard")}
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
            if (tab === "home") setCurrentPage("dashboard");
            if (tab === "request-detail") setCurrentPage("submit-request");
            if (tab === "notifications") setCurrentPage("notifications");
          }}
        />
      </View>
    );
  }

  // Notifications Page
  if (currentPage === "notifications") {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.notificationHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentPage("dashboard")}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.notificationTitle}>Notification</Text>
            <Text style={styles.notificationDate}>
              Tuesday, January 14, 2025
            </Text>
          </View>
        </View>

        {/* Notifications List */}
        <ScrollView style={styles.notificationsList}>
          <View style={styles.notificationCard}>
            <TouchableOpacity style={styles.notificationItem}>
              <Text style={styles.notificationText}>Completed Request</Text>
              <Text style={styles.notificationTime}>Just now</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.notificationCard}>
            <TouchableOpacity style={styles.notificationItem}>
              <Text style={styles.notificationText}>Pending Request</Text>
              <Text style={styles.notificationTime}>1 hr ago</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.notificationCard}>
            <TouchableOpacity style={styles.notificationItem}>
              <Text style={styles.notificationText}>Pending Request</Text>
              <Text style={styles.notificationTime}>2 hrs ago</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.notificationCard}>
            <TouchableOpacity style={styles.notificationItem}>
              <Text style={styles.notificationText}>In progress Request</Text>
              <Text style={styles.notificationTime}>4 hrs ago</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.notificationCard}>
            <TouchableOpacity style={styles.notificationItem}>
              <Text style={styles.notificationText}>Completed Request</Text>
              <Text style={styles.notificationTime}>1 day ago</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.notificationCard}>
            <TouchableOpacity style={styles.notificationItem}>
              <Text style={styles.notificationText}>Completed Request</Text>
              <Text style={styles.notificationTime}>2 days ago</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <BottomNavigation
          activeTab="notifications"
          onTabPress={(tab) => {
            if (tab === "home") setCurrentPage("dashboard");
            if (tab === "request-detail") setCurrentPage("submit-request");
          }}
        />
      </View>
    );
  }

  // Profile Page
  if (currentPage === "profile") {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.pageHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentPage("dashboard")}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Profile</Text>
        </View>

        {/* Profile Content */}
        <ScrollView style={styles.profileContainer}>
          {/* Profile Avatar Section */}
          <View style={styles.profileAvatarSection}>
            <Image
              source={{
                uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jerrianne",
              }}
              style={styles.profileAvatarLarge}
            />
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
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  } as ViewStyle,
  scrollView: {
    flex: 1,
  } as ViewStyle,
  scrollContent: {
    paddingBottom: 100,
  } as ViewStyle,
  header: {
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
  heroBanner: {
    marginVertical: spacing.xl,
    height: 400,
    width: "100%",
    alignSelf: "stretch",
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
  pageHeader: {
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
  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
  } as TextStyle,
  form: {
    padding: spacing.xxl,
    paddingHorizontal: spacing.xl,
  } as ViewStyle,
  input: {
    marginBottom: spacing.xl,
  } as TextStyle,
  textarea: {
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
    paddingBottom: 80,
  } as ViewStyle,
  messageInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  } as ViewStyle,
  messageInput: {
    flex: 1,
    marginBottom: 0,
  } as TextStyle,
  sendButton: {
    backgroundColor: colors.accent,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
  continueButton: {
    marginTop: spacing.md,
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
  notificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  } as ViewStyle,
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  } as TextStyle,
  notificationDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  } as TextStyle,
  notificationsList: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  } as ViewStyle,
  notificationCard: {
    backgroundColor: colors.white,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  } as ViewStyle,
  notificationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  } as ViewStyle,
  notificationText: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  } as TextStyle,
  notificationTime: {
    fontSize: 13,
    color: "#999",
  } as TextStyle,
  profileContainer: {
    flex: 1,
    padding: spacing.xl,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  } as ViewStyle,
  profileAvatarSection: {
    alignItems: "center",
    marginBottom: spacing.xl,
  } as ViewStyle,
  profileAvatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  } as ImageStyle,
  profileRole: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  } as TextStyle,
  profileCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: spacing.xl,
  } as ViewStyle,
  profileField: {
    marginBottom: 20,
  } as ViewStyle,
  profileFieldLabel: {
    fontSize: 13,
    color: "#666",
    marginBottom: 6,
  } as TextStyle,
  profileFieldValueContainer: {
    padding: 12,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  } as ViewStyle,
  profileFieldValue: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  } as TextStyle,
  logoutButton: {
    width: "100%",
    padding: 14,
    backgroundColor: colors.accent,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: spacing.xxl,
  } as ViewStyle,
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
  } as TextStyle,
});
