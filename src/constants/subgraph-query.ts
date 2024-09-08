import { gql } from 'urql';

const projectCreated = gql`
  query projectCreateds {
    projectCreateds {
      blockNumber
      blockTimestamp
      id
      projectId
      name
      symbol
      tokenAddress
      transactionHash
    }
    projectBalances {
      availableBudget
      budget
      id
    }
  }
`;

const projectBalances = gql`
  query projectBalances {
    projectBalances {
      availableBudget
      budget
      id
    }
  }
`;

const projectDetail = gql`
  query projectDetail($id: ID!) {
    projectCreateds(where: { transactionHash: $id }) {
      transactionHash
      name
      symbol
      projectId
      tokenAddress
    }
  }
`;

const beneficiariesAdded = gql`
  query beneficiariesAddeds {
    beneficiaryAddeds {
      amount
      benAddress
      blockNumber
      blockTimestamp
      id
      tokenAddress
      transactionHash
    }
  }
`;

const beneficiaryDetails = gql`
  query beneficiaryDetails($id: ID!) {
    beneficiaryAddeds(where: { benAddress: $id }) {
      amount
      benAddress
      blockNumber
      blockTimestamp
      id
      tokenAddress
      transactionHash
    }
  }
`;

const vendorDetails = gql`
  query vendorDetails($id: ID!) {
    vendorAddeds(where: { benAddress: $id }) {
      vendorAddress
      project
      transactionHash
      blockTimestamp
      id
      blockNumber
    }
  }
`;

const benTransactions = gql`
  query benTransactions($id: ID!) {
    beneficiaryAddeds(where: { benAddress: $id }) {
      amount
      benAddress
      blockNumber
      blockTimestamp
      id
      tokenAddress
      transactionHash
    }
    transfers(where: { to: $id }) {
      tokenAddress
      to
      transactionHash
      value
      from
      id
      blockTimestamp
      blockNumber
    }
    transfers(where: { from: $id }) {
      tokenAddress
      to
      transactionHash
      value
      from
      id
      blockTimestamp
      blockNumber
    }
  }
`;

const transfers = gql`
  query transfers($to: String) {
    transfers(where: { to: $to }) {
      tokenAddress
      to
      transactionHash
      value
      from
      id
      blockTimestamp
      blockNumber
    }
  }
`;

const vendorAdded = gql`
  query vendorAddeds {
    vendorAddeds {
      blockNumber
      blockTimestamp
      id
      transactionHash
      project
      vendorAddress
    }
  }
`;

const vendorTransactions = gql`
  query vendorTransactions($id: ID!) {
    transfers(where: { to: $id }) {
      tokenAddress
      to
      transactionHash
      value
      from
      id
      blockTimestamp
      blockNumber
    }
    vendorAddeds(where: { vendorAddress: $id }) {
      vendorAddress
      project
      transactionHash
      blockTimestamp
      id
      blockNumber
    }
  }
`;

const projectIdDetails = gql`
  query projectIdDetails($id: ID!) {
    projectDetail(id: $id) {
      id
      name
      symbol
      tokenAddress
    }
  }
`;

const projectTransactions = gql  `
query projectTransactions ($tokenAddress: String,$id:ID){
  projectCreateds(where:{tokenAddress: $tokenAddress}) {
      blockNumber
      blockTimestamp
      id
      projectId
      name
      symbol
      tokenAddress
      transactionHash
  }
  beneficiaryAddeds(where:{tokenAddress: $tokenAddress}) {
      amount
      benAddress
      blockNumber
      blockTimestamp
      id
      tokenAddress
      transactionHash
    
  }
  vendorAddeds(where:{project: $id}) {
      blockNumber
      blockTimestamp
      id
      transactionHash
      project
      vendorAddress
    }
  transfers(where:{tokenAddress: $tokenAddress}) {
      tokenAddress
      to
      transactionHash
      value
      from
      id
      blockTimestamp
      blockNumber
    }
}`


const recentProjectTransactions = gql  `
query recentProjectTransactions($tokenAddress: String,$id:ID){
  beneficiaryAddeds(orderBy: blockTimestamp, orderDirection: desc,first: 2,where: {tokenAddress: $tokenAddress}) {
      amount
      benAddress
      blockNumber
      blockTimestamp
      id
      tokenAddress
      transactionHash
    
  }
  vendorAddeds(orderBy: blockTimestamp, orderDirection: desc,first: 2,where: {project: $id}) {
      blockNumber
      blockTimestamp
      id
      transactionHash
      project
      vendorAddress
    }

}`

export const Queries = {
  projectCreated,
  projectBalances,
  beneficiariesAdded,
  beneficiaryDetails,
  transfers,
  vendorAdded,
  projectDetail,
  benTransactions,
  vendorTransactions,
  vendorDetails,
  projectIdDetails,
  projectTransactions,
  recentProjectTransactions
};
