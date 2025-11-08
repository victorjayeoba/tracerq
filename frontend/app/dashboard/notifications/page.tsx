"use client";

import { useState } from "react";
import Header from "@/components/dashboard/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell,
  Check,
  Clock,
  AlertTriangle,
  CheckCircle,
  Settings,
  Trash2
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "alert" | "success" | "info";
  date: string;
  isRead: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Deepfake Alert",
      message: "Your video 'interview_clip.mp4' has been analyzed and identified as potentially manipulated content.",
      type: "alert",
      date: "2023-06-10T14:30:00",
      isRead: false
    },
    {
      id: "2",
      title: "Analysis Complete",
      message: "Your analysis of 'social_post_image.jpg' is complete. View the detailed report for more information.",
      type: "success",
      date: "2023-06-09T10:15:00",
      isRead: false
    },
    {
      id: "3",
      title: "New Feature Available",
      message: "We've added source tracking to help you find where content first appeared online. Try it now!",
      type: "info",
      date: "2023-06-08T09:00:00",
      isRead: true
    },
    {
      id: "4",
      title: "Security Alert",
      message: "Unusual login activity detected from a new device. Please verify if this was you.",
      type: "alert",
      date: "2023-06-05T18:22:00",
      isRead: true
    },
    {
      id: "5",
      title: "Subscription Renewal",
      message: "Your Tracer subscription will automatically renew in 3 days. Update your plan settings if needed.",
      type: "info",
      date: "2023-06-04T08:45:00",
      isRead: true
    }
  ]);

  const [activeTab, setActiveTab] = useState<string>("all");

  // Filter notifications based on active tab
  const getFilteredNotifications = () => {
    switch (activeTab) {
      case "unread":
        return notifications.filter(notification => !notification.isRead);
      case "alerts":
        return notifications.filter(notification => notification.type === "alert");
      case "all":
      default:
        return notifications;
    }
  };

  const filteredNotifications = getFilteredNotifications();

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, isRead: true })));
  };

  // Delete notification
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "info":
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    } else {
      const days = Math.floor(diffInHours / 24);
      return days === 1 ? 'Yesterday' : `${days} days ago`;
    }
  };

  return (
    <div className="w-full">
      <div className="w-full px-8 py-6 flex flex-col">
        {/* Page Header */}
        <Header title="Notifications" />
        
        {/* Notifications Card */}
        <Card className="border border-border p-6">
          {/* Notification Controls */}
          <div className="flex justify-between items-center mb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">
                  Unread
                  {notifications.filter(n => !n.isRead).length > 0 && (
                    <span className="ml-2 bg-accent rounded-full h-5 w-5 text-xs flex items-center justify-center text-white">
                      {notifications.filter(n => !n.isRead).length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs flex items-center gap-1"
                onClick={markAllAsRead}
              >
                <Check className="h-3 w-3" />
                Mark All Read
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs flex items-center gap-1"
              >
                <Settings className="h-3 w-3" />
                Settings
              </Button>
            </div>
          </div>
          
          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No notifications in this category
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 border border-border rounded-lg ${notification.isRead ? 'bg-background' : 'bg-muted/10'}`}
                >
                  <div className="flex gap-4">
                    <div className="p-2 bg-background border border-border rounded-full">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium flex items-center gap-2">
                          {notification.title}
                          {!notification.isRead && (
                            <span className="h-2 w-2 bg-accent rounded-full"></span>
                          )}
                        </h3>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span className="text-xs">{formatDate(notification.date)}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {notification.message}
                      </p>
                      <div className="flex justify-end gap-2">
                        {!notification.isRead && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as Read
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs"
                        >
                          View Details
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}



