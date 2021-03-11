import { API_ROOT } from '../lib/constants';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface List {
  id: string;
  name: string;
  owner: User;
  color: number;
  contacts: Contact[];
  viewers: User[];
  editors: User[];
}

export interface Contact {
  id: string;
  name: string;
  owner: string;
  image: {
    url: string;
  };
}

export interface ListSharees {
  id: string;
  owner: User;
  viewers: User[];
  editors: User[];
}

export type Role = 'viewer' | 'editor';

interface TokenResponse {
  userId: string;
  token: string;
}

/**
 * HoodatService
 *
 * A service used to make requests to the Hoodat API
 * @param baseURL the root URL endpoint to use when making requests
 */
class HoodatService {
  BASE_URL: string;

  constructor(baseURL: string) {
    this.BASE_URL = baseURL;
  }

  async addContact(
    listId: string,
    name: string,
    image: {
      name: string;
      data: string;
    },
    token: string
  ): Promise<void> {
    const response = await fetch(`${this.BASE_URL}/lists/${listId}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        image: {
          name: image.name,
          data: image.data,
        },
      }),
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message ?? body.error ?? response.statusText);
    }

    return;
  }

  async addList(name: string, color: number, token: string): Promise<void> {
    const response = await fetch(`${this.BASE_URL}/lists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        color,
      }),
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message ?? body.error ?? response.statusText);
    }

    return;
  }

  async getLists(userId: string, token: string): Promise<List[]> {
    const response = await fetch(`${this.BASE_URL}/users/${userId}/lists`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message ?? body.error ?? response.statusText);
    }

    return body;
  }

  async getSharedLists(userId: string, token: string): Promise<List[]> {
    const response = await fetch(
      `${this.BASE_URL}/users/${userId}/shared-lists`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message ?? body.error ?? response.statusText);
    }

    return body;
  }

  // TODO: remove in favor of addSharee()
  async addViewerToList(
    listId: string,
    email: string,
    token: string
  ): Promise<List> {
    const response = await fetch(`${this.BASE_URL}/lists/${listId}/viewers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email,
      }),
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message ?? body.error ?? response.statusText);
    }

    return body;
  }

  async getSharees(listId: string, token: string): Promise<ListSharees> {
    const response = await fetch(`${this.BASE_URL}/lists/${listId}/sharees`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message ?? body.error ?? response.statusText);
    }

    return body;
  }

  async addSharee(
    listId: string,
    email: string,
    role: Role,
    token: string
  ): Promise<void> {
    const response = await fetch(`${this.BASE_URL}/lists/${listId}/sharees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email,
        role,
      }),
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message ?? body.error ?? response.statusText);
    }

    return;
  }

  async removeSharee(
    listId: string,
    userId: string,
    token: string
  ): Promise<void> {
    const response = await fetch(
      `${this.BASE_URL}/lists/${listId}/sharees/${userId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message ?? body.error ?? response.statusText);
    }

    return;
  }

  async updateSharee(
    listId: string,
    userId: string,
    role: Role,
    token: string
  ): Promise<void> {
    const response = await fetch(
      `${this.BASE_URL}/lists/${listId}/sharees/${userId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          role,
        }),
      }
    );

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message ?? body.error ?? response.statusText);
    }

    return;
  }

  async removeContactFromList(
    contactId: string,
    listId: string,
    token: string
  ): Promise<void> {
    const response = await fetch(
      `${this.BASE_URL}/lists/${listId}/contacts/${contactId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message ?? body.error ?? response.statusText);
    }

    return;
  }

  async removeList(listId: string, token: string): Promise<void> {
    const response = await fetch(`${this.BASE_URL}/lists/${listId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message ?? body.error ?? response.statusText);
    }

    return;
  }

  async signIn(email: string, password: string): Promise<TokenResponse> {
    const response = await fetch(`${this.BASE_URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message ?? body.error ?? response.statusText);
    }

    return body;
  }

  async signUp(
    name: string,
    email: string,
    password: string
  ): Promise<TokenResponse> {
    const response = await fetch(`${this.BASE_URL}/auth/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message ?? body.error ?? response.statusText);
    }

    return body;
  }

  async sendForgotPasswordEmail(email: string): Promise<void> {
    const response = await fetch(`${this.BASE_URL}/mail/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return;
  }
}

export default new HoodatService(API_ROOT);
