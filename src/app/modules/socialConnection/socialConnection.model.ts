import { model, Schema } from "mongoose";
import { ISocialConductivity } from "./socialConnection.interface";

const followersSchema = new Schema<ISocialConductivity>({
  userId: { type: String, required: true },
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }], 
});

export const Follow = model<ISocialConductivity>("Follow", followersSchema);