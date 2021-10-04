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

// create a posts

router.post("/posts", authorisation, async (req: RequestWithUser, res) => {
  try {
    console.log(req.body);
    const { title, content } = req.body;
    const newPost = await client.query("INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3) RETURNING *", [req.user, title, content])
    res.json(newPost.rows[0])
  } catch (error) {
    console.error(error)
    
  }
});

router.put("/posts/:id", authorisation, async (req: RequestWithUser, res) => {
  try {
    const { id } = req.params
    const { title, content } = req.body
    const updatePost = await client.query("UPDATE posts SET title = $1, content = $2  WHERE post_id = $3 AND user_id = $4", [title, content, id, req.user]);

    // if (updatePost.rows.length === 0) {
    //   return res.json("This post is not yours")
    // }

    res.json("Post was updated")
  } catch (error) {
    console.error(error)
  
  }
})






 
export default router;
