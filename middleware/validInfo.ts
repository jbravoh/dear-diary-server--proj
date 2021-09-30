


export default function (req: any, res: any, next: any) {
    
    const { email, username, password } = req.body;
  
    function validEmail(userEmail: string) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    function validPassword(userPassword: string) {
        return userPassword.length >= 6 
    }

  
    if (req.path === "/register") {
      console.log(!email.length);
      if (![email, username, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.json("Invalid Email");
      } else if (!validPassword(password)) {
        return res.status(401).json("Invalid Password");
      }
    } else if (req.path === "/login") {
      if (![email, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.status(401).json("Invalid Email");
      }
    }
  
    next();
  };