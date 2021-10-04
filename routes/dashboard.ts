import { Router } from "express";
import { client } from "../server";
import authorisation from "../middleware/authorisation";
import { RequestWithUser } from "../middleware/authorisation";

const router = Router();

router.get("/", authorisation, async (req: RequestWithUser, res) => {
  try {
    // req.user has the payload

    const user = await client.query(
      "SELECT username FROM users WHERE user_id = $1",
      [req.user]
    );

    res.json(user.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
});

// router.post("/", authorisation, async (req: RequestWithUser, res) => {
//   try {
//     const { title, content } = req.body;
//     const newPost = await client.query(
//       "INSERT INTO posts (title, content, user_id) VALUES($1, $2, $3) RETURNING *",
//       [title, content, req.user]
//     );
//     res.status(201).json(newPost.rows[0]);
//   } catch (error) {
//     console.error(error);
//     res.status(500);
//   }
// });

export default router;
