import type { ObjectId } from "mongodb";
import { getMongoDBClient } from "../mongodbclient";

const getTemplateByIds = async (_ids: ObjectId[]) => {
  const mongoConnection = await getMongoDBClient();
  const sa = mongoConnection.collection("saTemplates").find({ _id: { $in: _ids } });
  return sa.toArray();
};

export { getTemplateByIds };
