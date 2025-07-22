const cloudinary = require('cloudinary');
const UploadTOCloudinary = async(filepath)=>{
    try{
        const result = await cloudinary.uploader.upload(filepath);
        return{
            
                url : result.secure_url,
                publicId : result.public_id

            
        }

    }catch(e){
        console.error("error",e);
    
    throw new error('error')
    }
}
module.exports = UploadTOCloudinary;