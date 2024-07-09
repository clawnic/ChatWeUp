const Conversation = require('../models/conversation.model');
const Message = require('../models/message.model');

const sendMessage = async (req,res) => {
    try {
        const {message}=req.body;
        const {id : receiverId} = req.params;
        const senderId = req.user._id;
        
        

        if(!message || !receiverId){
            return res.status(400).json({error:"please provide message and receiver id"})
        }

        let conversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]},
        });
        

        if(!conversation){
            conversation = new Conversation({participants: [senderId, receiverId]});
            
        }
        const newMessage = new Message({
            senderId,
            receiverId, 
            message
        });

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        //socket.io functionality will go here 

        
        // await conversation.save();
        // await newMessage.save();

        //this will run in parallel
        await Promise.all([conversation.save(),newMessage.save()]);
        return res.status(201).json({
            newMessage
        })


    } catch (error) {
        console.log("error in sendMessage controller : ",error.message)
        return res.status(500).json({msg:"internal server error"})
    }
};

const getMessage  = async(req,res)=>{
    try {
        const {id:UserToChatId} = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participants:{$all:[senderId,UserToChatId]},
        }).populate("messages");

        if(!conversation)return res.status(404).json([]);

        const messages = conversation.messages;
        console.log("conversation:"+conversation);
        res.status(200).json(messages);

    } catch (error) {
        console.log("error in getMessage controller : ", error.message);
        return res.status(500).json({msg:"internal server error"});
    }
}


module.exports ={sendMessage , getMessage};