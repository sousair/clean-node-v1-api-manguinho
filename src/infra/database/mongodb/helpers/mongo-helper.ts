import { MongoClient, Collection } from 'mongodb';

export class MongoHelper {
  private client: MongoClient;

  async connect(url: string): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_URL || '');
  }

  async disconnect(): Promise<void> {
    await this.client.close();
  }

  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  }
}
