import User from "../../../models/User";
import { hashPassword } from "../../../utils/auth";
import { connectDB } from "../../../utils/connectDB";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  try {
    await connectDB;
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to database" });
    return;
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ status: "Failed", message: "Invalid Data" });
  }

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res
      .status(422)
      .json({ status: "Failed", message: "User exists already!" });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({ email: email, password: hashedPassword });
  console.log(newUser);

  res.status(201).json({ status: "Success", message: "User Created!" });
}

export default handler;
