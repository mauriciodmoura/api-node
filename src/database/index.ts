import { DataSource, DataSourceOptions } from "typeorm";

const createDataSource = async (): Promise<DataSource> => {
  const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "mauriciodemoura",
    password: "ignite",
    database: "postgres",
  };

  const myDataSource = new DataSource(dataSourceOptions);
  await myDataSource.connect();

  return myDataSource;
};

export default createDataSource;