import { Router } from "express";
import message from "../controllers/message";
// Import form Message Controller
const router = Router();

router.route("/message/:conversationId").get(message.GET);
router.route("/message").post(message.POST);
// .put()
// .delete();

export default router;
