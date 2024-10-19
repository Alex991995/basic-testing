import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  const transferFailedError = new TransferFailedError();
  test('should create account with initial balance', () => {
    const balance = 100;
    const classBankAccount = getBankAccount(balance);
    expect(classBankAccount.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 100;
    const classBankAccount = getBankAccount(balance);
    const insufficientFundsError = new InsufficientFundsError(balance);
    expect(() => classBankAccount.withdraw(200)).toThrow(
      insufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const balance = 100;
    const insufficientFundsError = new InsufficientFundsError(balance);
    const classBankAccount = getBankAccount(balance);
    const toAccount = getBankAccount(0);
    expect(() => classBankAccount.transfer(200, toAccount)).toThrow(
      insufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 100;
    const classBankAccount = getBankAccount(balance);
    expect(() => classBankAccount.transfer(100, classBankAccount)).toThrow(
      transferFailedError,
    );
  });

  test('should deposit money', () => {
    const balance = 100;
    const classBankAccount = getBankAccount(balance);
    const amountDeposit = 50;
    classBankAccount.deposit(amountDeposit);

    expect(classBankAccount.getBalance()).toBe(balance + amountDeposit);
  });

  test('should withdraw money', () => {
    const balance = 100;
    const classBankAccount = getBankAccount(balance);
    const amountWithdraw = 50;
    classBankAccount.withdraw(amountWithdraw);

    expect(classBankAccount.getBalance()).toBe(balance - amountWithdraw);
  });

  test('should transfer money', () => {
    const balance = 100;
    const classBankAccount = getBankAccount(balance);
    const toAccount = getBankAccount(0);
    const amountTransfer = 50;
    classBankAccount.transfer(amountTransfer, toAccount);
    expect(classBankAccount.getBalance()).toBe(balance - amountTransfer);
    expect(toAccount.getBalance()).toBe(amountTransfer);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = 100;
    const classBankAccount = getBankAccount(balance);
    const mockFetchBalance = jest.spyOn(classBankAccount, 'fetchBalance');
    mockFetchBalance.mockResolvedValueOnce(12);
    const res = await classBankAccount.fetchBalance();
    expect(res).toEqual(expect.any(Number));
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 100;
    const classBankAccount = getBankAccount(balance);
    const mockFetchBalance = jest.spyOn(classBankAccount, 'fetchBalance');
    mockFetchBalance.mockResolvedValueOnce(12);
    await classBankAccount.synchronizeBalance();
    expect(classBankAccount.getBalance()).not.toBe(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balance = 100;
    const classBankAccount = getBankAccount(balance);

    const mockFetchBalance = jest.spyOn(classBankAccount, 'fetchBalance');
    mockFetchBalance.mockResolvedValueOnce(null);

    await expect(classBankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
