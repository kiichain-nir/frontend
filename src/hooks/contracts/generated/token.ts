import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Token
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const tokenAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'symbol', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'spender', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenAbi}__
 */
export const useReadToken = /*#__PURE__*/ createUseReadContract({ abi: tokenAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadTokenAllowance = /*#__PURE__*/ createUseReadContract({
  abi: tokenAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadTokenBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: tokenAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadTokenDecimals = /*#__PURE__*/ createUseReadContract({
  abi: tokenAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"name"`
 */
export const useReadTokenName = /*#__PURE__*/ createUseReadContract({
  abi: tokenAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadTokenSymbol = /*#__PURE__*/ createUseReadContract({
  abi: tokenAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadTokenTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: tokenAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenAbi}__
 */
export const useWriteToken = /*#__PURE__*/ createUseWriteContract({ abi: tokenAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteTokenApprove = /*#__PURE__*/ createUseWriteContract({
  abi: tokenAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteTokenMint = /*#__PURE__*/ createUseWriteContract({
  abi: tokenAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteTokenTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: tokenAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteTokenTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: tokenAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenAbi}__
 */
export const useSimulateToken = /*#__PURE__*/ createUseSimulateContract({ abi: tokenAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateTokenApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: tokenAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateTokenMint = /*#__PURE__*/ createUseSimulateContract({
  abi: tokenAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateTokenTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: tokenAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateTokenTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: tokenAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenAbi}__
 */
export const useWatchTokenEvent = /*#__PURE__*/ createUseWatchContractEvent({ abi: tokenAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchTokenApprovalEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: tokenAbi,
  eventName: 'Approval',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchTokenTransferEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: tokenAbi,
  eventName: 'Transfer',
})
