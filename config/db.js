const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function connectDB (){
    try{
      await prisma.$connect();
      console.log("Database connect successfully");
    }
    catch(error){
        console.error("Database connetion faild" , error.message);

    }
}
module.exports = {
    prisma,
    connectDB,
}