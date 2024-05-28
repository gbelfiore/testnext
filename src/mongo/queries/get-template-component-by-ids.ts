import type { ObjectId } from "mongodb";
import { getMongoDBClient } from "../mongodbclient";

const getTemplateComponentByIds = async (_ids: ObjectId[]) => {
  const mongoConnection = await getMongoDBClient();
  const templateComponents = mongoConnection.collection("saTemplatesComponents").find({ _id: { $in: _ids } });
  return templateComponents.toArray();
};

export { getTemplateComponentByIds };
