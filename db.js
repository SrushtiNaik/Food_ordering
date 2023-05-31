const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://gofood:hiray@cluster0.od5ane0.mongodb.net/gofoodmern?retryWrites=true&w=majority'

//mongodb+srv://gofood:hiray@cluster0.od5ane0.mongodb.net/gofoodmern?retryWrites=true&w=majority
//mongodb://gofood:hiray@ac-bom7l5f-shard-00-00.od5ane0.mongodb.net:27017,ac-bom7l5f-shard-00-01.od5ane0.mongodb.net:27017,ac-bom7l5f-shard-00-02.od5ane0.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-eg68e6-shard-0&authSource=admin&retryWrites=true&w=majority
const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("---", err)
        else {
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function (err, catData) {
                    if (err) console.log(err);
                    else {
                        global.food_items = data;
                        global.foodCategory = catData;

                    }
                })
                // if(err) console.log(err);
                // else {
                //     global.food_items = data;

                // }
            })
        }
    });

}

module.exports = mongoDB;  //mongoDB();
