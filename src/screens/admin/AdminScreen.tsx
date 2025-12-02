import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import styles from "./adminStyles";
import { AssignTechnicianModal } from "./components/AssignTechnicianModal";
import { CompleteRequestModal } from "./components/CompleteRequestModal";
import { RequestDetailModal } from "./components/RequestDetailModal";
import { RequestModal } from "./components/RequestModal";
import { DashboardPage } from "./pages/DashboardPage";
import { MaintenanceRequestsPage } from "./pages/MaintenanceRequestsPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { ProfilePage } from "./pages/ProfilePage";

type AdminPageType =
  | "admin-dashboard"
  | "admin-profile"
  | "admin-notifications"
  | "maintenance-requests";

interface AdminAppProps {
  onLogout: () => void;
}

export const AdminApp: React.FC<AdminAppProps> = ({ onLogout }) => {
  const [currentPage, setCurrentPage] =
    useState<AdminPageType>("admin-dashboard");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [showInProgressModal, setShowInProgressModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showRequestDetailModal, setShowRequestDetailModal] = useState(false);
  const [showAssignTechnicianModal, setShowAssignTechnicianModal] =
    useState(false);
  const [technicianName, setTechnicianName] = useState("");
  const [technicianNotes, setTechnicianNotes] = useState("");
  const [showCompleteRequestModal, setShowCompleteRequestModal] =
    useState(false);
  const [completionNotes, setCompletionNotes] = useState("");

  // Mock data for requests with initial state
  const [allRequests, setAllRequests] = useState([
    {
      id: "REQ-2025-0012",
      date: "2025-10-25",
      type: "Plumbing",
      status: "pending",
      unit: "Unit 12A",
      description: "Kitchen sink leaking",
      priority: "High",
      assignedTechnician: "",
      technicianNotes: "",
      completionNotes: "",
      completedDate: "",
    },
    {
      id: "REQ-2025-0033",
      date: "2025-10-26",
      type: "Electrical",
      status: "in-progress",
      unit: "Unit 18B",
      description: "Power outlet not working",
      priority: "Medium",
      assignedTechnician: "John Smith",
      technicianNotes: "Checking wiring connections",
      completionNotes: "",
      completedDate: "",
    },
    {
      id: "REQ-2025-0025",
      date: "2025-10-27",
      type: "HVAC",
      status: "completed",
      unit: "Unit 05C",
      description: "AC not cooling properly",
      priority: "High",
      assignedTechnician: "Mike Johnson",
      technicianNotes: "Refrigerant refill needed",
      completionNotes: "Refilled refrigerant and cleaned filters",
      completedDate: "2025-10-28",
    },
    {
      id: "REQ-2025-0018",
      date: "2025-10-24",
      type: "Plumbing",
      status: "completed",
      unit: "Unit 22D",
      description: "Toilet flush not working",
      priority: "Medium",
      assignedTechnician: "Sarah Lee",
      technicianNotes: "Checking flush mechanism",
      completionNotes: "Replaced flush valve",
      completedDate: "2025-10-25",
    },
    {
      id: "REQ-2025-0041",
      date: "2025-10-28",
      type: "Electrical",
      status: "pending",
      unit: "Unit 09A",
      description: "Dimmer switch malfunctioning",
      priority: "Low",
      assignedTechnician: "",
      technicianNotes: "",
      completionNotes: "",
      completedDate: "",
    },
    {
      id: "REQ-2025-0037",
      date: "2025-10-27",
      type: "Appliance",
      status: "in-progress",
      unit: "Unit 15B",
      description: "Water heater temperature issue",
      priority: "High",
      assignedTechnician: "John Smith",
      technicianNotes: "Inspecting thermostat",
      completionNotes: "",
      completedDate: "",
    },
  ]);

  // Computed states
  const pendingRequests = allRequests.filter((req) => req.status === "pending");
  const inProgressRequests = allRequests.filter(
    (req) => req.status === "in-progress"
  );
  const completedRequests = allRequests.filter(
    (req) => req.status === "completed"
  );

  // Helper functions
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending":
        return { backgroundColor: "#fbbf24", color: "#92400e" };
      case "in-progress":
        return { backgroundColor: "#93c5fd", color: "#1e3a8a" };
      case "completed":
        return { backgroundColor: "#86efac", color: "#14532d" };
      default:
        return { backgroundColor: "#d1d5db", color: "#374151" };
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return { backgroundColor: "#fca5a5", color: "#7f1d1d" };
      case "medium":
        return { backgroundColor: "#fde047", color: "#713f12" };
      case "low":
        return { backgroundColor: "#d1d5db", color: "#374151" };
      default:
        return { backgroundColor: "#e5e7eb", color: "#6b7280" };
    }
  };

  const getProfileImageSource = () => {
    if (profileImage) {
      return { uri: profileImage };
    }
    return { uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" };
  };

  // Image picker handlers
  const handleTakePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Camera permission is needed");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      setProfileImage(result.assets[0].uri);
      setShowImageOptions(false);
    }
  };

  const handleChoosePhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Media library permission is needed");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      setProfileImage(result.assets[0].uri);
      setShowImageOptions(false);
    }
  };

  const handleRemovePhoto = () => {
    setProfileImage(null);
    setShowImageOptions(false);
  };

  // Request handlers
  const handleRequestClick = (request: any) => {
    setSelectedRequest(request);
    setShowRequestDetailModal(true);
  };

  const handleAssignTechnician = () => {
    if (!selectedRequest) return;

    if (!technicianName.trim()) {
      Alert.alert("Error", "Please enter technician name");
      return;
    }

    const updatedRequests = allRequests.map((req) =>
      req.id === selectedRequest.id
        ? {
            ...req,
            status: "in-progress",
            assignedTechnician: technicianName,
            technicianNotes: technicianNotes,
          }
        : req
    );

    setAllRequests(updatedRequests);
    setShowAssignTechnicianModal(false);
    setShowRequestDetailModal(false);
    setTechnicianName("");
    setTechnicianNotes("");
    setSelectedRequest(null);
    Alert.alert(
      "Success",
      "Technician assigned and status updated to In Progress"
    );
  };

  const handleCompleteRequest = () => {
    if (!selectedRequest) return;

    if (!completionNotes.trim()) {
      Alert.alert("Error", "Please enter completion notes");
      return;
    }

    const updatedRequests = allRequests.map((req) =>
      req.id === selectedRequest.id
        ? {
            ...req,
            status: "completed",
            completionNotes: completionNotes,
            completedDate: new Date().toISOString().split("T")[0],
          }
        : req
    );

    setAllRequests(updatedRequests);
    setShowCompleteRequestModal(false);
    setShowRequestDetailModal(false);
    setCompletionNotes("");
    setSelectedRequest(null);
    Alert.alert("Success", "Request marked as completed");
  };

  // Render appropriate page based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case "maintenance-requests":
        return (
          <MaintenanceRequestsPage
            allRequests={allRequests}
            pendingRequests={pendingRequests}
            inProgressRequests={inProgressRequests}
            completedRequests={completedRequests}
            getStatusStyle={getStatusStyle}
            getStatusText={getStatusText}
            getPriorityStyle={getPriorityStyle}
            onRequestClick={handleRequestClick}
            onBack={() => setCurrentPage("admin-dashboard")}
            onShowPendingModal={() => setShowPendingModal(true)}
            onShowInProgressModal={() => setShowInProgressModal(true)}
            onShowCompletedModal={() => setShowCompletedModal(true)}
            onNavigateToNotifications={() =>
              setCurrentPage("admin-notifications")
            }
          />
        );

      case "admin-notifications":
        return (
          <NotificationsPage
            onBack={() => setCurrentPage("admin-dashboard")}
            onNavigateToTasks={() => setCurrentPage("maintenance-requests")}
            onNavigateToHome={() => setCurrentPage("admin-dashboard")}
            onNavigateToAlerts={() => setCurrentPage("admin-notifications")}
          />
        );

      case "admin-profile":
        return (
          <ProfilePage
            profileImage={profileImage}
            getProfileImageSource={getProfileImageSource}
            onImagePress={() => setShowImageOptions(true)}
            onBack={() => setCurrentPage("admin-dashboard")}
            onNavigateToTasks={() => setCurrentPage("maintenance-requests")}
            onNavigateToHome={() => setCurrentPage("admin-dashboard")}
            onNavigateToAlerts={() => setCurrentPage("admin-notifications")}
            onLogout={onLogout}
          />
        );

      default:
        return (
          <DashboardPage
            allRequests={allRequests}
            pendingRequests={pendingRequests}
            inProgressRequests={inProgressRequests}
            completedRequests={completedRequests}
            profileImage={profileImage}
            getProfileImageSource={getProfileImageSource}
            onProfilePress={() => setCurrentPage("admin-profile")}
            onShowAllRequests={() => setShowRequestsModal(true)}
            onShowPending={() => setShowPendingModal(true)}
            onShowCompleted={() => setShowCompletedModal(true)}
            onShowInProgress={() => setShowInProgressModal(true)}
            onNavigateToTasks={() => setCurrentPage("maintenance-requests")}
            onNavigateToHome={() => setCurrentPage("admin-dashboard")}
            onNavigateToAlerts={() => setCurrentPage("admin-notifications")}
          />
        );
    }
  };

  // Main render
  return (
    <>
      {/* Render current page */}
      {renderPage()}

      {/* Shared Modals */}
      <RequestModal
        visible={showRequestsModal}
        onClose={() => setShowRequestsModal(false)}
        title={`All Requests (${allRequests.length})`}
        requests={allRequests}
        showStatus={true}
        clickable={true}
        onRequestClick={(request) => {
          setSelectedRequest(request);
          setShowRequestDetailModal(true);
          setShowRequestsModal(false);
        }}
        getStatusStyle={getStatusStyle}
        getStatusText={getStatusText}
        getPriorityStyle={getPriorityStyle}
      />

      <RequestModal
        visible={showPendingModal}
        onClose={() => setShowPendingModal(false)}
        title={`Pending Requests (${pendingRequests.length})`}
        requests={pendingRequests}
        showStatus={true}
        clickable={true}
        onRequestClick={(request) => {
          setSelectedRequest(request);
          setShowRequestDetailModal(true);
          setShowPendingModal(false);
        }}
        getStatusStyle={getStatusStyle}
        getStatusText={getStatusText}
        getPriorityStyle={getPriorityStyle}
      />

      <RequestModal
        visible={showInProgressModal}
        onClose={() => setShowInProgressModal(false)}
        title={`In Progress (${inProgressRequests.length})`}
        requests={inProgressRequests}
        showStatus={true}
        clickable={true}
        onRequestClick={(request) => {
          setSelectedRequest(request);
          setShowRequestDetailModal(true);
          setShowInProgressModal(false);
        }}
        getStatusStyle={getStatusStyle}
        getStatusText={getStatusText}
        getPriorityStyle={getPriorityStyle}
      />

      <RequestModal
        visible={showCompletedModal}
        onClose={() => setShowCompletedModal(false)}
        title={`Completed Requests (${completedRequests.length})`}
        requests={completedRequests}
        showStatus={true}
        clickable={true}
        onRequestClick={(request) => {
          setSelectedRequest(request);
          setShowRequestDetailModal(true);
          setShowCompletedModal(false);
        }}
        getStatusStyle={getStatusStyle}
        getStatusText={getStatusText}
        getPriorityStyle={getPriorityStyle}
      />

      <RequestDetailModal
        visible={showRequestDetailModal}
        onClose={() => setShowRequestDetailModal(false)}
        request={selectedRequest}
        onAssignTechnician={() => {
          setShowAssignTechnicianModal(true);
        }}
        onCompleteRequest={() => {
          setShowCompleteRequestModal(true);
        }}
        getStatusStyle={getStatusStyle}
        getStatusText={getStatusText}
        getPriorityStyle={getPriorityStyle}
      />

      <AssignTechnicianModal
        visible={showAssignTechnicianModal}
        onClose={() => setShowAssignTechnicianModal(false)}
        technicianName={technicianName}
        technicianNotes={technicianNotes}
        onTechnicianNameChange={setTechnicianName}
        onTechnicianNotesChange={setTechnicianNotes}
        onAssign={handleAssignTechnician}
      />

      <CompleteRequestModal
        visible={showCompleteRequestModal}
        onClose={() => setShowCompleteRequestModal(false)}
        completionNotes={completionNotes}
        onCompletionNotesChange={setCompletionNotes}
        onComplete={handleCompleteRequest}
      />

      {/* Image Options Modal (for Profile Page) */}
      <Modal
        visible={showImageOptions}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowImageOptions(false)}
      >
        <View style={styles.imageOptionsOverlay}>
          <View style={styles.imageOptionsContainer}>
            <Text style={styles.imageOptionsTitle}>Choose Profile Picture</Text>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={handleTakePhoto}
            >
              <Text style={styles.optionButtonText}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={handleChoosePhoto}
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
              style={[styles.optionButton, styles.cancelOptionButton]}
              onPress={() => setShowImageOptions(false)}
            >
              <Text style={styles.cancelOptionButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AdminApp;
