const bcrypt = require('bcryptjs');
const { User } = require("../models/UserModel");
const jwt = require('jsonwebtoken');

exports.signin = async (req, res, next) => {
    // const email = req.body.email;
    // const password = req.body.password;

    // try {
    //     if(email.trim().length==0 || password.trim().length==0){
    //         const emptyErr = new Error("Enter required fileds");
    //         emptyErr.error = {};
    //         if(email.trim.length==0)
    //             emptyErr.error.email="Email is required";
    //         if(password.trim().length == 0) {
    //             emptyErr.error.password = "Password is required";
    //         }
    //         throw emptyErr;
    //     }
        
    //     if(!email.contains("@")){
    //         const invalidEmailErr = new Error("Invalid Email");
    //         invalidEmailErr.error = {
    //             email:"Email is invalid"
    //         };
    //         throw invalidEmailErr;
    //     }
    //     const userfound = await User.findOne({ email });   
        
    //     if(!userfound){
    //         const userExistErr = new Error("User Not found");
    //         userExistErr.error = {
    //             email:"User not found"
    //         };
    //         throw userExistErr;
    //     }
    //     const hashedPassword = userfound.password;
    //     const isEqual = await bcrypt.compare(password,hashedPassword);
    //     if(!isEqual){
    //         const passwordErr = new Error("Password doesn't match");
    //         passwordErr.error = {
    //             email:"Password doesn't match"
    //         };
    //         throw passwordErr;
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
        throw emptyErr;
    }

    if(!email.includes("@")){
        const invalidEmailErr = new Error("Invalid Email");
        invalidEmailErr.error = {
            email:"Email is invalid"
        };
        throw invalidEmailErr;
    }
    User.find()
    .then(users => {
        users.forEach(user=>{
            if(user.email===email){
                const userExistErr = new Error("Email already exist");
                userExistErr.error = {
                    email:"Email alreadty exist"
                };
                throw userExistErr;
            }
        })
        return bcrypt.hash(password, 12);
    })
    // User.findOne({ email })
    // .then(userfound => {
    //     console.log(userfound);
    //     if(userfound){
    //         const userExistErr = new Error("Email already exist");
    //         userExistErr.error = {
    //             email:"Email alreadty exist"
    //         };
    //         throw userExistErr;
    //     }

    //     return bcrypt.hash(password, 12);
    // })
    .then(hashedPassword=>{
        const newUser = new User({email,password});
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
            { email: user.email },
            "ewgeiuliefcuhlorehciwfeycrgry",
            { expiresIn: "1h" }
        );

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