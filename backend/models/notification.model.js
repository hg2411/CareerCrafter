import mongoose from 'mongoose';

  const notificationSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, // ✅ this is expected in your controller
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now, // ✅ FIX: ensure default is Date.now, NOT false
    },
  });

export const Notification = mongoose.model('Notification', notificationSchema);
