import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert, Platform, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../config/theme";
import { ImageOptionsModal } from "./components/ImageOptionsModal";
import styles from "./homeownerStyles";
import { ChatPage } from "./pages/ChatPage";
import { DashboardPage } from "./pages/DashboardPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { RequestDetailPage } from "./pages/RequestDetailPage";
import { SubmitRequestPage } from "./pages/SubmitRequestPage";
import { TechnicalIssuePage } from "./pages/TechnicalIssuePage";

type HomeownerPageType =
  | "dashboard"
  | "submit-request"
  | "request-detail"
  | "chat"
  | "technical-issue"
  | "notifications"
  | "profile";

interface Message {
  id: number;
  sender: string;
  text: string;
  avatar: string;
  isHomeowner: boolean;
  timestamp?: string;
}

interface HomeownerAppProps {
  onLogout: () => void;
}

export const HomeownerApp: React.FC<HomeownerAppProps> = ({ onLogout }) => {
  const [currentPage, setCurrentPage] =
    useState<HomeownerPageType>("dashboard");
  const [messages, setMessages] = useState<Message[]>([
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

  // Helper functions
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

  // Image handlers
  const handleImageUpload = async () => {
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

  const handleTakePhoto = async () => {
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

  const handleRemovePhoto = () => {
    setProfileImage(null);
    setShowImageOptions(false);
  };

  // Navigation handlers
  const handleCategoryPress = (category: string) => {
    setSelectedRequestType(category);
    setCurrentPage("submit-request");
  };

  const handleTypeSelect = (type: string) => {
    setSelectedRequestType(type);
    setShowTypeDropdown(false);
  };

  const handleSubmitRequest = () => {
    if (!selectedRequestType || !unitNumber || !description) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    console.log("Submitting request:", {
      type: selectedRequestType,
      unit: unitNumber,
      description: description,
    });

    setUnitNumber("");
    setDescription("");
    setCurrentPage("request-detail");
  };

  const handleBackToDashboard = () => {
    setSelectedRequestType("");
    setUnitNumber("");
    setDescription("");
    setShowTypeDropdown(false);
    setCurrentPage("dashboard");
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: Message = {
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

  // Render page based on current state
  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <DashboardPage
            profileImage={profileImage}
            showHistoryModal={showHistoryModal}
            requestHistory={requestHistory}
            onNavigateToProfile={() => setCurrentPage("profile")}
            onNavigateToSubmitRequest={() => setCurrentPage("submit-request")}
            onNavigateToNotifications={() => setCurrentPage("notifications")}
            onCategoryPress={handleCategoryPress}
            onShowHistoryModal={() => setShowHistoryModal(true)}
            onHideHistoryModal={() => setShowHistoryModal(false)}
            getStatusStyle={getStatusStyle}
            getStatusText={getStatusText}
          />
        );

      case "submit-request":
        return (
          <SubmitRequestPage
            selectedRequestType={selectedRequestType}
            unitNumber={unitNumber}
            description={description}
            showTypeDropdown={showTypeDropdown}
            maintenanceTypes={maintenanceTypes}
            onBack={handleBackToDashboard}
            onNavigateToNotifications={() => setCurrentPage("notifications")}
            onTypeSelect={handleTypeSelect}
            onShowTypeDropdown={() => setShowTypeDropdown(true)}
            onHideTypeDropdown={() => setShowTypeDropdown(false)}
            onUnitNumberChange={setUnitNumber}
            onDescriptionChange={setDescription}
            onSubmit={handleSubmitRequest}
          />
        );

      case "request-detail":
        return (
          <RequestDetailPage
            selectedRequestType={selectedRequestType}
            unitNumber={unitNumber}
            description={description}
            onBack={() => setCurrentPage("dashboard")}
            onNavigateToSubmitRequest={() => setCurrentPage("submit-request")}
            onNavigateToNotifications={() => setCurrentPage("notifications")}
            onNavigateToChat={() => setCurrentPage("chat")}
          />
        );

      case "chat":
        return (
          <ChatPage
            messages={messages}
            messageInput={messageInput}
            onBack={() => setCurrentPage("request-detail")}
            onNavigateToDashboard={() => setCurrentPage("dashboard")}
            onNavigateToSubmitRequest={() => setCurrentPage("submit-request")}
            onNavigateToNotifications={() => setCurrentPage("notifications")}
            onNavigateToTechnicalIssue={() => setCurrentPage("technical-issue")}
            onMessageInputChange={setMessageInput}
            onSendMessage={handleSendMessage}
          />
        );

      case "technical-issue":
        return (
          <TechnicalIssuePage
            selectedRequestType={selectedRequestType}
            onBack={() => setCurrentPage("chat")}
            onNavigateToDashboard={() => setCurrentPage("dashboard")}
            onNavigateToSubmitRequest={() => setCurrentPage("submit-request")}
            onNavigateToNotifications={() => setCurrentPage("notifications")}
          />
        );

      case "notifications":
        return (
          <NotificationsPage
            onBack={() => setCurrentPage("dashboard")}
            onNavigateToSubmitRequest={() => setCurrentPage("submit-request")}
          />
        );

      case "profile":
        return (
          <ProfilePage
            profileImage={profileImage}
            onBack={() => setCurrentPage("dashboard")}
            onNavigateToSubmitRequest={() => setCurrentPage("submit-request")}
            onNavigateToNotifications={() => setCurrentPage("notifications")}
            onEditAvatar={() => setShowImageOptions(true)}
            onLogout={onLogout}
          />
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      {renderPage()}

      {/* Image Options Modal */}
      <ImageOptionsModal
        visible={showImageOptions}
        profileImage={profileImage}
        onClose={() => setShowImageOptions(false)}
        onTakePhoto={handleTakePhoto}
        onUploadImage={handleImageUpload}
        onRemovePhoto={handleRemovePhoto}
      />
    </SafeAreaView>
  );
};
