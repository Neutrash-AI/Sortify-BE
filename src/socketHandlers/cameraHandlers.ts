import { connectToDatabase } from "../config/mongo";

export interface Classification {
  timestamp: Date;
  label: string;
  confidence: number;
}

export async function saveClassification(
  label: string,
  timestamp: number,
  confidence: number
) {
  const client = await connectToDatabase();
  if (!client) {
    throw new Error("Failed to connect to MongoDB");
  }
  const db = client.db(); // gunakan nama default atau via URI
  const collection = db.collection<Classification>("classifications");

  const doc: Classification = {
    timestamp: new Date(timestamp * 1000), // detik → milidetik
    label,
    confidence,
  };

  await collection.insertOne(doc);
}

// src/services/socketHandler.ts
import { Server, Socket } from "socket.io";
import { subscriber, CHANNEL_NAME } from "../config/redis";

export default (io: Server) => {
  // Menyimpan deteksi terakhir untuk mencegah penyimpanan duplikat
  let lastDetection: { label: string; confidence: number } | null = null;

  io.on("connection", (socket: Socket) => {
    console.log("Client connected:", socket.id);

    // Subscribe ke channel Redis
    subscriber.subscribe(CHANNEL_NAME, async (message: string) => {
      try {
        const data = JSON.parse(message);
        // Emit data ke client
        socket.emit("camera_frames", data);

        // Cek deteksi pertama (jika ada)
        const det = data.detections?.[0];
        if (det) {
          const { label, confidence } = det;
          // Hanya simpan jika label atau confidence berubah
          if (
            !lastDetection ||
            (lastDetection.label !== label && Math.abs(confidence) > 0.9)
          ) {
            await saveClassification(label, data.timestamp, confidence);
            lastDetection = { label, confidence };
            console.log(
              `Saved classification: ${label} @ ${new Date(
                data.timestamp * 1000
              ).toISOString()}`
            );
          }
        }
      } catch (err) {
        console.error("Error handling Redis message:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};
