/**
 * Authentication and authorization utilities for Ozon Seller API
 */

import type { ApiKey, ClientId } from "./types.js";
import { ConfigurationError } from "./errors.js";

export interface AuthCredentials {
  readonly apiKey: ApiKey;
  readonly clientId: ClientId;
}

export class AuthManager {
  private readonly credentials: AuthCredentials;

  constructor(credentials: AuthCredentials) {
    this.validateCredentials(credentials);
    this.credentials = credentials;
  }

  /**
   * Get authentication headers for API requests
   */
  public getAuthHeaders(): Record<string, string> {
    return {
      "Client-Id": this.credentials.clientId,
      "Api-Key": this.credentials.apiKey,
    };
  }

  /**
   * Validate API credentials format
   */
  public validateCredentials(credentials: AuthCredentials): void {
    if (!credentials.apiKey || credentials.apiKey.trim().length === 0) {
      throw new ConfigurationError("API key is required and cannot be empty");
    }

    if (!credentials.clientId || credentials.clientId.trim().length === 0) {
      throw new ConfigurationError("Client ID is required and cannot be empty");
    }

    // Basic format validation for Client ID (should be numeric)
    if (!/^\d+$/.test(credentials.clientId)) {
      throw new ConfigurationError("Client ID must be a numeric string");
    }

    // Basic format validation for API key (should be a long alphanumeric string)
    if (credentials.apiKey.length < 20) {
      throw new ConfigurationError("API key appears to be too short");
    }
  }

  /**
   * Check if credentials are valid (basic format check)
   */
  public isValid(): boolean {
    try {
      this.validateCredentials(this.credentials);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get masked credentials for logging (security)
   */
  public getMaskedCredentials(): { clientId: string; apiKey: string } {
    return {
      clientId: `*****${this.credentials.clientId.substring(this.credentials.clientId.length - 2)}*****`,
      apiKey: `*****${this.credentials.apiKey.substring(this.credentials.apiKey.length - 4)}*****`,
    };
  }
}
