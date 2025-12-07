import Course from "../models/Course.js";

export const createCourse = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    if (!title || !price || !category) {
      return res.status(400).json({ message: "Title and price are required" });
    }

    const course = await Course.create({
      title,
      description,
      price,
      category,
      createdBy: req.user._id
    });

    res.status(201).json({
      message: "Course created successfully",
      course
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to create course" });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().select("-__v");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};


export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).select("-__v");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch course details" });
  }
};
