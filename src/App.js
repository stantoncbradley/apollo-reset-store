import React, { Component } from 'react';
import { ApolloClient, ApolloProvider } from 'react-apollo';
import { networkInterface } from './graphql/networkInterface';
import { gql, graphql } from 'react-apollo';

const client = new ApolloClient({ networkInterface });

const getPeople = props => {
  debugger;
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      propsLogs: [],
    };
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({ propsLogs: this.state.propsLogs.concat(nextProps)})
  }

  render() {
    const { data: { loading, people } } = this.props;
    return (
      <main>
        <header>
          <h1>resetStore not clearing store</h1>
          <p>
            resetStore refetches the data. However, it does not clear the current data first.<br/>
            If a user signs out, THEIR DATA ISN'T CLEARED!!
          </p>
          <p>Steps to reproduce:</p>
          <ol>
            <li>click resetStore to trigger the resetStore call</li>
            <li>Watch the logs of props.data as it comes through componentWillReceiveProps</li>
            <li>THE DATA NEVER CLEARS!!!!!</li>
          </ol>
        </header>
        <button onClick={this.props.apollo.resetStore}>resetStore()</button>
        <p>Data:</p>
        {loading ? (
          <p>Loading…</p>
        ) : (
          <ul>
            {people.map(person => (
              <li key={person.id}>
                {person.name} {person.time}
              </li>
            ))}
          </ul>
        )}
        <p>Log of props.data</p>

        <ul>
          {this.state.propsLogs.map((props, i) => (
            <li key={i}>
              {JSON.stringify(props.data)}
            </li>
          ))}
        </ul>
      </main>
    );
  }
}

const WrappedApp = graphql(
  gql`{
    people {
      id
      name
      time
    }
  }`,
)(App)

const withApollo = () => (
  <ApolloProvider client={client}>
    <WrappedApp apollo={client} />
  </ApolloProvider>
)

export default withApollo;
