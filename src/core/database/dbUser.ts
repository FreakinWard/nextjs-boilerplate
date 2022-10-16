import dbCosmos from './dbCosmos';

export interface UserType {
  name: string;
  email: string;
  avatarUrl: string;
}

export async function createUserIfNotExists(user: UserType) {
  const dbConfig = {
    databaseId: 'NextJs',
    containerId: 'Users',
  };
  const { fetchQuery, createItem } = dbCosmos(dbConfig);

  const existingUser = await fetchQuery({
    query: 'SELECT * from c WHERE c.email = @email',
    parameters: [{ name: '@email', value: user.email }],
  });

  if (existingUser) return true;

  const newUser = {
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl,
  };

  await createItem(newUser);
}
