import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { BottomNavigation } from "../../../components/common/BottomNavigation";
import { Button } from "../../../components/common/Button";
import { Input } from "../../../components/common/Input";
import { colors } from "../../../config/theme";
import styles from "./chatStyles";

interface Message {
  id: number;
  sender: string;
  text: string;
  avatar: string;
  isHomeowner: boolean;
  timestamp?: string;
}

interface ChatPageProps {
  messages: Message[];
  messageInput: string;
  onBack: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToSubmitRequest: () => void;
  onNavigateToNotifications: () => void;
  onNavigateToTechnicalIssue: () => void;
  onMessageInputChange: (value: string) => void;
  onSendMessage: () => void;
}

export const ChatPage: React.FC<ChatPageProps> = ({
  messages,
  messageInput,
  onBack,
  onNavigateToDashboard,
  onNavigateToSubmitRequest,
  onNavigateToNotifications,
  onNavigateToTechnicalIssue,
  onMessageInputChange,
  onSendMessage,
}) => {
  return (
    <>
      {/* Header */}
      <View style={styles.pageHeader}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Chat</Text>
      </View>

      {/* Chat Messages */}
      <ScrollView
        style={styles.chatContainer}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
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
                <Text style={styles.messageTimestamp}>{message.timestamp}</Text>
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
            onChangeText={onMessageInputChange}
            style={styles.messageInput}
          />
          <TouchableOpacity style={styles.sendButton} onPress={onSendMessage}>
            <Icon name="send" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
        <Button
          title="Continue"
          onPress={onNavigateToTechnicalIssue}
          variant="accent"
          style={styles.continueButton}
        />
      </View>

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
