const db = require("../db.js");

const getUsers = (req,res)=>{
    const q = "select *from users";
    db.query(q,(err,result)=>{
        if(err) return res.status(500).json("server Error");

        return res.status(200).json({
            success:true,
            status:200,
            datas_amount:result.length,
            datas:result,
            message:"success retrieve data",
        });

    });

};

const getUserById = (req, res) => {
    const id = req.params.id; 
    const q = "SELECT * FROM users WHERE id = ?"; 

    db.query(q, [id], (err, result) => {
        if (err) return res.status(500).json("Server Error"); 

        if (result.length === 0) { 
            return res.status(404).json({
                success: false,
                status: 404,
                message: `Cannot find user with id ${id}`, 
            });
        }

        
        return res.status(200).json({
            success: true,
            status: 200,
            data: result[0], 
            message: "User retrieved successfully",
        });
    });
};



const addUser = (req,res)=>{
    const values=[
        req.body.Name,
        req.body.email,
        req.body.phone,
        req.body.status,
    ];

    if (
        !!(
          req.body.name ||
          req.body.username ||
          req.body.email ||
          req.body.city ||
          req.body.phone
        )
      ) {
        return res.status(400).json("Something required is missing");
      }
    db.query(q,[values],(err,result)=>{
        
        if(err) return res.status(500).json("Server Error");
        return res.status(200).json("user added successfully");
     });
}


const updateUser = (req,res)=>{
    const{id} = req.params;
    const q = "update users set `Name`=?,`email`=?,`phone`=?,`status`=? where `id`=?";
    db.query(
        q,[
            req.body.Name,
            req.body.email,
            req.body.phone,
            req.body.status,
            id,
        ],
        (err,result)=>{
            if(err) return res.status(500).json("server Error");

            if(result.affectedRows === 0){
                return res.status(404).json({
                    success:false,
                    status:404,
                    msg:`cannot find user with id ${id}`,
                });

            }

            return res.status(200).json({
                success:true,
                status:200,
                msg:"Update user successfully",
                result,
            });
        }
    );
};

const deleteUser = (req,res)=>{
    const q = "Delete from users where `id` = ?";
    db.query(q,[req.params.id],(err,result)=>{
        if(err) return res.status(500).json("Server Error");

        if(result.affectedRows == 0)
            
        return res.status(404).json({
        success:false,
        status:404,
        msg:`cannot find user with id ${req.params.id}`,
        
    });
    return res.status(200).json({
        success:true,
        status:200,
        msg:"Delete user successfully",
    });
    });
};

module.exports = {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser


};