var con = require('./db');
//var buyer = require('./buyerModel');

module.exports = function(app) {
	app.post('/saveRegister', function(req,res) {
		var nodeRecord = JSON.parse(req.query.student);
		var sql = "INSERT INTO demotbl(name,email,password)VALUES(?,?,?)";
		con.query(sql ,[nodeRecord.name,nodeRecord.email,nodeRecord.password] ,function(error, result) {
			if(!!error) {
				console.log(res.json(error));
				console.log('Error in Insert Query');
			} else {
				var data = { 
				"Status":"Success",
				"msg" : "Successfully insert data"
				};
				res.json(data);
			}
		});
	});
	
	app.get('/checkListData' ,(req,res)=>{
		   var listRecord = JSON.parse(req.query.lstRecord);
		    for(var i=0;i<listRecord.length;i++){
			    console.log(listRecord[i].name);
           } 			   
		 
	});
	app.get('/checkParam',(req,res)=>{
		
		  var sql = "SELECT name,email FROM demotbl";
		  con.query(sql,function(error,results,fields){
			    if(error){
					 var data = {
						  "msg" : "record does not exist"  
					 };
					 res.json(data);
					 
				}else if(results.length>0){
					 var data ={
						  "SvcStatus":"Success",
						  "modelData" : results
					 };
					 res.json(data);
				}
				else{
					  var data={
						  "error":"data not found"
					  };
					  res.json(data);
				}
				
		  })
	});
	
	/* app.post('/admin',(req,res)=>{
		var params = req.body;
		console.log(params);
		con.beginTransaction(function(error){
			 if(error){throw error;}
			 var sql = "INSERT INTO admin SET ?";
			 con.query(sql,[params],function(error,results){
				  if (error) {
					  con.rollback(function(){
						 throw error;  
					  });
				    }
				  var id = results.insertId;
				  var sql = "INSERT INTO demo_admin SET admin_id=?";
				  con.query(sql,[id],function(error,results){
					      if(error  
							  con.rollback(function(){
								  throw error;
							  })
						  }
                        con.commit(function(error){
							 if(error){
								  con.rollback(function(){
									   throw error; 
								  });
							 }
							 else{
								  var data ={
									   "SvcStatus" : "Success",
									   "SvcMsg"    : "Record Inserted successfully"
								  };
								  res.json(data);
							 }
						});						  
				   })
				})
		});
	});
	 */
	
	app.get('/', function (req, res) {
			return res.send({ error: true, message: 'hello I am ready' })
	});
 
 
	app.get('/polst',(req,res)=>{
		  
		 
		  var buyerId = req.query.buyerId;
		  if (!buyerId) {
				return res.status(400).send({ error: true, message: 'Please provide buyer_id' });
			}
		  console.log(buyerId);
		  var sql ="SELECT po.pono poNo,DATE_FORMAT(po.deliverydt,'%d-%m-%Y %H:%i') deliveryDt,po.totallength totalMeters,po.comments,SUM(meters) as metersCompleted,pbh.hidestatus hideStatus FROM  po_buyer_hidestatus pbh INNER JOIN purchased_order po   ON po.poid =  pbh.poid LEFT JOIN meter_completed_buyer_po mcbp ON po.poid =  mcbp.poid WHERE pbh.buyerid = ? GROUP BY po.poid";
		  con.query(sql,[buyerId],function(error,results,fields){
			   if(error){
				    var data ={
						 "SvcStatus" : "Failure",
						 "SvcMsg"    : "Faield to get data",
						 "error"     : error
					};
					res.send(data); 
			   }else{
				     console.log(results);
					 var data = {
										"SvcStatus" : "Success",
										  "lstPO"  : results					  
							   };		
							 res.json(data);
					 
			   }
			    
		  })
		 
	});
	
	app.get('/map_to_model',(req,res)=>{
		  
		   var id = req.query.poId;
		   var sql = "SELECT pono,DATE_FORMAT(deliverydt,'%d-%m-%Y') deliveryDt,DATE_FORMAT(expecteddt,'%d-%m-%Y') expectedDt FROM purchased_order WHERE poid=?";
		   con.query(sql,[id],function(error,results,fields){
			    if(error){
					  var data = {
						   "SvcStatus" : "Failure",
						   "SvcMsg"    : "Failed to get records"
					  };
					  res.json(data);
				}else{
					//console.log(results);
					var str = JSON.stringify(results);
					results = JSON.parse(str);
					console.log(results);
					var data ={
					  "SvcStatus" : "Success",
                       "model"   :  results					  
					};
					res.json(data);
				}
			    
		   })
	});
	
	app.post('/login', function(req,res) {
		
		var email = req.body.email;
		//console.log(email);
		var pass  = req.body.password;
		var sql = "SELECT email_id,password FROM admin WHERE email_id=?";
		con.query(sql ,[email], function(error, results, fields) {
			if(error) {
				console.log(res.json(error));
				var data = { 
						"code": 400,
						"failed": "error occured"
					};
				res.json(data);
			} else {
				if(results.length > 0) {

					if(results[0].password == pass) {
						
						var data = { 
								"code": 200,
								"SvcStatus": "Success"
							};
						res.json(data);
					} else {
						var data = { 
								"code": 202,
								"success": "Email/Password does not matched please try again"
							};
						res.json(data);
					}
				} else {
					var data = { 
							"code": 204,
							"success": "Email does not exist"
						};
					res.json(data);
				}
			}
		});
	});

	//~ app.put('/updateRegister/:id', function(req,res) {
		//~ var name = req.body.name;
		//~ var address = req.body.address;
		//~ var id = req.body.id;
		//~ console.log(name, address, id);
		//~ var sql = "UPDATE `customers` SET `name`='"+name+"', `address` = '"+address+"' WHERE `customers`.`id`='"+req.params.id+"'";
		//~ con.query(sql , function(error, result) {
			//~ if(!!error) {
				//~ res.json(error);
				//~ console.log('Error in Update Query');
			//~ } else {
				//~ var data = { "name":name, "address":address, "id":id, "status": 200};
				//~ res.json(data);
			//~ }
		//~ });
	//~ });

	//~ app.get('/getRegister', function(req,res) {
		//~ console.log('getData call');
		
		//~ var sql = "SELECT * FROM `customers`";
		//~ con.query(sql , function(error, result) {
			//~ if(!!error) {
				//~ res.json(error);
				//~ console.log('Error in Fetching Data');
			//~ } else {
				//~ var resp = JSON.parse(JSON.stringify(result));
				//~ var response = {"status": 200, "data": resp};
				//~ res.json(response);
			//~ }
		//~ });
		
	//~ });

	//~ app.get('/getSingleRegister/:id', function(req,res) {
		//~ console.log('getSingleUser call');
		
		//~ var sql = "SELECT * FROM `customers` where id='"+req.params.id+"'";
		//~ con.query(sql , function(error, result) {
			//~ if(!!error) {
				//~ res.json(error);
				//~ console.log('Error in Fetching Single Data');
			//~ } else {
				//~ var resp = JSON.parse(JSON.stringify(result));
				//~ var response = {"status": 200, "data": resp};
				//~ res.json(response);
			//~ }
		//~ });
	//~ });

	//~ app.delete('/deleteRegister/:id', function(req,res) {
		//~ var sql = "DELETE FROM `customers` WHERE `customers`.`id`='"+req.params.id+"'";
		//~ con.query(sql , function(error, result) {
			//~ if(!!error) {
				//~ res.json(error);
				//~ console.log('Error in Delete Query');
			//~ } else {
				//~ var data = {"status": 200};
				//~ res.json(data);
			//~ }
		//~ });
	//~ });
	
}

//~ function encrypt(pwd){
  //~ var cipher = crypto.createCipher('aes-256-cbc','d6F3Efeq')
  //~ var crypted = cipher.update(pwd,'utf8','hex')
  //~ crypted += cipher.final('hex');
  //~ return crypted;
//~ }

//~ function decrypt(text){
  //~ var decipher = crypto.createDecipher('aes-256-cbc','d6F3Efeq')
  //~ var dec = decipher.update(text,'hex','utf8')
  //~ dec += decipher.final('utf8');
  //~ return dec;
//~ }


