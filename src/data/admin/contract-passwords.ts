/**
 * Per-employee contract download passwords.
 * Only the CEO knows these passwords and distributes them individually.
 * In production, these should be stored in a database with hashed values.
 */
export const contractPasswords: Record<string, string> = {
  'Daniel Mo Houshmand': 'QD-CEO-7X9mK2',

  'Sharareh M. Shariat Panahi': 'QD-ACE-6W3pQ9',
  'Lillian Kristiansen': 'QD-CAO-2T5vM7',
  'John Kristiansen': 'QD-NET-8K1wN4',
  'Caroline Woie': 'QD-CCO-3F7xP6',
  'Rajesh Chavan': 'QD-CSGO-9H2yR1',
  'Lindsay Sanner': 'QD-CSRO-5J4zS8',
  'Gaspar Alvarado': 'QD-FIN-1M6aT3',
  'Nick Saaf': 'QD-SAL-7N8bU5',
  'Fredrik Krey Stubberud': 'QD-TST-4P2cV9',
  'Yulia Ginzburg': 'QD-CDO-6Q9dW2',
  'Nils Bjelland Gronvold': 'QD-HCE-8R3eX7',
  'Daria Houshmand': 'QD-INT-2S5fY4',
};

export function verifyContractPassword(name: string, password: string): boolean {
  return contractPasswords[name] === password;
}
