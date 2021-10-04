import { Router } from "express";
import { client } from "../server";
import authorisation from "../middleware/authorisation";
import { RequestWithUser } from "../middleware/authorisation";

const router = Router();

// get all posts

router.get("/", authorisation, async (req: RequestWithUser, res) => {
  try {
    // req.user has the payload

    const user = await client.query(
      "SELECT users.user_id, users.username, posts.post_id, posts.title, posts.content FROM users LEFT JOIN posts on users.user_id = posts.user_id WHERE users.user_id = $1",
      [req.user]
    );

    res.json(user.rows);
  } catch (error) { 
    console.error(error);
    res.status(500).json("Server error"); 
  }
});


 
export default router;
