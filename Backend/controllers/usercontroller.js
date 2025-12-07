import User from "../models/user.js";


export const getMe = (req, res) => {
  res.json({
    message: "User profile fetched",
    user: req.user
  });
};



export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;  // whatever user wants to update

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    ).select("-password");

    res.json({
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};