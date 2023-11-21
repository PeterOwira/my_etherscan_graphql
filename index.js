const { ApolloServer } = require("apollo-server"); //Apollo Server 
const { importSchema } = require("graphql-import"); //GraphQL Import
const EtherDataSource = require("./datasource/ethDatasource"); //Ethereum Data Source
const typeDefs = importSchema("./schema.graphql"); //GraphQL Schema 

require("dotenv").config(); //Load.env file 

const resolvers = {     //Resolvers
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) =>    //Query 
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) =>     //Query
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) =>   //Query
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) =>      //Query
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
}

const server = new ApolloServer({   //Apollo Server
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }),
});

server.timeout = 0;
server.listen("9000").then(({ url }) => {   //Start Apollo Server
  console.log(`🚀 Server ready at ${url}`);  //Log
});
