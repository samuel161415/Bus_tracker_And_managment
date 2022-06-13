var io;
const Messages= require('./model/Messages')
let userIdToSocketId = new Map()
let userSocketMap={}
const {addUser,removeUser,getUser,getUsersInRoom}=require('./users')
const setup = (server)=>{
    console.log("websocket init")
    io=require('socket.io')(server,{cors:{
        origin:'*'
    }}); 

    io.on('connection',(socket)=>{
        console.log("On connection") 
        // userIdToSocket[userId] = socket.id // map.put(userId,socket.id)
        socket.on('saveId', (senderId)=>{
            console.log("sender id is ",senderId );
                // userIdToSocketId[senderId] = socket.id
                // console.log(userIdToSocketId)
                userSocketMap[senderId]=socket.id
                console.log("map",userSocketMap);
        });
        
        socket.on('sendMessage',async(message,senderId,receiverId)=>{

                console.log("msg", message);
                console.log("recId",receiverId);
                console.log("senderId",senderId);
                //console.log("socketId",userIdToSocketId[receiverId]);
                console.log("soketId",userSocketMap[receiverId]);
                
                console.log(new Date());
                
                const createMessage=new Messages({
    
                    date:new Date(),
                    senderId:senderId,
                    receiverId:receiverId,
                    body: message
                })
                  try{
                     await createMessage.save()  
                  }
                catch(err){
                   console.log(err);
                }
                
               // if (userIdToSocketId[receiverId] != undefined){ // if it exisits and if it is active 
               if (userSocketMap[receiverId] != undefined){     
               console.log("exists");
                   
                    //io.to(userIdToSocketId[receiverId]).emit('message',{senderId:senderId,receiverId:receiverId,body:message,date:new Date()});
                    io.to(userSocketMap[receiverId]).emit('message',{senderId:senderId,receiverId:receiverId,body:message,date:new Date()});
                }
                
                
            //callback();
        });
    
        socket.on('disconnect',()=>{ 
            const user=removeUser(socket.id)
            console.log("connection disconnecte");
            if(user){
                io.to(user.room).emit('message',{user:'admin',text:`${user.name} has left.`})
                io.to(user.room).emit('roomData',{ room:user.room, users:getUsersInRoom(user.room)});
            }
        })
    })

    //console.log("log" , io);
}



module.exports = {setup}