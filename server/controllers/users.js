var mongoose = require('mongoose');
var Bike = mongoose.model("Bike");
var User = mongoose.model("User");
module.exports = {
	login: function(req,res){
		User.findOne({email: req.body.email }, function(err, user){
			if(err){
				console.log("login error find");
			}else{
				if(user == null){
					res.json({error:"Email is invalid!"});
				}else{
					if(user.password == req.body.password){
						res.json(user);
					}else{
						res.json({error:"Password is incorrected!"});
					}
				}
			}
		})
	},
	create: function(req,res){
		User.findOne({email: req.body.email }, function(err, user){
			if(err){
				console.log("register error find");
			}else{
				if(user == null){
					var user = new User(req.body);
					user.save(function(err){
						if(err){
							console.log(err);
							res.json(err);
						}
						console.log("good");
						res.json("success");
					})
				}else{
					console.log("already have this user!!");
					res.json('email existed');
				}
			}
		})
		
	},
	show:function(req, res){
		User.findOne({_id:req.params.id}, function(err, user){
			if(err){
				console.log("user error find");
			}else{
				res.json(user);
			}
		})
	}
	// destroy: function(req,res){
	// 	Player.remove({_id: req.params.id},function(err){
	// 		if(err){
	// 			console.log("Delete Error: ",err);
	// 			res.json({error:err});
	// 		}
	// 		res.redirect(303,'/players');
	// 	})
	// }
}
