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
  const [currentPage, setCurrentPage] =
    useState<HomeownerPageType>("dashboard");
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
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [selectedRequestType, setSelectedRequestType] = useState<string>("");
  const [unitNumber, setUnitNumber] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Available maintenance types
  const maintenanceTypes = [
    "Plumbing/Leaks",
    "Electrical",
    "Air Conditioning",
    "Appliances",
    "General Maintenance",
    "Pest Control",
    "Structural Issues",
    "Landscaping",
    "Cleaning Services",
    "Emergency Repair",
  ];

  // Mock history data
  const requestHistory = [
    {
      id: "REQ-2025-0012",
      type: "Plumbing/Leaks",
      date: "2025-10-25",
      status: "completed",
      unit: "Unit 12A",
      description: "Kitchen sink leaking",
    },
    {
      id: "REQ-2025-0003",
      type: "Electrical",
      date: "2025-10-18",
      status: "completed",
      unit: "Unit 5A",
      description: "Living room lights not working",
    },
    {
      id: "REQ-2025-0006",
      type: "General Maintenance",
      date: "2025-09-28",
      status: "completed",
      unit: "Unit 7C",
      description: "Door handle repair",
    },
    {
      id: "REQ-2025-0201",
      type: "Air Conditioning",
      date: "2025-08-20",
      status: "completed",
      unit: "Unit 10C",
      description: "AC not cooling properly",
    },
    {
      id: "REQ-2025-0101",
      type: "Pest Control",
      date: "2025-07-24",
      status: "completed",
      unit: "Unit 33H",
      description: "Ant infestation in kitchen",
    },
    {
      id: "REQ-2025-0040",
      type: "Appliances",
      date: "2025-04-15",
      status: "completed",
      unit: "Unit 3E",
      description: "Refrigerator not cooling",
    },
    {
      id: "REQ-2025-0901",
      type: "Electrical",
      date: "2025-04-13",
      status: "completed",
      unit: "Unit 9B",
      description: "Power outlet not working",
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
    return { uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jerrianne" };
  };

  // Function to handle category selection
  const handleCategoryPress = (category: string) => {
    setSelectedRequestType(category);
    setCurrentPage("submit-request");
  };

  // Function to handle type selection from dropdown
  const handleTypeSelect = (type: string) => {
    setSelectedRequestType(type);
    setShowTypeDropdown(false);
  };

  // Function to handle form submission
  const handleSubmitRequest = () => {
    if (!selectedRequestType || !unitNumber || !description) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // Here you would typically send the data to your backend
    console.log("Submitting request:", {
      type: selectedRequestType,
      unit: unitNumber,
      description: description,
    });

    // Reset form and navigate to request detail
    setUnitNumber("");
    setDescription("");
    setCurrentPage("request-detail");
  };

  // Function to clear form when navigating back to dashboard
  const handleBackToDashboard = () => {
    setSelectedRequestType("");
    setUnitNumber("");
    setDescription("");
    setShowTypeDropdown(false);
    setCurrentPage("dashboard");
  };

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
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
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
            <TouchableOpacity
              style={styles.profilePic}
              onPress={() => setCurrentPage("profile")}
            >
              <Image
                source={getProfileImageSource()}
                style={styles.profileImage}
              />
            </TouchableOpacity>
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
              <Text style={styles.bannerTextIssue}>Report an Issue</Text>
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
            <TouchableOpacity onPress={() => setShowHistoryModal(true)}>
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
          <CategoryGrid onCategoryPress={handleCategoryPress} />
        </ScrollView>

        {/* View History Modal */}
        <Modal
          visible={showHistoryModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowHistoryModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.historyModal}>
              <View style={styles.historyHeader}>
                <Text style={styles.historyTitle}>Request History</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowHistoryModal(false)}
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
            if (tab === "notifications") setCurrentPage("notifications");
            if (tab === "request-detail") setCurrentPage("submit-request");
          }}
        />
      </SafeAreaView>
    );
  }

  // Submit Request Page
  if (currentPage === "submit-request") {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

        {/* Type Dropdown Modal */}
        <Modal
          visible={showTypeDropdown}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowTypeDropdown(false)}
        >
          <TouchableOpacity
            style={styles.dropdownOverlay}
            activeOpacity={1}
            onPress={() => setShowTypeDropdown(false)}
          >
            <View style={styles.dropdownModal}>
              <View style={styles.dropdownHeader}>
                <Text style={styles.dropdownTitle}>Select Request Type</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowTypeDropdown(false)}
                >
                  <Icon name="close" size={24} color={colors.text.primary} />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.dropdownList}>
                {maintenanceTypes.map((type, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dropdownItem,
                      selectedRequestType === type &&
                        styles.selectedDropdownItem,
                    ]}
                    onPress={() => handleTypeSelect(type)}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        selectedRequestType === type &&
                          styles.selectedDropdownItemText,
                      ]}
                    >
                      {type}
                    </Text>
                    {selectedRequestType === type && (
                      <Icon name="check" size={20} color={colors.accent} />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </TouchableOpacity>
        </Modal>

        <ScrollView style={styles.scrollView}>
          {/* Header */}
          <View style={styles.pageHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackToDashboard}
            >
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.pageTitle}>Submit Request</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Type Input with Dropdown */}
            <View style={styles.typeInputContainer}>
              <TouchableOpacity
                style={styles.typeInput}
                onPress={() => setShowTypeDropdown(true)}
              >
                <View
                  style={[
                    styles.inputContainer,
                    selectedRequestType
                      ? styles.filledInput
                      : styles.emptyInput,
                  ]}
                >
                  <Text
                    style={[
                      styles.typeInputText,
                      selectedRequestType
                        ? styles.filledText
                        : styles.placeholderText,
                    ]}
                  >
                    {selectedRequestType || "Select Type"}
                  </Text>
                  <Icon
                    name="keyboard-arrow-down"
                    size={24}
                    color={colors.text.secondary}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <Input
              placeholder="Unit / House No."
              style={styles.input}
              value={unitNumber}
              onChangeText={setUnitNumber}
            />
            <Input
              placeholder="Short Description"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              style={styles.textarea}
              value={description}
              onChangeText={setDescription}
            />
            <Button
              title="Submit Request"
              onPress={handleSubmitRequest}
              variant="accent"
            />
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <BottomNavigation
          activeTab="requests"
          onTabPress={(tab) => {
            if (tab === "home") handleBackToDashboard();
            if (tab === "notifications") setCurrentPage("notifications");
          }}
        />
      </SafeAreaView>
    );
  }

  // Request Detail Page
  if (currentPage === "request-detail") {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
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
      </SafeAreaView>
    );
  }

  // Chat Page
  if (currentPage === "chat") {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
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
      </SafeAreaView>
    );
  }

  // Technical Issue Page
  if (currentPage === "technical-issue") {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
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
      </SafeAreaView>
    );
  }

  // Notifications Page
  if (currentPage === "notifications") {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
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
      </SafeAreaView>
    );
  }

  // Profile Page
  if (currentPage === "profile") {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
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
        <BottomNavigation
          activeTab="home"
          onTabPress={(tab) => {
            if (tab === "home") setCurrentPage("dashboard");
            if (tab === "request-detail") setCurrentPage("submit-request");
            if (tab === "notifications") setCurrentPage("notifications");
          }}
        />
      </SafeAreaView>
    );
  }

  return null;
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
    paddingTop: spacing.lg,
    backgroundColor: colors.white,
    marginTop: 8,
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
    borderWidth: 2,
    borderColor: colors.border,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  heroBanner: {
    minHeight: 350,
    width: "100%",
    alignSelf: "stretch",
    backgroundColor: colors.secondary,
    overflow: "hidden",
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(27, 126, 7, 0.4)",
  },
  bannerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
    zIndex: 2,
  },
  bannerTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: colors.white,
    textAlign: "center",
    marginBottom: 14,
  },
  bannerSubtitle: {
    fontStyle: "italic",
    fontSize: 16,
    color: colors.white,
    marginBottom: 8,
  },
  bannerQuick: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.category.accent,
    letterSpacing: 2,
    marginBottom: 7,
  },
  bannerTextIssue: {
    fontSize: 15,
    color: colors.category.accent,
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
  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.lg,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.lg,
    marginTop: 8,
  },
  backButton: {
    padding: spacing.sm,
  },
  backIcon: {
    fontSize: 24,
    color: colors.text.primary,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  form: {
    padding: spacing.xxl,
    paddingHorizontal: spacing.xl,
  },
  // Updated input styles for type selection with dropdown
  typeInputContainer: {
    marginBottom: spacing.xl,
  },
  typeInput: {
    marginBottom: 0,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filledInput: {
    borderColor: colors.accent,
    backgroundColor: "#f0f9ff",
  },
  emptyInput: {
    borderColor: colors.border,
  },
  typeInputText: {
    fontSize: 16,
    flex: 1,
  },
  filledText: {
    color: colors.text.primary,
    fontWeight: "600",
  },
  placeholderText: {
    color: colors.text.tertiary,
  },
  // Dropdown Modal styles
  dropdownOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    padding: spacing.xl,
  },
  dropdownModal: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  closeButton: {
    padding: spacing.xs,
  },
  dropdownList: {
    maxHeight: 400,
  },
  dropdownItem: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedDropdownItem: {
    backgroundColor: "#f0f9ff",
  },
  dropdownItemText: {
    fontSize: 16,
    color: colors.text.primary,
    flex: 1,
  },
  selectedDropdownItemText: {
    color: colors.accent,
    fontWeight: "600",
  },
  input: {
    marginBottom: spacing.xl,
  },
  textarea: {
    minHeight: 100,
    marginBottom: spacing.xl,
  },
  detailContainer: {
    padding: spacing.xl,
  },
  detailCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailSection: {
    marginBottom: spacing.lg,
  },
  detailLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  detailSubtext: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  detailDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  detailTitle: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.status.pending.bg,
  },
  statusText: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: "600",
  },
  chatButton: {
    marginTop: spacing.xl,
  },
  chatContainer: {
    flex: 1,
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  messageGroup: {
    marginBottom: spacing.xl,
  },
  messageHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  messageHeaderRight: {
    justifyContent: "flex-end",
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  messageSender: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.primary,
  },
  messageLeft: {
    alignItems: "flex-start",
  },
  messageRight: {
    alignItems: "flex-end",
  },
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
  },
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
  },
  messageTextLeft: {
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 20,
  },
  messageTextRight: {
    fontSize: 14,
    color: colors.white,
    lineHeight: 20,
  },
  messageTimestamp: {
    fontSize: 12,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
  },
  chatFooter: {
    padding: spacing.xl,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingBottom: 80,
  },
  messageInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  messageInput: {
    flex: 1,
    marginBottom: 0,
  },
  sendButton: {
    backgroundColor: colors.accent,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  continueButton: {
    marginTop: spacing.md,
  },
  technicalContainer: {
    padding: spacing.xl,
  },
  technicalCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  updateLabel: {
    backgroundColor: colors.accent,
    alignSelf: "flex-start",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.lg,
  },
  updateLabelText: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.white,
    letterSpacing: 1,
  },
  updateText: {
    fontSize: 16,
    color: colors.text.primary,
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  technicianInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  technicianAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  technicianDetails: {
    flex: 1,
  },
  technicianName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  technicianDate: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  doneButton: {
    marginTop: spacing.md,
  },
  notificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    paddingHorizontal: 20,
    paddingTop: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    marginTop: 8,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  notificationDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  notificationsList: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  notificationCard: {
    backgroundColor: colors.white,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  notificationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  notificationText: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },
  notificationTime: {
    fontSize: 13,
    color: "#999",
  },
  profileContainer: {
    flex: 1,
    padding: spacing.xl,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
  profileAvatarSection: {
    alignItems: "center",
    marginBottom: spacing.xl,
    marginTop: 16,
  },
  avatarContainer: {
    position: "relative",
    alignItems: "center",
  },
  profileAvatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: colors.border,
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: colors.accent,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  editAvatarIcon: {
    fontSize: 14,
    color: colors.white,
  },
  profileRole: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
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
  },
  profileField: {
    marginBottom: 20,
  },
  profileFieldLabel: {
    fontSize: 13,
    color: "#666",
    marginBottom: 6,
  },
  profileFieldValueContainer: {
    padding: 12,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  profileFieldValue: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },
  logoutButton: {
    width: "100%",
    padding: 14,
    backgroundColor: colors.accent,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: spacing.xxl,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: colors.text.primary,
  },
  historyModal: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  historyList: {
    padding: spacing.lg,
  },
  historyCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  historyCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  historyRequestId: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  historyStatusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 10,
    fontWeight: "bold",
    overflow: "hidden",
  },
  historyType: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  historyDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  historyCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  historyUnit: {
    fontSize: 12,
    color: colors.text.tertiary,
  },
  historyDate: {
    fontSize: 12,
    color: colors.text.tertiary,
  },
  imageOptionsModal: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  optionButton: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: "center",
  },
  optionButtonText: {
    fontSize: 16,
    color: colors.accent,
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
    backgroundColor: colors.background,
    borderRadius: 12,
    borderBottomWidth: 0,
  },
  cancelButtonText: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: "600",
  },
});
