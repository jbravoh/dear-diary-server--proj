import {Router} from "express";
import { client }  from "../server" 
import  bcrypt from "bcrypt";
import jwtGenerator from "../utils/jwtGenerator";

//registering 

const router = Router()

router.post("/register", async (req, res) => {
  try {
    //1. destructure the req.body(name, email. password)

    const { username, email, password} = req.body;
    //2. check if user exists (if user exists then throw error)

    const user = await client.query("SELECT * FROM users WHERE email = $1", [email]);

    if (user.rows.length !== 0) {
        return res.status(401).send("User already exists")
    }
    //3. Bcrypt the user password

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt)

    //4. enter the user inside our database 
    const newUser = await client.query("INSERT into users (username, email, password) VALUES ($1, $2, $3) RETURNING *", [username, email, bcryptPassword]);
    
    //5. generating our jwt token

    const token = jwtGenerator(newUser.rows[0].user_id)

    res.json({token})


  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
