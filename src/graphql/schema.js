import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql';

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    time: { type: GraphQLString },
  },
});

const getPeopleData = () => (
  [
    { id: 1, name: 'John Smith', time: new Date() },
    { id: 2, name: 'Sara Smith', time: new Date() },
    { id: 3, name: 'Budd Deey', time: new Date() },
  ]
)

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    people: {
      type: new GraphQLList(PersonType),
      resolve: () => getPeopleData(),
    },
  },
});

export const schema = new GraphQLSchema({ query: QueryType });
