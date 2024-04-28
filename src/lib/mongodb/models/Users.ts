





// import { mongoose, Schema, models, model } from 'mongoose';

// const userSchema = new Schema({
//   name: { type: String, required: true, },
//   email: { type: String, required: true, unique: true },
//   orders: [
//     {
//       orderId: { type: Schema.Types.ObjectId, },
//       products: [{ type: String, }],
//     },
//   ],
// });

// export type User = {
//   name: string;
//   email: string;
//   orders: {
//     orderId: Schema.Types.ObjectId;
//     products: string[];
//   }[];
// };

// const user = models.User || model('User', userSchema);

// export default user;



import { mongoose, Schema, models, model } from 'mongoose';


const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  orders: [
    {
      orderId: { type: Schema.Types.ObjectId, required: true, auto: true },
      items: [
        {
          productId: { type: String, required: true },
          quantity: { type: Number, required: true, min: 1 }
        }
      ],
      total: { type: Number, required: true, min: 0 }
    }
  ]
});


export type User = {
  name: string;
  email: string;
  orders: Array<{
    orderId: mongoose.Types.ObjectId;
    items: Array<{
      productId: string;
      quantity: number;
    }>;
    total: number;
  }>;
};

const user = models.User || model('User', userSchema);

export default user;
