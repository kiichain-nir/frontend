import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Project
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const projectAbi = [
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'tokenAddress', internalType: 'address', type: 'address', indexed: true },
      { name: 'benAddress', internalType: 'address', type: 'address', indexed: true },
      { name: 'projectId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'BeneficiaryAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'name', internalType: 'string', type: 'string', indexed: false },
      { name: 'symbol', internalType: 'string', type: 'string', indexed: false },
      { name: 'tokenAddress', internalType: 'address', type: 'address', indexed: true },
      { name: 'projectId', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'ProjectCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'vendorAddress', internalType: 'address', type: 'address', indexed: true },
      { name: 'ben', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'TransferToVendor',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'vendorAddress', internalType: 'address', type: 'address', indexed: true },
      { name: 'project', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'VendorAdded',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
      { name: 'walletAddress', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'addBeneficiary',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_vendorAddress', internalType: 'address', type: 'address' },
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
    ],
    name: 'addVendor',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'tokenName', internalType: 'string', type: 'string' },
      { name: 'symbol', internalType: 'string', type: 'string' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createProject',
    outputs: [{ name: 'tokenAddress', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAllProjects',
    outputs: [
      {
        name: '',
        internalType: 'struct ProjectManager.Project[]',
        type: 'tuple[]',
        components: [
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'tokenSymbol', internalType: 'string', type: 'string' },
          { name: 'tokenName', internalType: 'string', type: 'string' },
          { name: 'tokenAddress', internalType: 'address', type: 'address' },
          { name: 'beneficiaries', internalType: 'address[]', type: 'address[]' },
          { name: 'vendor', internalType: 'address[]', type: 'address[]' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'projectIndex', internalType: 'uint256', type: 'uint256' }],
    name: 'getBeneficiaries',
    outputs: [{ name: 'benAddress', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'getProject',
    outputs: [
      { name: '', internalType: 'string', type: 'string' },
      { name: '', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenAddress', internalType: 'address', type: 'address' }],
    name: 'getProjectBalance',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'projectId', internalType: 'uint256', type: 'uint256' }],
    name: 'getProjectVendor',
    outputs: [{ name: 'vendors', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getVendors',
    outputs: [{ name: 'vendor', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'projects',
    outputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'tokenSymbol', internalType: 'string', type: 'string' },
      { name: 'tokenName', internalType: 'string', type: 'string' },
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link projectAbi}__
 */
export const useReadProject = /*#__PURE__*/ createUseReadContract({ abi: projectAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link projectAbi}__ and `functionName` set to `"getAllProjects"`
 */
export const useReadProjectGetAllProjects = /*#__PURE__*/ createUseReadContract({
  abi: projectAbi,
  functionName: 'getAllProjects',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link projectAbi}__ and `functionName` set to `"getBeneficiaries"`
 */
export const useReadProjectGetBeneficiaries = /*#__PURE__*/ createUseReadContract({
  abi: projectAbi,
  functionName: 'getBeneficiaries',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link projectAbi}__ and `functionName` set to `"getProject"`
 */
export const useReadProjectGetProject = /*#__PURE__*/ createUseReadContract({
  abi: projectAbi,
  functionName: 'getProject',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link projectAbi}__ and `functionName` set to `"getProjectBalance"`
 */
export const useReadProjectGetProjectBalance = /*#__PURE__*/ createUseReadContract({
  abi: projectAbi,
  functionName: 'getProjectBalance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link projectAbi}__ and `functionName` set to `"getProjectVendor"`
 */
export const useReadProjectGetProjectVendor = /*#__PURE__*/ createUseReadContract({
  abi: projectAbi,
  functionName: 'getProjectVendor',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link projectAbi}__ and `functionName` set to `"getVendors"`
 */
export const useReadProjectGetVendors = /*#__PURE__*/ createUseReadContract({
  abi: projectAbi,
  functionName: 'getVendors',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link projectAbi}__ and `functionName` set to `"projects"`
 */
export const useReadProjectProjects = /*#__PURE__*/ createUseReadContract({
  abi: projectAbi,
  functionName: 'projects',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link projectAbi}__
 */
export const useWriteProject = /*#__PURE__*/ createUseWriteContract({ abi: projectAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link projectAbi}__ and `functionName` set to `"addBeneficiary"`
 */
export const useWriteProjectAddBeneficiary = /*#__PURE__*/ createUseWriteContract({
  abi: projectAbi,
  functionName: 'addBeneficiary',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link projectAbi}__ and `functionName` set to `"addVendor"`
 */
export const useWriteProjectAddVendor = /*#__PURE__*/ createUseWriteContract({
  abi: projectAbi,
  functionName: 'addVendor',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link projectAbi}__ and `functionName` set to `"createProject"`
 */
export const useWriteProjectCreateProject = /*#__PURE__*/ createUseWriteContract({
  abi: projectAbi,
  functionName: 'createProject',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link projectAbi}__ and `functionName` set to `"multicall"`
 */
export const useWriteProjectMulticall = /*#__PURE__*/ createUseWriteContract({
  abi: projectAbi,
  functionName: 'multicall',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link projectAbi}__
 */
export const useSimulateProject = /*#__PURE__*/ createUseSimulateContract({ abi: projectAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link projectAbi}__ and `functionName` set to `"addBeneficiary"`
 */
export const useSimulateProjectAddBeneficiary = /*#__PURE__*/ createUseSimulateContract({
  abi: projectAbi,
  functionName: 'addBeneficiary',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link projectAbi}__ and `functionName` set to `"addVendor"`
 */
export const useSimulateProjectAddVendor = /*#__PURE__*/ createUseSimulateContract({
  abi: projectAbi,
  functionName: 'addVendor',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link projectAbi}__ and `functionName` set to `"createProject"`
 */
export const useSimulateProjectCreateProject = /*#__PURE__*/ createUseSimulateContract({
  abi: projectAbi,
  functionName: 'createProject',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link projectAbi}__ and `functionName` set to `"multicall"`
 */
export const useSimulateProjectMulticall = /*#__PURE__*/ createUseSimulateContract({
  abi: projectAbi,
  functionName: 'multicall',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link projectAbi}__
 */
export const useWatchProjectEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: projectAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link projectAbi}__ and `eventName` set to `"BeneficiaryAdded"`
 */
export const useWatchProjectBeneficiaryAddedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: projectAbi,
  eventName: 'BeneficiaryAdded',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link projectAbi}__ and `eventName` set to `"ProjectCreated"`
 */
export const useWatchProjectProjectCreatedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: projectAbi,
  eventName: 'ProjectCreated',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link projectAbi}__ and `eventName` set to `"TransferToVendor"`
 */
export const useWatchProjectTransferToVendorEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: projectAbi,
  eventName: 'TransferToVendor',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link projectAbi}__ and `eventName` set to `"VendorAdded"`
 */
export const useWatchProjectVendorAddedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: projectAbi,
  eventName: 'VendorAdded',
})
