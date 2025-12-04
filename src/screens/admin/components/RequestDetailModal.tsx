import React from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./modalStyles";

interface RequestDetailModalProps {
  visible: boolean;
  onClose: () => void;
  request: any;
  getStatusStyle: (status: string) => any;
  getStatusText: (status: string) => string;
  getPriorityStyle: (priority: string) => any;
  onAssignTechnician: () => void;
  onCompleteRequest: () => void;
}

export const RequestDetailModal: React.FC<RequestDetailModalProps> = ({
  visible,
  onClose,
  request,
  getStatusStyle,
  getStatusText,
  getPriorityStyle,
  onAssignTechnician,
  onCompleteRequest,
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

          <ScrollView
            style={styles.detailContent}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
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

            {request.address && (
              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Address</Text>
                <Text style={styles.detailValue}>{request.address}</Text>
              </View>
            )}

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
                <Text style={styles.detailValue}>{request.completedDate}</Text>
              </View>
            )}

            {/* Action Buttons based on status */}
            <View style={styles.actionButtons}>
              {request.status === "pending" && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.assignButton]}
                  onPress={onAssignTechnician}
                >
                  <Text style={styles.actionButtonText}>Assign Technician</Text>
                </TouchableOpacity>
              )}

              {request.status === "in-progress" && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.completeButton]}
                  onPress={onCompleteRequest}
                >
                  <Text style={styles.actionButtonText}>Mark as Completed</Text>
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
