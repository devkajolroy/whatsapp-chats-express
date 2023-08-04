import { Router } from "express";
import rooms from "../controllers/rooms"; // Import from Conversation Controller
const router = Router();
export default router;

router.route("/rooms/:userId").get(rooms.GET); // get my conversations
router.route("/room/:roomId").get(rooms.GET_Room); // get my conversations
router.route("/rooms").post(rooms.POST).put().delete();
