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
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Line, Polyline, Text as SvgText } from "react-native-svg";

type AdminPageType =
  | "admin-dashboard"
  | "admin-profile"
  | "admin-notifications";

interface AdminAppProps {
  onLogout: () => void;
}

export const AdminApp: React.FC<AdminAppProps> = ({ onLogout }) => {
  const [currentPage, setCurrentPage] = useState<
    AdminPageType | "maintenance-requests"
  >("admin-dashboard");
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
      id: "REQ-2025-0003",
      date: "2025-10-18",
      type: "Electrical",
      status: "pending",
      unit: "Unit 5A",
      description: "Living room lights not working",
      priority: "Medium",
      assignedTechnician: "",
      technicianNotes: "",
      completionNotes: "",
      completedDate: "",
    },
    {
      id: "REQ-2025-0006",
      date: "2025-09-28",
      type: "General",
      status: "pending",
      unit: "Unit 7C",
      description: "Door handle repair",
      priority: "Low",
      assignedTechnician: "",
      technicianNotes: "",
      completionNotes: "",
      completedDate: "",
    },
    {
      id: "REQ-2025-0201",
      date: "2025-08-20",
      type: "General",
      status: "pending",
      unit: "Unit 10C",
      description: "AC not cooling properly",
      priority: "High",
      assignedTechnician: "",
      technicianNotes: "",
      completionNotes: "",
      completedDate: "",
    },
    {
      id: "REQ-2025-0101",
      date: "2025-07-24",
      type: "Electrical",
      status: "pending",
      unit: "Unit 33H",
      description: "Power outlet not working",
      priority: "Medium",
      assignedTechnician: "",
      technicianNotes: "",
      completionNotes: "",
      completedDate: "",
    },
    {
      id: "REQ-2025-0040",
      date: "2025-04-15",
      type: "Plumbing",
      status: "pending",
      unit: "Unit 3E",
      description: "Bathroom faucet dripping",
      priority: "Low",
      assignedTechnician: "",
      technicianNotes: "",
      completionNotes: "",
      completedDate: "",
    },
    {
      id: "REQ-2025-0901",
      date: "2025-04-13",
      type: "Electrical",
      status: "pending",
      unit: "Unit 9B",
      description: "Circuit breaker tripping",
      priority: "High",
      assignedTechnician: "",
      technicianNotes: "",
      completionNotes: "",
      completedDate: "",
    },
    {
      id: "REQ-2025-0015",
      date: "2025-03-20",
      type: "General",
      status: "pending",
      unit: "Unit 15D",
      description: "Window repair needed",
      priority: "Medium",
      assignedTechnician: "",
      technicianNotes: "",
      completionNotes: "",
      completedDate: "",
    },
    {
      id: "REQ-2025-0022",
      date: "2025-11-01",
      type: "Plumbing",
      status: "completed",
      unit: "Unit 22F",
      description: "Toilet flush fixed",
      priority: "Medium",
      assignedTechnician: "John Smith",
      technicianNotes: "Replaced flush mechanism",
      completionNotes: "Issue resolved successfully",
      completedDate: "2025-11-02",
    },
    {
      id: "REQ-2025-0033",
      date: "2025-11-02",
      type: "Electrical",
      status: "completed",
      unit: "Unit 33G",
      description: "Light switch replacement",
      priority: "Low",
      assignedTechnician: "Mike Johnson",
      technicianNotes: "Installed new switch",
      completionNotes: "Working properly now",
      completedDate: "2025-11-03",
    },
  ]);

  const pendingRequests = allRequests.filter((req) => req.status === "pending");
  const completedRequests = allRequests.filter(
    (req) => req.status === "completed"
  );
  const inProgressRequests = allRequests.filter(
    (req) => req.status === "in-progress"
  );

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

  const getPriorityStyle = (priority: string) => {
    if (priority === "High")
      return { backgroundColor: "#fecaca", color: "#dc2626" };
    if (priority === "Medium")
      return { backgroundColor: "#fed7aa", color: "#ea580c" };
    if (priority === "Low")
      return { backgroundColor: "#bbf7d0", color: "#16a34a" };
    return {};
  };

  // Function to handle image upload
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

  // Function to take photo with camera
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
    return { uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rica" };
  };

  // Function to handle request click
  const handleRequestClick = (request: any) => {
    setSelectedRequest(request);
    setShowRequestDetailModal(true);
  };

  // Function to assign technician
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

  // Function to complete request
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

  // Request Modal Component
  const RequestModal = ({
    visible,
    onClose,
    title,
    requests,
    showStatus = true,
    clickable = false,
  }: {
    visible: boolean;
    onClose: () => void;
    title: string;
    requests: any[];
    showStatus?: boolean;
    clickable?: boolean;
  }) => (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.requestsModal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.requestsList}>
            {requests.map((request, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.requestModalCard,
                  clickable && styles.clickableCard,
                ]}
                onPress={
                  clickable ? () => handleRequestClick(request) : undefined
                }
              >
                <View style={styles.requestModalHeader}>
                  <Text style={styles.requestModalId}>{request.id}</Text>
                  <View style={styles.requestModalBadges}>
                    {showStatus && (
                      <Text
                        style={[
                          styles.requestModalStatus,
                          getStatusStyle(request.status),
                        ]}
                      >
                        {getStatusText(request.status)}
                      </Text>
                    )}
                    <Text
                      style={[
                        styles.requestModalPriority,
                        getPriorityStyle(request.priority),
                      ]}
                    >
                      {request.priority}
                    </Text>
                  </View>
                </View>

                <Text style={styles.requestModalType}>{request.type}</Text>
                <Text style={styles.requestModalDescription}>
                  {request.description}
                </Text>

                <View style={styles.requestModalFooter}>
                  <Text style={styles.requestModalUnit}>{request.unit}</Text>
                  <Text style={styles.requestModalDate}>{request.date}</Text>
                </View>

                {request.assignedTechnician && (
                  <View style={styles.technicianInfo}>
                    <Text style={styles.technicianLabel}>Assigned to: </Text>
                    <Text style={styles.technicianName}>
                      {request.assignedTechnician}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  // Request Detail Modal Component
  const RequestDetailModal = ({
    visible,
    onClose,
    request,
  }: {
    visible: boolean;
    onClose: () => void;
    request: any;
  }) => {
    if (!request) return null;

    return (
      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.detailModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Request Details</Text>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.detailContent}>
              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Request ID</Text>
                <Text style={styles.detailValue}>{request.id}</Text>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Type</Text>
                <Text style={styles.detailValue}>{request.type}</Text>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Description</Text>
                <Text style={styles.detailValue}>{request.description}</Text>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Unit</Text>
                <Text style={styles.detailValue}>{request.unit}</Text>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Date Submitted</Text>
                <Text style={styles.detailValue}>{request.date}</Text>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Priority</Text>
                <Text
                  style={[
                    styles.priorityBadge,
                    getPriorityStyle(request.priority),
                  ]}
                >
                  {request.priority}
                </Text>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Status</Text>
                <Text
                  style={[styles.statusBadge, getStatusStyle(request.status)]}
                >
                  {getStatusText(request.status)}
                </Text>
              </View>

              {request.assignedTechnician && (
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Assigned Technician</Text>
                  <Text style={styles.detailValue}>
                    {request.assignedTechnician}
                  </Text>
                </View>
              )}

              {request.technicianNotes && (
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Technician Notes</Text>
                  <Text style={styles.detailValue}>
                    {request.technicianNotes}
                  </Text>
                </View>
              )}

              {request.completionNotes && (
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Completion Notes</Text>
                  <Text style={styles.detailValue}>
                    {request.completionNotes}
                  </Text>
                </View>
              )}

              {request.completedDate && (
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Completed Date</Text>
                  <Text style={styles.detailValue}>
                    {request.completedDate}
                  </Text>
                </View>
              )}

              {/* Action Buttons based on status */}
              <View style={styles.actionButtons}>
                {request.status === "pending" && (
                  <TouchableOpacity
                    style={[styles.actionButton, styles.assignButton]}
                    onPress={() => setShowAssignTechnicianModal(true)}
                  >
                    <Text style={styles.actionButtonText}>
                      Assign Technician
                    </Text>
                  </TouchableOpacity>
                )}

                {request.status === "in-progress" && (
                  <TouchableOpacity
                    style={[styles.actionButton, styles.completeButton]}
                    onPress={() => setShowCompleteRequestModal(true)}
                  >
                    <Text style={styles.actionButtonText}>
                      Mark as Completed
                    </Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={[styles.actionButton, styles.cancelActionButton]}
                  onPress={onClose}
                >
                  <Text style={styles.actionButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  // Assign Technician Modal
  const AssignTechnicianModal = ({
    visible,
    onClose,
  }: {
    visible: boolean;
    onClose: () => void;
  }) => (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.assignModal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Assign Technician</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.assignContent}>
            <Text style={styles.assignLabel}>Technician Name *</Text>
            <TextInput
              style={styles.textInput}
              value={technicianName}
              onChangeText={setTechnicianName}
              placeholder="Enter technician name"
            />

            <Text style={styles.assignLabel}>Technician Notes</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={technicianNotes}
              onChangeText={setTechnicianNotes}
              placeholder="Enter any notes for the technician"
              multiline
              numberOfLines={4}
            />

            <View style={styles.assignButtons}>
              <TouchableOpacity
                style={[styles.actionButton, styles.cancelActionButton]}
                onPress={onClose}
              >
                <Text style={styles.actionButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.confirmButton]}
                onPress={handleAssignTechnician}
              >
                <Text style={styles.actionButtonText}>Assign & Start Work</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  // Complete Request Modal
  const CompleteRequestModal = ({
    visible,
    onClose,
  }: {
    visible: boolean;
    onClose: () => void;
  }) => (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.completeModal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Complete Request</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.completeContent}>
            <Text style={styles.completeLabel}>Completion Notes *</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={completionNotes}
              onChangeText={setCompletionNotes}
              placeholder="Describe the work completed and any final notes"
              multiline
              numberOfLines={6}
            />

            <View style={styles.completeButtons}>
              <TouchableOpacity
                style={[styles.actionButton, styles.cancelActionButton]}
                onPress={onClose}
              >
                <Text style={styles.actionButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.confirmCompleteButton]}
                onPress={handleCompleteRequest}
              >
                <Text style={styles.actionButtonText}>Mark as Completed</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  // Maintenance Requests Page
  if (currentPage === "maintenance-requests") {
    return (
      <SafeAreaView style={styles.dashboardContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        {/* Header */}
        <View style={styles.adminHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentPage("admin-dashboard")}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.adminHeaderText}>
            <Text style={styles.adminName}>Maintenance Requests</Text>
            <Text style={styles.dateText}>All maintenance tasks</Text>
          </View>
        </View>

        <ScrollView style={styles.adminContent}>
          {/* Stats Overview */}
          <View style={styles.statsOverview}>
            <TouchableOpacity
              style={[styles.statCard, { backgroundColor: "#fbbf24" }]}
              onPress={() => setShowPendingModal(true)}
            >
              <Text style={styles.statNumber}>{pendingRequests.length}</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.statCard, { backgroundColor: "#93c5fd" }]}
              onPress={() => setShowInProgressModal(true)}
            >
              <Text style={styles.statNumber}>{inProgressRequests.length}</Text>
              <Text style={styles.statLabel}>In Progress</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.statCard, { backgroundColor: "#86efac" }]}
              onPress={() => setShowCompletedModal(true)}
            >
              <Text style={styles.statNumber}>{completedRequests.length}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </TouchableOpacity>
          </View>

          {/* Requests Table */}
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>Request ID</Text>
              <Text style={styles.tableHeaderCell}>Type</Text>
              <Text style={styles.tableHeaderCell}>Status</Text>
              <Text style={styles.tableHeaderCell}>Priority</Text>
            </View>

            <ScrollView style={styles.tableBody}>
              {allRequests.map((request, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.tableRow}
                  onPress={() => handleRequestClick(request)}
                >
                  <View style={styles.tableCell}>
                    <Text style={styles.requestIdText}>{request.id}</Text>
                    <Text style={styles.unitText}>{request.unit}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.typeText}>{request.type}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text
                      style={[
                        styles.statusBadge2,
                        getStatusStyle(request.status),
                      ]}
                    >
                      {getStatusText(request.status)}
                    </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text
                      style={[
                        styles.statusBadge2,
                        getPriorityStyle(request.priority),
                      ]}
                    >
                      {request.priority}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>

        {/* Modals */}
        <RequestModal
          visible={showPendingModal}
          onClose={() => setShowPendingModal(false)}
          title={`Pending Requests (${pendingRequests.length})`}
          requests={pendingRequests}
          showStatus={true}
          clickable={true}
        />

        <RequestModal
          visible={showInProgressModal}
          onClose={() => setShowInProgressModal(false)}
          title={`In Progress Requests (${inProgressRequests.length})`}
          requests={inProgressRequests}
          showStatus={true}
          clickable={true}
        />

        <RequestModal
          visible={showCompletedModal}
          onClose={() => setShowCompletedModal(false)}
          title={`Completed Requests (${completedRequests.length})`}
          requests={completedRequests}
          showStatus={true}
          clickable={true}
        />

        <RequestDetailModal
          visible={showRequestDetailModal}
          onClose={() => setShowRequestDetailModal(false)}
          request={selectedRequest}
        />

        <AssignTechnicianModal
          visible={showAssignTechnicianModal}
          onClose={() => setShowAssignTechnicianModal(false)}
        />

        <CompleteRequestModal
          visible={showCompleteRequestModal}
          onClose={() => setShowCompleteRequestModal(false)}
        />

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentPage("admin-dashboard")}
          >
            <Text style={styles.navIcon}>🏠</Text>
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navButton, styles.activeNavButton]}
            onPress={() => setCurrentPage("maintenance-requests")}
          >
            <Text style={styles.navIcon}>📄</Text>
            <Text style={styles.navText}>Tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentPage("admin-notifications")}
          >
            <Text style={styles.navIcon}>🔔</Text>
            <Text style={styles.navText}>Alerts</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Admin Notifications Page
  if (currentPage === "admin-notifications") {
    return (
      <SafeAreaView style={styles.dashboardContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        {/* Header */}
        <View style={styles.adminNotificationHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentPage("admin-dashboard")}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.adminNotificationHeaderContent}>
            <Text style={styles.notificationTitle}>Notifications</Text>
            <Text style={styles.notificationDate}>
              Tuesday, January 14, 2025
            </Text>
          </View>
        </View>

        <ScrollView style={styles.adminNotificationsList}>
          <View style={styles.adminNotificationCard}>
            <Text style={styles.adminNotificationText}>
              New maintenance request submitted for Unit 12A
            </Text>
            <Text style={styles.notificationTime}>Just now</Text>
          </View>

          <View style={styles.adminNotificationCard}>
            <Text style={styles.adminNotificationText}>
              Request REQ-2025-0003 has been completed
            </Text>
            <Text style={styles.notificationTime}>1 hr ago</Text>
          </View>

          <View style={styles.adminNotificationCard}>
            <Text style={styles.adminNotificationText}>
              Technician assigned to plumbing issue in Unit 7C
            </Text>
            <Text style={styles.notificationTime}>2 hrs ago</Text>
          </View>

          <View style={styles.adminNotificationCard}>
            <Text style={styles.adminNotificationText}>
              High priority request requires attention in Unit 9B
            </Text>
            <Text style={styles.notificationTime}>4 hrs ago</Text>
          </View>

          <View style={styles.adminNotificationCard}>
            <Text style={styles.adminNotificationText}>
              Weekly maintenance report is ready
            </Text>
            <Text style={styles.notificationTime}>1 day ago</Text>
          </View>

          <View style={styles.adminNotificationCard}>
            <Text style={styles.adminNotificationText}>
              System maintenance scheduled for tomorrow
            </Text>
            <Text style={styles.notificationTime}>2 days ago</Text>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentPage("admin-dashboard")}
          >
            <Text style={styles.navIcon}>🏠</Text>
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentPage("maintenance-requests")}
          >
            <Text style={styles.navIcon}>📄</Text>
            <Text style={styles.navText}>Tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navButton, styles.activeNavButton]}
            onPress={() => setCurrentPage("admin-notifications")}
          >
            <Text style={styles.navIcon}>🔔</Text>
            <Text style={styles.navText}>Alerts</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Admin Profile Page
  if (currentPage === "admin-profile") {
    return (
      <SafeAreaView style={styles.dashboardContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        {/* Header */}
        <View style={styles.adminNotificationHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentPage("admin-dashboard")}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.adminNotificationHeaderContent}>
            <Text style={styles.notificationTitle}>Profile</Text>
            <Text style={styles.notificationDate}>Admin Account</Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView style={styles.profileContainer}>
          {/* Profile Avatar Section */}
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
            <Text style={styles.profileRole}>Administrator</Text>
          </View>

          {/* Profile Info Card */}
          <View style={styles.profileCard}>
            <View style={styles.profileField}>
              <Text style={styles.profileFieldLabel}>Name</Text>
              <View style={styles.profileFieldValue}>
                <Text style={styles.profileFieldValueText}>Rica Garcia</Text>
              </View>
            </View>

            <View style={styles.profileField}>
              <Text style={styles.profileFieldLabel}>Email</Text>
              <View style={styles.profileFieldValue}>
                <Text style={styles.profileFieldValueText}>
                  admin.rica@camella.com
                </Text>
              </View>
            </View>

            <View style={styles.profileField}>
              <Text style={styles.profileFieldLabel}>Position</Text>
              <View style={styles.profileFieldValue}>
                <Text style={styles.profileFieldValueText}>
                  Community Manager
                </Text>
              </View>
            </View>

            <View style={styles.profileField}>
              <Text style={styles.profileFieldLabel}>Phone</Text>
              <View style={styles.profileFieldValue}>
                <Text style={styles.profileFieldValueText}>
                  +63 912 345 6789
                </Text>
              </View>
            </View>

            <View style={styles.profileField}>
              <Text style={styles.profileFieldLabel}>Community</Text>
              <View style={styles.profileFieldValue}>
                <Text style={styles.profileFieldValueText}>
                  Camella Communities
                </Text>
              </View>
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.adminLogoutButton} onPress={onLogout}>
            <Text style={styles.adminLogoutButtonText}>Log out</Text>
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
                style={[styles.optionButton, styles.cancelOptionButton]}
                onPress={() => setShowImageOptions(false)}
              >
                <Text style={styles.cancelOptionButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentPage("admin-dashboard")}
          >
            <Text style={styles.navIcon}>🏠</Text>
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentPage("maintenance-requests")}
          >
            <Text style={styles.navIcon}>📄</Text>
            <Text style={styles.navText}>Tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentPage("admin-notifications")}
          >
            <Text style={styles.navIcon}>🔔</Text>
            <Text style={styles.navText}>Alerts</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Admin Dashboard (Default Page)
  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {/* Header */}
      <View style={styles.adminHeader}>
        <View style={styles.adminHeaderText}>
          <Text style={styles.welcomeBack}>Welcome back,</Text>
          <Text style={styles.adminName}>Admin Rica!</Text>
          <Text style={styles.dateText}>Tuesday, January 14, 2025</Text>
        </View>
        <TouchableOpacity
          style={styles.profilePic}
          onPress={() => setCurrentPage("admin-profile")}
        >
          <Image source={getProfileImageSource()} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.adminContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Dashboard Overview Section with Background Image */}
        <View style={styles.overviewContainer}>
          <ImageBackground
            source={require("../assets/images/camella.jpeg")}
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
                <TouchableOpacity
                  style={[styles.statCard, { backgroundColor: "#93c5fd" }]}
                  onPress={() => setShowRequestsModal(true)}
                >
                  <Text style={styles.statNumber}>{allRequests.length}</Text>
                  <Text style={styles.statLabel}>Total Requests</Text>
                  <Text style={styles.statSubtext}>Last 3 days</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.statCard, { backgroundColor: "#fbbf24" }]}
                  onPress={() => setShowPendingModal(true)}
                >
                  <Text style={styles.statNumber}>
                    {pendingRequests.length}
                  </Text>
                  <Text style={styles.statLabel}>Pending</Text>
                  <Text style={styles.statSubtext}>Needs attention</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.statCard, { backgroundColor: "#86efac" }]}
                  onPress={() => setShowCompletedModal(true)}
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
                  onPress={() => setShowInProgressModal(true)}
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
              <Text style={styles.performanceValue}>2-3hrs</Text>
              <Text style={styles.performanceLabel}>Average Response Time</Text>
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
          <TouchableOpacity
            style={styles.taskButton}
            onPress={() => setCurrentPage("maintenance-requests")}
          >
            <Text style={styles.taskButtonText}>View All Tasks</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Request Modals */}
      <RequestModal
        visible={showRequestsModal}
        onClose={() => setShowRequestsModal(false)}
        title={`All Requests (${allRequests.length})`}
        requests={allRequests}
        showStatus={true}
        clickable={true}
      />

      <RequestModal
        visible={showPendingModal}
        onClose={() => setShowPendingModal(false)}
        title={`Pending Requests (${pendingRequests.length})`}
        requests={pendingRequests}
        showStatus={true}
        clickable={true}
      />

      <RequestModal
        visible={showCompletedModal}
        onClose={() => setShowCompletedModal(false)}
        title={`Completed Requests (${completedRequests.length})`}
        requests={completedRequests}
        showStatus={true}
        clickable={true}
      />

      <RequestModal
        visible={showInProgressModal}
        onClose={() => setShowInProgressModal(false)}
        title={`In Progress Requests (${inProgressRequests.length})`}
        requests={inProgressRequests}
        showStatus={true}
        clickable={true}
      />

      {/* Request Detail Modal */}
      <RequestDetailModal
        visible={showRequestDetailModal}
        onClose={() => setShowRequestDetailModal(false)}
        request={selectedRequest}
      />

      {/* Assign Technician Modal */}
      <AssignTechnicianModal
        visible={showAssignTechnicianModal}
        onClose={() => setShowAssignTechnicianModal(false)}
      />

      {/* Complete Request Modal */}
      <CompleteRequestModal
        visible={showCompleteRequestModal}
        onClose={() => setShowCompleteRequestModal(false)}
      />

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
              style={[styles.optionButton, styles.cancelOptionButton]}
              onPress={() => setShowImageOptions(false)}
            >
              <Text style={styles.cancelOptionButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navButton, styles.activeNavButton]}
          onPress={() => setCurrentPage("admin-dashboard")}
        >
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setCurrentPage("maintenance-requests")}
        >
          <Text style={styles.navIcon}>📄</Text>
          <Text style={styles.navText}>Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setCurrentPage("admin-notifications")}
        >
          <Text style={styles.navIcon}>🔔</Text>
          <Text style={styles.navText}>Alerts</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  // Header Styles
  adminHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    marginTop: 8,
  },
  adminHeaderText: {
    flex: 1,
  },
  welcomeBack: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 2,
  },
  adminName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  dateText: {
    fontSize: 13,
    color: "#9ca3af",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#e5e7eb",
    marginLeft: 12,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  adminNotificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    marginTop: 8,
  },
  adminNotificationHeaderContent: {
    flex: 1,
    marginLeft: 12,
  },
  smallProfilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    fontSize: 18,
    color: "#374151",
    fontWeight: "bold",
  },
  headerSpacer: {
    width: 40,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  notificationDate: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  // Content Styles
  adminContent: {
    flex: 1,
  },
  // Dashboard Overview with Image Background
  overviewContainer: {
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  overviewBackground: {
    width: "100%",
    minHeight: 350,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(27, 126, 7, 0.4)",
  },
  overviewContent: {
    padding: 20,
  },
  overviewBanner: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  statsOverview: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    gap: 12,
  },
  statCard: {
    width: "48%",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  statSubtext: {
    fontSize: 12,
    color: "#4b5563",
  },
  chartSection: {
    margin: 8,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
  },
  chartContainer: {
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
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    color: "#6b7280",
  },
  performanceSection: {
    margin: 8,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  performanceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
  },
  performanceGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  performanceCard: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#f3f4f6",
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 4,
    backgroundColor: "#fafafa",
  },
  performanceIcon: {
    fontSize: 20,
    marginBottom: 6,
  },
  performanceValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  performanceLabel: {
    fontSize: 10,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 12,
  },
  taskButton: {
    width: "100%",
    paddingVertical: 14,
    backgroundColor: "#166534",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Bottom Navigation
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  navButton: {
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    flex: 1,
  },
  activeNavButton: {
    backgroundColor: "#f0f9ff",
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navText: {
    fontSize: 10,
    color: "#6b7280",
    fontWeight: "500",
  },
  // Table Styles
  tableContainer: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 12,
    fontWeight: "bold",
    color: "#6b7280",
    textAlign: "left",
  },
  tableBody: {
    flex: 1,
  },
  tableRow: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    alignItems: "center",
  },
  tableCell: {
    flex: 1,
    justifyContent: "center",
  },
  requestIdText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  unitText: {
    fontSize: 11,
    color: "#6b7280",
  },
  typeText: {
    fontSize: 12,
    color: "#1f2937",
    fontWeight: "500",
  },
  statusBadge2: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    fontSize: 10,
    fontWeight: "bold",
    overflow: "hidden",
    alignSelf: "flex-start",
    textAlign: "center",
  },
  // Notifications Styles
  adminNotificationsList: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8fafc",
  },
  adminNotificationCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  adminNotificationText: {
    fontSize: 14,
    color: "#1f2937",
    fontWeight: "500",
    flex: 1,
  },
  notificationTime: {
    fontSize: 12,
    color: "#9ca3af",
    marginLeft: 12,
  },
  // Profile Page Styles
  profileContainer: {
    flex: 1,
    padding: 16,
  },
  profileAvatarSection: {
    alignItems: "center",
    marginBottom: 24,
    paddingVertical: 16,
  },
  avatarContainer: {
    position: "relative",
    alignItems: "center",
  },
  profileAvatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: "#e5e7eb",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#166534",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  editAvatarIcon: {
    fontSize: 16,
    color: "white",
  },
  profileRole: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  profileCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  profileField: {
    marginBottom: 20,
  },
  profileFieldLabel: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 6,
    fontWeight: "500",
  },
  profileFieldValue: {
    padding: 12,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  profileFieldValueText: {
    fontSize: 15,
    color: "#1f2937",
    fontWeight: "500",
  },
  adminLogoutButton: {
    width: "100%",
    paddingVertical: 16,
    backgroundColor: "#166534",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  adminLogoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  requestsModal: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
  },
  detailModal: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
  },
  assignModal: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  completeModal: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: "#6b7280",
    fontWeight: "bold",
  },
  requestsList: {
    padding: 16,
  },
  requestModalCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  clickableCard: {
    borderColor: "#3b82f6",
    borderWidth: 2,
  },
  requestModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  requestModalId: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1f2937",
  },
  requestModalBadges: {
    flexDirection: "row",
    gap: 8,
  },
  requestModalStatus: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 10,
    fontWeight: "bold",
    overflow: "hidden",
  },
  requestModalPriority: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 10,
    fontWeight: "bold",
    overflow: "hidden",
  },
  requestModalType: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  requestModalDescription: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 12,
  },
  requestModalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  requestModalUnit: {
    fontSize: 12,
    color: "#9ca3af",
  },
  requestModalDate: {
    fontSize: 12,
    color: "#9ca3af",
  },
  technicianInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  technicianLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  technicianName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1f2937",
  },
  // Detail Modal Styles
  detailContent: {
    padding: 20,
  },
  detailSection: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: "#1f2937",
  },
  priorityBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: "bold",
    overflow: "hidden",
    alignSelf: "flex-start",
  },
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: "bold",
    overflow: "hidden",
    alignSelf: "flex-start",
  },
  actionButtons: {
    marginTop: 24,
    gap: 12,
  },
  actionButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  assignButton: {
    backgroundColor: "#f59e0b",
  },
  completeButton: {
    backgroundColor: "#10b981",
  },
  confirmButton: {
    backgroundColor: "#3b82f6",
  },
  confirmCompleteButton: {
    backgroundColor: "#10b981",
  },
  cancelActionButton: {
    backgroundColor: "#6b7280",
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  // Assign Technician Modal Styles
  assignContent: {
    padding: 20,
  },
  assignLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "white",
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  assignButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  // Complete Request Modal Styles
  completeContent: {
    padding: 20,
  },
  completeLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  completeButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  imageOptionsModal: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  optionButton: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    alignItems: "center",
  },
  optionButtonText: {
    fontSize: 16,
    color: "#166534",
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
  cancelOptionButton: {
    marginTop: 10,
    paddingVertical: 16,
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    borderBottomWidth: 0,
  },
  cancelOptionButtonText: {
    fontSize: 16,
    color: "#374151",
    fontWeight: "600",
  },
});
