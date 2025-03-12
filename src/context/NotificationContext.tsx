import React, { createContext, useState, useCallback } from 'react';

interface Notification {
  id: number;
  message: string;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string) => void;
  removeNotification: (id: number) => void;
}

export const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  addNotification: () => {},
  removeNotification: () => {},
});

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((message: string) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message }]);
    
    // Аутоматско уклањање након 5 секунди
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
      {/* Приказ обавештења */}
      <div className="fixed bottom-4 right-4 space-y-2">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center justify-between"
          >
            <span>{notification.message}</span>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 text-white hover:text-blue-200"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}