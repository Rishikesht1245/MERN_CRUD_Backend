const express = require("express");
const router = express.Router();
const loginSignup = require("../controllers/loginPage");
const manager = require("../controllers/managerController");
const authCheck = require("../middlewares/authCheck");

// ================= Login Routes ======================//

// login verification
router.post("/", loginSignup.LoginVerification);

//signup Verification
router.post("/signUp", loginSignup.SignUpVerification);

// =====================================================//

// ================== Manager Routes =================== //

// get all managers
router.get("/managers", authCheck, manager.viewALL);

// create new Manager
router.post("/managers/add-manager", authCheck, manager.addManager);

// edit existing Manager
router.put("/managers/edit-manager", authCheck, manager.editManager);

// delete manager
router.delete("/managers/delete/:id", authCheck, manager.deleteManager);

// ====================================================== //

module.exports = router;
