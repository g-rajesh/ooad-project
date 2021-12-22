const bcrypt = require('bcryptjs');
const User = require("../models/UserModel");
const jwt = require('jsonwebtoken');

exports.signin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if(email.trim().length==0 || password.trim().length==0){
        const emptyErr = new Error("Enter required fileds");
        emptyErr.error = {};
        if(email.trim.length==0)
            emptyErr.error.email="Email is required";
        if(password.trim().length == 0) {
            emptyErr.error.password = "Password is required";
        }
        next(emptyErr);
    }

    if(!email.includes("@")){
        const invalidEmailErr = new Error("Invalid Email");
        invalidEmailErr.error = {
            email:"Email is invalid"
        };
        next(invalidEmailErr);
    }

    let ourUser;
    
    User.findOne({ email })
    .then(userfound => {
        ourUser = userfound;
        if(!userfound){
            const userExistErr = new Error("User Not Found");
            userExistErr.error = {
                email:"User Not Found"
            };
            throw userExistErr;
        }
        return bcrypt.compare(password, userfound.password);
    })
    .then(isEqual => {
        if(!isEqual){
            const signIpErr = new Error("Password doesn't match!");
            signIpErr.error = {
                password:"Password doesn't match!"
            };
            throw signIpErr;        
        }
        
        const token = jwt.sign(
            { email: ourUser.email },
            "ewgeiuliefcuhlorehciwfeycrgry",
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Account created successfully",
            body: {
                username: ourUser.email,
                token
            }
        })
        
    })
    .catch(err => {
        if(!err.status) err.status = 500;
        next(err); 
    })
};

exports.signup = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;

    if(email.trim().length==0 || password.trim().length==0){
        const emptyErr = new Error("Enter required fileds");
        emptyErr.error = {};
        if(email.trim.length==0)
            emptyErr.error.email="Email is required";
        if(password.trim().length == 0) {
            emptyErr.error.password = "Password is required";
        }
        next(emptyErr);
    }

    if(!email.includes("@")){
        const invalidEmailErr = new Error("Invalid Email");
        invalidEmailErr.error = {
            email:"Email is invalid"
        };
        next(invalidEmailErr);
    }
    
    User.findOne({ email })
    .then(userfound => {
        if(userfound){
            const userExistErr = new Error("Email already exist");
            userExistErr.error = {
                email:"Email alreadty exist"
            };
            throw userExistErr;
        }

        return bcrypt.hash(password, 12);
    })
    .then(hashedPassword => {
        console.log(hashedPassword);
        const newUser = new User({email, password:hashedPassword});
        return newUser.save();
    })
    .then(isCreated=>{
        if(!isCreated) {
            const signUpErr = new Error("Signup failed!");
            signUpErr.error = {
                email:"Signup failed"
            };
            throw signUpErr;
        }

        const token = jwt.sign(
            { email: isCreated.email },
            "ewgeiuliefcuhlorehciwfeycrgry",
            { expiresIn: "1h" }
        );

        console.log(isCreated);

        return res.status(200).json({
            message: "Account created successfully",
            body: {
                username: isCreated.email,
                token
            }
        })
        
    })
    .catch(err => {
        if(!err.status) err.status = 500;
        next(err); 
    })
 
}

// try {
        
    
        
//     const hashedPassword = await bcrypt.hash(password, 12);
//     const user = {
//         email,
//         password: hashedPassword
//     }
//     const newUser = await new User(user);
//     const isCreated = await newUser.save();

//     if(!isCreated) {
//         const signUpErr = new Error("Signup failed!");
//         signUpErr.error = {
//             email:"Signup failed"
//         };
//         throw signUpErr;
//     }
    
//     const token = jwt.sign(
//         { email: user.email },
//         "ewgeiuliefcuhlorehciwfeycrgry",
//         { expiresIn: "1h" }
//     );

//     return res.status(200).json({
//         message: "Account created successfully",
//         body: {
//             username: isCreated.email,
//             token
//         }
//     })

// } catch(err) {
//     if(!err.status) err.status = 500;
//     next(err);
// }