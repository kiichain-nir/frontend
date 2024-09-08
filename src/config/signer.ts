export async function getDomain(contract: any) {
  const { fields, name, version, chainId, verifyingContract, salt, extensions } =
    await contract.eip712Domain.staticCall();

  if (extensions.length > 0) {
    throw Error('Extensions not implemented');
  }

  const domain: any = {
    name,
    version,
    chainId,
    verifyingContract,
    salt,
  };

  for (const [i, { name }] of types.EIP712Domain.entries()) {
    if (!(fields & (1 << i))) {
      delete domain[name];
    }
  }

  return domain;
}

export async function buildRequest(forwarderContract: any, input: any): Promise<BuiltRequest> {
  const nonce = await forwarderContract.nonces.staticCall(input.from);

  return {
    from: input.from,
    to: input.to,
    value: BigInt(0),
    data: input.data,
    gas: BigInt(1e6),
    deadline: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    nonce,
  };
}

export async function buildTypedData(forwarderContract: any) {
  const domain = await getDomain(forwarderContract);
  const { ForwardRequest } = types;
  return {
    domain,
    types: { ForwardRequest },
  };
}

export async function signMetaTxRequest(signer: HDNodeWallet, forwarderContract: any, input: any) {
  const request = await buildRequest(forwarderContract, input);
  const { domain, types } = await buildTypedData(forwarderContract);

  const signature = await signer.signTypedData(domain, types, request);

  request.signature = signature;
  return request;
}

export async function getMetaTxRequest(
  signer: HDNodeWallet,
  forwarderContract: any,
  elContractInstance: any,
  functionName: string,
  params: any[] | [] | null
) {
  return signMetaTxRequest(signer, forwarderContract, {
    from: signer.address,
    to: elContractInstance.target,
    data: elContractInstance.interface.encodeFunctionData(functionName, params),
  });
}
