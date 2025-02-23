export default class NotificationService {
    static async showNotification(message: string, type: string = 'info') {
      if ('Notification' in window && navigator.serviceWorker) {
        try {
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            const notificationOptions = {
              body: message,
              type: type,
            };
            new Notification(message, notificationOptions);
          }
        } catch (error) {
          console.error('Erreur lors de l’affichage de la notification :', error);
        }
      } else {
        console.warn('Notifications non supportées par le navigateur.');
      }
    }
  }
  