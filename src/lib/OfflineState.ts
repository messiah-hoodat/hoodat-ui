import * as FS from 'expo-file-system';

const OFFLINE_STATE_URI = `${FS.documentDirectory}/offline_state.txt`;

interface OfflineContact {
  uri: string;
  name: string;
}

interface OfflineState {
  contacts: OfflineContact[];
}

async function readOfflineState(): Promise<OfflineState> {
  // ensure state file exists
  const info = await FS.getInfoAsync(OFFLINE_STATE_URI);
  if (!info.exists) {
    const newState: OfflineState = { contacts: [] };
    await writeOfflineState(newState);
    return newState;
  }

  const fileString = await FS.readAsStringAsync(OFFLINE_STATE_URI);
  return JSON.parse(fileString) as OfflineState;
}

async function writeOfflineState(state: OfflineState): Promise<void> {
  await FS.writeAsStringAsync(OFFLINE_STATE_URI, JSON.stringify(state));
}

export async function addOfflineContact(
  contact: OfflineContact
): Promise<void> {
  const state = await readOfflineState();
  state.contacts.push(contact);
  await writeOfflineState(state);
}

export async function getOfflineContacts(): Promise<OfflineContact[]> {
  const state = await readOfflineState();
  return state.contacts;
}
