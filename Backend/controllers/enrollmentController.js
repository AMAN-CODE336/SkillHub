import Enrollment from "../models/Enrollment.js";

export const enrollCourse = async (req, res) => {
  try {
    const userId = req.user._id;
    const courseId = req.params.courseId;

    // Check if already enrolled
    const alreadyEnrolled = await Enrollment.findOne({
      user: userId,
      course: courseId
    });

    if (alreadyEnrolled) {
      return res.json({
        message: "Already enrolled in this course",
        enrollment: alreadyEnrolled
      });
    }

    // Create new enrollment
    const enrollment = await Enrollment.create({
      user: userId,
      course: courseId
    });

    res.status(201).json({
      message: "Enrolled successfully",
      enrollment
    });

  } catch (error) {
    res.status(500).json({ message: "Enrollment failed" });
  }
};


export const getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      user: req.user._id,
    }).populate("course");

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch enrolled courses" });
  }
};
