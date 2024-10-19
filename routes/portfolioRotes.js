const router = require("express").Router();
const {
  Intro,
  About,
  Project,
  Contact,
  Experience,
  Course,
} = require("../models/portfolioModel");

const User =  require("../models/userModel");



//Get all portFolio data
router.get("/get-portfolio-data", async (req, res) => {
  try {
    const intros = await Intro.find();
    const abouts = await About.find();
    const projects = await Project.find();
    const contacts = await Contact.find();
    const experiences = await Experience.find();
    const courses = await Course.find();

    res.status(200).send({
      intro: intros[0],
      about: abouts[0],
      projects: projects,
      Contact: contacts[0],
      experiences: experiences,
      courses: courses,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});


//updata intro
router.post("/update-intro", async (req, res) => {
    try {
        const intro = await Intro.findOneAndUpdate(
            {_id: req.body._id},
            req.body,
            {new: true}
        );
        res.status(200).send({
            data : intro,
            success: true,
            message: "Intro Update successfully",
        })
    } catch (error) {
     res.status(500).send(error);   
    }
})

// Update About
router.post("/update-about", async (req, res) => {
    try {
      const about = await About.findOneAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: true }
      );
      res.status(200).send({
        data: about,
        success: true,
        message: "About updated successfully",
      });
    } catch (error) {
      // Send the error response back to the client
      res.status(500).send({
        success: false,
        message: "Something went wrong while updating about.",
        error: error.message,
      });
    }
  });

  // add experience
router.post("/add-experience", async (req, res) => {
  try {
      console.log("Request Body:", req.body); // Log the request body for debugging

      // Assuming req.body is directly the experience object
      const experience = new Experience(req.body);
      await experience.save();

      res.status(200).send({
          data: experience,
          success: true,
          message: "Experience added successfully",
      });
  } catch (error) {
      console.error("Error while adding experience:", error); // More detailed error logging
      res.status(500).send({
          success: false,
          message: "Failed to add experience",
          error: error.message,
      });
  }
});

  
    
  
// update experience
router.post("/update-experience", async (req, res) => {
  try {
    // Log the request body to ensure the _id is being sent
    console.log("Update Experience Request Body:", req.body);

    // Attempt to find the experience by _id and update it
    const experience = await Experience.findOneAndUpdate(
      { _id: req.body._id }, // Use _id from request body
      req.body,              // Update the experience with the request body
      { new: true }          // Return the updated document
    );

    // If no experience is found, return a 404 error
    if (!experience) {
      return res.status(404).send({
        success: false,
        message: "Experience not found with the provided ID.",
      });
    }

    // Send a success response with the updated experience
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience updated successfully",
    });
  } catch (error) {
    // Log any errors that occur during the update process
    console.error("Error while updating experience:", error);

    // Send an error response back to the client
    res.status(500).send({
      success: false,
      message: "Failed to update experience",
      error: error.message,
    });
  }
});

// delete expeience 

router.post("/delete-experience",  async (req, res) => {
  try {
    const experience = await Experience.findOneAndDelete({_id: req.body._id});
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience delete successfully"
    });
  }catch (error){
    res.status(500).send(error);
  }
});


//add project
router.post("/add-project", async(req,res)=>{
  try{
    const project = new Project(req.body);
    await project.save();
    res.status(200).send({
      data:  project,
      success: true,
      message: "Project added successfully",
      });
}catch (error) {
  res.status(500).send(error);
}
});
//update Project
router.post("/update-project", async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate({_id: req.body._id}, 
      req.body, 
      {new: true},
      );
      res.status(200).send({
        data: project,
        success: true,
        message:  "Project updated successfully",

      });
      } catch (error) {
        res.status(500).send(error);
      }
      });
      //delete project
      router.post("/delete-project", async (req, res) => {
        try{
          const project = await Project.findOneAndDelete({_id: req.body._id});
          res.status(200).send({
            data: project,
            success: true,
            message: "Project delete successfully"
            });
        } catch (error){
          res.status(500).send(error);

        }
      });

//add course
router.post("/add-course", async(req,res)=>{
  try{
    const course = new Course(req.body);
    await course.save();
    res.status(200).send({
      data:  course,
      success: true,
      message: "course added successfully",
      });
}catch (error) {
  res.status(500).send(error);
}
});
//update course
router.post("/update-course", async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate({_id: req.body._id}, 
      req.body, 
      {new: true},
      );
      res.status(200).send({
        data: course,
        success: true,
        message:  "course updated successfully",

      });
      } catch (error) {
        res.status(500).send(error);
      }
      });
      //delete course
      router.post("/delete-course", async (req, res) => {
        try{
          const course = await Course.findOneAndDelete({_id: req.body._id});
          res.status(200).send({
            data: course,
            success: true,
            message: "course delete successfully"
            });
        } catch (error){
          res.status(500).send(error);

        }
      });

      
//Contact intro
router.post("/update-contact", async (req, res) => {
  try {
      const contact = await Contact.findOneAndUpdate(
          {_id: req.body._id},
          req.body,
          {new: true}
      );
      res.status(200).send({
          data : contact,
          success: true,
          message: "Contact Update successfully",
      })
  } catch (error) {
   res.status(500).send(error);   
  }
});

//admin login
router.post("/admin-login", async(req, res) =>{
  try{
      const user = await User.findOne({
        username: req.body.username,
        password:  req.body.password,
      });
      user.password = "";
      if(user){
        res.status(200).send({
          data: user,
          success: true,
          message: "Login successfully",
          })
          }
          else{
            res.status(401).send({
              success: false,
              message: "Invalid username or password",
              })
              }
  }
  catch(error){
    res.status(500).send(error);
  }
})

module.exports = router;
