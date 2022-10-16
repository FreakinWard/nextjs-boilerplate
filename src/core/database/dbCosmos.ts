import { CosmosClient } from '@azure/cosmos';
import { v4 as uuidv4 } from 'uuid';

interface FetchQueryProps {
  query: string;
  parameters?: object;
}

export interface DBConfigType {
  databaseId: string;
  containerId: string;
}

async function getDbContainer(dbConfig: DBConfigType) {
  const endpoint = process.env.COSMOS_ENDPOINT;
  const key = process.env.COSMOS_KEY;
  const partitionKey = { kind: 'Hash', paths: ['/category'] };

  const client = new CosmosClient({ endpoint, key });

  // const { database } = await client.databases.createIfNotExists({
  await client.databases.createIfNotExists({
    id: dbConfig.databaseId,
  });

  const { container } = await client.database(dbConfig.databaseId).containers.createIfNotExists(
    {
      id: dbConfig.containerId,
      partitionKey,
    },
    {
      offerThroughput: 400,
    }
  );

  return container;
}

export default function dbCosmos(dbConfig: DBConfigType) {
  async function createItem(newItem) {
    const container = await getDbContainer(dbConfig);

    const itemWithId = {
      ...newItem,
      id: uuidv4(),
    };

    const { resource: createdItem } = await container.items.create(itemWithId);

    return createdItem;
  }

  async function fetchQuery(query: FetchQueryProps) {
    const container = await getDbContainer(dbConfig);

    const { resources: fetchedItems } = await container.items.query(query).fetchNext();

    return fetchedItems;
  }

  async function updateItem(item) {
    const container = await getDbContainer(dbConfig);

    const { resource: updatedItem } = await container.item(item.id, item.category).replace(item);

    return updatedItem;
  }

  async function deleteItem(id, partitionKey) {
    const container = await getDbContainer(dbConfig);

    const { resource: result } = await container.item(id, partitionKey).delete();

    return result;
  }

  return { fetchQuery, createItem, deleteItem, updateItem };
}
